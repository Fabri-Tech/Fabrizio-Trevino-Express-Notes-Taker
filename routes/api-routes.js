const router = require('express').Router();
const store = require('../db/store');

router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: 'Title and text are required.' });
  }
  store
    .postNote({
      title,
      text,
    })
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  store
    .getNotes()
    .then((notes) => {
      const filteredNotes = notes.filter((note) => note.id !== id);
      if (filteredNotes.length === notes.length) {
        return res.status(404).json({ error: 'Note not found.' });
      }
      store
        .write(filteredNotes)
        .then(() => {
          res.json({ success: `Note ${id} deleted.` });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
