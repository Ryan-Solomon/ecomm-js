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
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf-8',
      })
    );
  }

  async create(attrs) {
    const records = await this.getAll();
    records.push(attrs);
    await fs.promises.writeFile(this.filename, JSON.stringify(records));
  }
}

const repo = new UsersRepo('users.json');
