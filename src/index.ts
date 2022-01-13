import joplin from 'api';
import {
  MenuItemLocation,
  SettingItemType,
  ToolbarButtonLocation
} from 'api/types';

joplin.plugins.register({
  onStart: async function () {
    console.info('Plugin Apollo Started!');
    await joplin.commands.register({
      name: 'renameAttachment',
      label: 'Rename Note Attachment',
      iconName: 'far fa-copy',
      execute: async () => {
        const selectedNote = await joplin.workspace.selectedNote();
        console.log(selectedNote);
        let noteAttachments: any = null;
        try {
          noteAttachments = await joplin.data.get(
            ['notes', selectedNote.id, 'resources'],
            { fields: ['id', 'title',  'file_extension', 'filename']}
          );
          console.log(noteAttachments.items);
        } catch (e) {
          console.error('note resource retrieval error');
          console.error(e);
        }
      }
    });

    await joplin.views.toolbarButtons.create(
      'renameAttachment-button',
      'renameAttachment',
      ToolbarButtonLocation.EditorToolbar
    );
  }
});
