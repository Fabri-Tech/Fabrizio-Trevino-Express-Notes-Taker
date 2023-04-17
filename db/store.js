const util = require('util');
const fs = require('fs');
const { v4 } = require('uuid');

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
}

module.exports = new Store();
