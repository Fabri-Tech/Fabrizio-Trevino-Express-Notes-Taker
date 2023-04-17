const router = require('express').Router();
const { getNotes } = require('../db/store');

router.get('/notes', (req, res) => {
  getNotes()
    .then(function (notes) {
      return res.json(notes);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

router.post('/notes', (req, res) => {});

router.delete('/notes/:id', (req, res) => {});

module.exports = router;
