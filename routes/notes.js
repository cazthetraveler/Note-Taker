const notes = require('express').Router();
const {v4: uuidv4} = require('uuid');
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');

notes.get('/', (req, res) => readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))));

notes.post('/', (req, res) => {
    console.info(`${req.method} request received for posting notes.`);
    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added!`);
    } else {
        res.error(`Dingbat!!!`);
    };
});

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for deleting notes.`);
    const noteId = req.params.id;
    readAndDelete(noteId, './db/db.json');
    res.json(`Note deleted!!`);
});

module.exports = notes;