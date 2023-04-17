const util = require('util');
const fs = require('fs');
const { v4: generateId } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  //functions here

  read() {
    return readFileAsync('db/db.json', 'utf-8');
  }

  write(note) {
    return fs.writeFile('db/db.json', JSON.stringify(note));
  }
  getNotes() {
    this.read()
      .then(function (notes) {
        return JSON.parse(notes);
      })
      .catch(function (err) {
        console.log(err);
        return [];
      });
  }
  postNote(note) {
    note.id = generateId();
    this.getNotes()
      .then(function (notes) {
        notes.push(note);
        return notes;
      })
      .then(function (updatedNotes) {
        this.write(updatedNotes);
      })
      .then(function () {
        return note;
      });
  }
}

module.exports = new Store();
