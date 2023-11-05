const notes = require('express').Router();
const {vr: uuidv4} = require('uuid');
const { readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))));

module.exports = notes;