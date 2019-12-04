// Dependencies
const express = require("express");
const path = require("path");
const fs = require ("fs");

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//empty notes at the beginning
const notes = [];

// Routes
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Displays all notes ???
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

// ???? Displays a single note, or returns false
app.get("/api/notes/:note", function(req, res) {
    var chosen = req.params.character;
  
    console.log(chosen);
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === notes[i].routeName) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
  });

//create new post
app.post("/api/notes", function(req, res){
    let newNote = req.body;

    // Using a RegEx Pattern to remove spaces from newNote
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.name = newNote.name.replace(/\s+/g, "").toLowerCase();

    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
});



// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});