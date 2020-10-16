const fs = require('fs');

class UsersRepo {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    const contents = await fs.promises.readFile(this.filename, {
      encoding: 'utf-8',
    });

    const data = JSON.parse(contents);
    return data;
  }
}

const repo = new UsersRepo('users.json');
