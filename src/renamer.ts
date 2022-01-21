import joplin from 'api';
import * as path from 'path';

class renamerHelper {
  constructor() {
    this.initialize();
  }

  /**
   * initialize the controller component.
   */
  private async initialize(): Promise<void> {
  }

  public async replaceFileNameInNote(resourceFileName: string, oldFileName: string, noteBody:string): Promise<string> {
    await this.initialize();
    const re = new RegExp(`(${oldFileName}(.[A-Za-z]){0,3})`, 'gmi');
    const replacedBody = noteBody.replace(
      re,
      resourceFileName
    );
    return replacedBody;
  }
}
export { renamerHelper };
