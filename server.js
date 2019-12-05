// Dependencies
const express = require("express");
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Buit-in util package can be used to create Promise-based versions
//of functions using node style callbacks
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const appendFileAsync = util.promisify(fs.appendFile);
const writeFileAsync = util.promisify(fs.writeFile);

//empty notes at the beginning
let notes = [];

// Routes
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
  readFileAsync("db.json", "utf8").then(function(data){
    //parse the JSON string to an array object
    let noteJSON = JSON. parse(data);
    return db.json(notes);
  });
});

//create new post
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  notes.push(newNote);
  db.json(newNote);
});

//delete a post
app.delete("/api/notes/:id", function(req, res) {
  let chosen = req.params.id;
  for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i]) {
      delete notes[i];
      noteJSON = JSON.stringify(notes,null,2);
      writeFileAsync("db.json", noteJSON).then(function(){
        console.log ("Note has been deleted!");
      });
    }
  }
  return db.json(false);
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
