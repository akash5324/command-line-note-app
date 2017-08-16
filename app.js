//controlling all functioning....
console.log('welcome to Notes App');
console.log('use these commands to use the functionality of note app:');
console.log('1. To Add new Note: node app.js add --title="your Title" --body="your note"');
console.log('2. To list down all Notes: node app.js list');
console.log('3. To read Note with title: node app.js read --title="existing or known title"');
console.log('4. To remove existing Note: node app.js remove --title=" your notes title which you wanna remove"');
console.log('------------------------------------------------');
console.log('starting app....');
const fs = require('fs');//file system modules
const os = require('os');//operating system modules
const _ = require('lodash');//third party module
const notes = require('./notes.js');//fetching notes.js file
const yargs=require('yargs');//to arrange the return arguments and data
const argv=yargs.argv;//fetching argument vector
var command = argv._[0];//fetching command given by user
console.log('command:',command);
//Adding notes
//command to type in console: node app.js title="title name" body="body of note"
if(command==='add')
{
  var note = notes.addNote(argv.title, argv.body);//adding to notes.js
  //checking status
  if (note) {
    console.log('Congrats !! New Note created');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('oops!! Note title already taken');
  }
}

//listing notes
//command to type in console: node app.js list
else if(command==='list')
{

  var allNotes=notes.getAll();
  console.log(`there are total of ${allNotes.length} note(s)`);
  allNotes.forEach((note)=>notes.logNote(note));//looping through all notes
}

//reading notes with specific title
//command to type in console: node app.js read title:"title name"
else if(command==='read')
{
  var note = notes.getNote(argv.title);
    if (note) {
      console.log('Note found');
      notes.logNote(note);
    } else {
      console.log('Note not found');
    }
}

//removing notes with specific Title
//command to type in console: node app.js title="title name"
else if(command==='remove')
{
  console.log('removing notes');
  var removed=notes.removeNote(argv.title);
  if(removed)
  {
    console.log('note removed')
  }
  else {
    console.log('note not found');
  }
}

//incorrect command
else
{
    console.log(' command not recognized! please type a valid command');
}
