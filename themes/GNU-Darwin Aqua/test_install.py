import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('aqua_install', Path(__file__).with_name('install.py'))
installer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(installer)


class InstallationTests(unittest.TestCase):
    def test_target_uses_actual_ids_and_ignores_top_panel(self):
        target = installer.detect_target(['3:0:top', '9:0:bottom'], [
            'panel3:center:0:grouped-window-list@cinnamon.org:11',
            'panel9:center:0:grouped-window-list@cinnamon.org:57'])
        self.assertEqual((target['panel_id'], target['instance_id']), (9, 57))

    def test_missing_or_ambiguous_target_refused(self):
        for entries in ([], ['panel9:center:0:grouped-window-list@cinnamon.org:57',
                             'panel9:center:1:grouped-window-list@cinnamon.org:58']):
            with self.assertRaisesRegex(RuntimeError, 'exactly one'):
                installer.detect_target(['9:0:bottom'], entries)

    def test_plan_install_and_repeat_conflict(self):
        with tempfile.TemporaryDirectory() as temporary:
            home = Path(temporary) / 'home'; data = home / '.local/share'
            plan = installer.install(home, data)
            self.assertFalse(home.exists())
            self.assertEqual(plan['written'], [])
            installed = installer.install(home, data, True)
            self.assertEqual(len(installed['written']), 3)
            for source, dest, _, _ in installer.locations(home, data):
                for item in source.rglob('*'):
                    copied = dest / item.relative_to(source)
                    if item.is_symlink(): self.assertEqual(item.readlink(), copied.readlink())
                    elif item.is_file(): self.assertEqual(item.read_bytes(), copied.read_bytes())
            with self.assertRaisesRegex(RuntimeError, 'Existing installation'):
                installer.install(home, data, True)

    def test_alternate_existing_theme_refuses_all_writes(self):
        with tempfile.TemporaryDirectory() as temporary:
            home = Path(temporary); data = home / '.local/share'
            existing = data / 'themes' / installer.NAME
            existing.mkdir(parents=True)
            (existing / 'keep.txt').write_text('keep')
            with self.assertRaises(RuntimeError): installer.install(home, data, True)
            self.assertFalse((home / '.themes').exists())
            self.assertEqual((existing / 'keep.txt').read_text(), 'keep')

    def test_symlink_parent_refused(self):
        with tempfile.TemporaryDirectory() as temporary:
            home = Path(temporary); other = home / 'other'; other.mkdir()
            (home / '.themes').symlink_to(other, target_is_directory=True)
            with self.assertRaisesRegex(RuntimeError, 'real directory'):
                installer.install(home, home / '.local/share', True)
            self.assertEqual(list(other.iterdir()), [])

    def test_configure_only_changes_target_and_requires_disabled_extension(self):
        with tempfile.TemporaryDirectory() as temporary:
            home = Path(temporary); data = home / '.local/share'
            installer.install(home, data, True)
            path = data / 'cinnamon/extensions' / installer.UUID / 'config.json'
            before = json.loads(path.read_text())
            settings = {'enabled-extensions': ['other@example'], 'panels-enabled': ['9:0:bottom'],
                        'enabled-applets': ['panel9:center:0:grouped-window-list@cinnamon.org:57']}
            with patch.object(installer, 'setting', side_effect=settings.__getitem__):
                installer.configure(data)
                self.assertEqual(json.loads(path.read_text()), before)
                installer.configure(data, True)
                after = json.loads(path.read_text()); expected = dict(before)
                expected['target'] = {'applet_uuid': 'grouped-window-list@cinnamon.org', 'panel_id': 9, 'instance_id': 57}
                self.assertEqual(after, expected)
                settings['enabled-extensions'] = [installer.UUID]
                with self.assertRaisesRegex(RuntimeError, 'Disable'):
                    installer.configure(data, True)

    def test_empty_gsettings_array(self):
        with patch.object(installer.subprocess, 'check_output', return_value='@as []\n'):
            self.assertEqual(installer.setting('enabled-extensions'), [])


if __name__ == '__main__':
    unittest.main()
