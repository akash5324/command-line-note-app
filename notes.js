//alll working as per command
console.log('Starting notes.js');
const fs = require('fs');
//fetching all notes from saved json data
var fetchNotes = () => {
  try {
    //reading file synchronously
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);//returning data in string form
  } catch (e) {//if no match found
    return [];// returning empty data
  }
};
//saving notes in json format at notes-data.json
var saveNotes = (notes) => {
  //saving data synchronously
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
//adding note
var addNote = (title, body) => {
  var notes = fetchNotes();//fetching existing notes
  var note = {
    title,
    body
  }
  //checking duplicateNotes
  var duplicateNotes = notes.filter((note) => note.title === title);
//if duplicates not exists then save notes
  if (duplicateNotes.length === 0) {
    notes.push(note);//pushing new notes
    saveNotes(notes);//saving notes in json data
    return note;
  }
};

//listing notes
var getAll = () => {
  return fetchNotes();
};
//reading notes
var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

//removing notes
var removeNote = (title) => {
  //fetch the note
  var notes=fetchNotes();
  //filter the note with that title
  var filteredNotes=notes.filter((note)=>note.title!=title);
  saveNotes(filteredNotes);
//checking notes removed or not
  return notes.length!==filteredNotes.length;
};

//showing notes for reading with body
var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

//exportig all functions
module.exports = {
  addNote,
  getAll,
  getNote,
  logNote,
  removeNote
};
