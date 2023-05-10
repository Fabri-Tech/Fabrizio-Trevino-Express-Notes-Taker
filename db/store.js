const util = require('util');
const fs = require('fs');
const { v4: generateId } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf-8').catch(() => '[]');
  }

  write(notes) {
    return writeFileAsync('db/db.json', JSON.stringify(notes));
  }

  async getNotes() {
    const notes = await this.read();
    return JSON.parse(notes);
  }

  async postNote(note) {
    const notes = await this.getNotes();
    const newNote = { ...note, id: generateId() };
    notes.push(newNote);
    await this.write(notes);
    return newNote;
  }

  async deleteNote(id) {
    const notes = await this.getNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);
    await this.write(filteredNotes);
  }
}

module.exports = new Store();
