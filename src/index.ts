import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
import { renamerHelper } from './renamer';

joplin.plugins.register({
  onStart: async function () {
    console.info('Plugin Apollo Started!');
    const dialogs = joplin.views.dialogs;
    const handle = await dialogs.create('renameResourceConfirmation');
    await dialogs.setHtml(handle, '<p>Do you want to rename first?</p>');
    await joplin.commands.register({
      name: 'renameAttachment',
      label: 'Rename Note Attachment',
      iconName: 'far fa-copy',
      execute: async () => {
        const result = await dialogs.open(handle);
        if (result.id === 'ok') {
          const selectedNote = await joplin.workspace.selectedNote();
          console.log(selectedNote);
          let noteAttachments: any = null;
          try {
            noteAttachments = await joplin.data.get(
              ['notes', selectedNote.id, 'resources'],
              { fields: ['id', 'title', 'file_extension', 'filename'] }
            );
            if (
              noteAttachments !== null &&
              noteAttachments.items !== null &&
              noteAttachments.items.length > 0
            ) {
              const firstResource = noteAttachments.items[0];
              const newResourceFileName = `${selectedNote.title}.${firstResource.file_extension}`;
              const resource = await joplin.data.put(
                ['resources', firstResource.id],
                null,
                {
                  title: newResourceFileName,
                  fileName: newResourceFileName
                }
              );
              const rn = new renamerHelper();
              const replacedBody = await rn.replaceFileNameInNote(
                resource.title,
                firstResource.title,
                selectedNote.body
              );
              const changedNote = await joplin.data.put(
                ['notes', selectedNote.id],
                null,
                {
                  body: replacedBody
                }
              );
              console.log(changedNote);
              console.log(resource);
            }
            console.log(noteAttachments.items);
          } catch (e) {
            console.error('note resource retrieval error');
            console.error(e);
          }
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
