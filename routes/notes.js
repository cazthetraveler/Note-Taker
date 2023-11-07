const notes = require('express').Router();
const {vr: uuidv4} = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


notes.get('/notes', (req, res) => readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data))));

notes.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    readAndAppend(newNote, '../db/db.json');
    res.json(`Note added!!`);
    } else {
        res.errored(`Dingbat`);
    };
});

module.exports = notes;