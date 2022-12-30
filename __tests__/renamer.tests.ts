import 'reflect-metadata';
import { renamerHelper } from '../src/renamer';
import { describe, expect, it } from '@jest/globals';
import fs = require('fs-extra');

describe('test correct filename replace', function () {
  it(`space in filename with numbers`, async () => {
    const rn = new renamerHelper();
    const noteBody =
      'test [2021-11-22-misnamedFile - 4 - 1.pdf](:/0b0f9b501b124c6b875a0d5794eaef39) test';
    const expectedNoteBody =
      'test [2022-01-01-test-data.pdf](:/0b0f9b501b124c6b875a0d5794eaef39) test';
    const oldName = '2021-11-22-misnamedFile - 4 - 1.pdf';
    const newName = '2022-01-01-test-data.pdf';
    const file_extension = 'pdf';
    const actual = await rn.replaceFileNameInNote(newName, oldName, noteBody);
    expect(actual).toEqual(expectedNoteBody);
  });
  it(`capital extension in filename`, async () => {
    const rn = new renamerHelper();
    const noteBody =
      'test [2021-11-23-misnamedFile.PDF](:/0b0f9b501b124c6b875a0d5794eaef39) test';
    const expectedNoteBody =
      'test [2022-01-01-test-data.pdf](:/0b0f9b501b124c6b875a0d5794eaef39) test';
    const oldName = '2021-11-23-misnamedFile.PDF';
    const newName = '2022-01-01-test-data.pdf';
    const file_extension = 'pdf';
    const actual = await rn.replaceFileNameInNote(newName, oldName, noteBody);
    expect(actual).toEqual(expectedNoteBody);
  });
  it(`take care of missing file extension in resource filename`, async () => {
    const rn = new renamerHelper();
    const noteBody =
      'test [2021-11-23-misnamedFile.PDF](:/0b0f9b501b124c6b875a0d5794eaef39) test';
    const expectedNoteBody =
      'test [2022-01-01-test-data.pdf](:/0b0f9b501b124c6b875a0d5794eaef39) test';
    const oldName = '2021-11-23-misnamedFile';
    const newName = '2022-01-01-test-data.pdf';
    const file_extension = 'pdf';
    const actual = await rn.replaceFileNameInNote(newName, oldName, noteBody);
    expect(actual).toEqual(expectedNoteBody);
  });
});
