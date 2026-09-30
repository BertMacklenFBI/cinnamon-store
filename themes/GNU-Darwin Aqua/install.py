#!/usr/bin/env python3
"""Plan/copy Aqua files or bind the dock to an existing bottom panel. Never enables it."""
import argparse
import ast
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parent
NAME = 'GNU-Darwin Aqua'
UUID = 'snow-leopard-dock@desktop-theme-studio'


def real_parents(path):
    for parent in (path, *path.parents):
        if parent.is_symlink() or (parent.exists() and not parent.is_dir()):
            raise RuntimeError(f'Expected a real directory: {parent}')


def locations(home, data):
    return [(ROOT / 'files' / NAME, home / '.themes' / NAME, 'themes', NAME),
            (ROOT / 'companions/icons' / (NAME + ' icons'), home / '.icons' / (NAME + ' icons'), 'icons', NAME + ' icons'),
            (ROOT / 'companions/extensions' / UUID, data / 'cinnamon/extensions' / UUID, 'cinnamon/extensions', UUID)]


def validate_payload():
    expected = json.loads((ROOT / 'payload-manifest.json').read_text())['files']
    actual = {}
    for base in (ROOT / 'files', ROOT / 'companions'):
        for path in sorted(base.rglob('*')):
            if path.is_symlink():
                if not path.resolve().is_relative_to(base.resolve()) or not path.resolve().is_file():
                    raise RuntimeError(f'Broken or escaping payload link: {path}')
                actual[str(path.relative_to(ROOT))] = {'link': os.readlink(path)}
            elif path.is_file():
                actual[str(path.relative_to(ROOT))] = {'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
    if actual != expected:
        raise RuntimeError('Payload does not match payload-manifest.json; obtain an intact package.')


def install(home, data, apply=False):
    validate_payload()
    rows = locations(home, data)
    conflicts = []
    for source, destination, kind, name in rows:
        real_parents(destination.parent)
        candidates = {destination, data / kind / name,
                      Path('/usr/local/share') / kind / name, Path('/usr/share') / kind / name}
        for path in candidates:
            if path.exists() or path.is_symlink():
                conflicts.append(str(path))
    result = {'destinations': [str(row[1]) for row in rows], 'conflicts': sorted(set(conflicts)),
              'settings_changed': False, 'extension_enabled': False, 'written': []}
    if apply:
        if conflicts:
            raise RuntimeError('Existing installation: inspect and back it up before continuing: ' + ', '.join(result['conflicts']))
        for source, destination, kind, name in rows:
            real_parents(destination.parent)
            destination.parent.mkdir(parents=True, exist_ok=True)
            # copytree refuses an existing destination, including a racing symlink.
            # A failed copy is left for inspection; never delete a possibly edited tree.
            shutil.copytree(source, destination, symlinks=True)
            result['written'].append(str(destination))
    return result


def setting(name):
    raw = subprocess.check_output(['gsettings', 'get', 'org.cinnamon', name], text=True).strip()
    return ast.literal_eval(raw.removeprefix('@as '))


def detect_target(panels, applets):
    bottom = {int(row.split(':')[0]) for row in panels if row.split(':')[-1] == 'bottom'}
    targets = []
    for row in applets:
        fields = row.split(':')
        if len(fields) < 5 or fields[3].lstrip('!') != 'grouped-window-list@cinnamon.org':
            continue
        panel = int(fields[0].removeprefix('panel'))
        if panel in bottom and fields[1] == 'center':
            targets.append({'applet_uuid': fields[3].lstrip('!'), 'instance_id': int(fields[4]), 'panel_id': panel})
    if len(targets) != 1:
        raise RuntimeError('Place exactly one Grouped window list in the CENTER zone of a BOTTOM panel, then retry.')
    return targets[0]


def configure(data, apply=False):
    validate_payload()
    if UUID in [value.lstrip('!') for value in setting('enabled-extensions')]:
        raise RuntimeError('Disable the Aqua dock in Cinnamon Extensions before configuring it.')
    target = detect_target(setting('panels-enabled'), setting('enabled-applets'))
    path = data / 'cinnamon/extensions' / UUID / 'config.json'
    real_parents(path.parent)
    if path.is_symlink() or not path.is_file():
        raise RuntimeError('Install this package first; config.json must be a regular file.')
    current = json.loads(path.read_text())
    expected = json.loads((ROOT / 'companions/extensions' / UUID / 'config.json').read_text())
    if {k:v for k,v in current.items() if k != 'target'} != {k:v for k,v in expected.items() if k != 'target'}:
        raise RuntimeError('Installed dock configuration differs from this package; inspect it before continuing.')
    current['target'] = target
    if apply:
        fd, temporary = tempfile.mkstemp(prefix='.aqua-config-', dir=path.parent)
        try:
            with os.fdopen(fd, 'w') as stream:
                json.dump(current, stream, indent=2); stream.write('\n')
            os.chmod(temporary, 0o644)
            os.replace(temporary, path)
        finally:
            if os.path.exists(temporary): os.unlink(temporary)
    return {'target': target, 'config_file': str(path), 'written': apply,
            'settings_changed': False, 'extension_enabled': False}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['plan', 'install', 'configure-dock'])
    parser.add_argument('--apply', action='store_true', help='Write files; never changes settings or enables the extension')
    args = parser.parse_args()
    home = Path.home()
    data = Path(os.environ.get('XDG_DATA_HOME', home / '.local/share'))
    if not data.is_absolute(): parser.error('XDG_DATA_HOME must be absolute')
    if args.apply and os.geteuid() == 0: parser.error('Run as your desktop user, without sudo')
    try:
        result = configure(data, args.apply) if args.command == 'configure-dock' else install(home, data, args.apply and args.command == 'install')
        print(json.dumps(result, indent=2))
    except (RuntimeError, OSError, ValueError, subprocess.CalledProcessError) as error:
        parser.exit(1, str(error) + '\n')


if __name__ == '__main__':
    main()
