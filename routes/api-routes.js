const router = require('express').Router();
const { getNotes, postNote } = require('../db/store');

router.get('/notes', (req, res) => {
  getNotes()
    .then(function (notes) {
      return res.json(notes);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

router.post('/notes', (req, res) => {
  if (!req.body.title || !req.body.text)
    return res.status(400).json({ error: 'malformed body' });
  postNote(req.body)
    .then(function (note) {
      return res.json(note);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

router.delete('/notes/:id', (req, res) => {});

module.exports = router;
