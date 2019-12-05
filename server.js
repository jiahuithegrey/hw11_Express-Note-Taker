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

//global variables
let noteData;

// Routes
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// If no matching route is found default to home
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
//-----------------------------------------------------------

// Displays all notes
app.get("/api/notes", function(req, res) {
  // readFileAsync("db.json", "utf8").then(function(data){
  //   //parse the JSON string to an array object
  //   let noteJSON = JSON. parse(data);
  //   return db.json(notes);
  res.json(noteData);
  });

//create new post
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  noteData.push(newNote);
  res.json(newNote);
  //res.json(true); what does it mean?
});

//delete a post
app.delete("/api/notes/:id", function(req, res) {
  let chosen = req.params.id;
  for (let i = 0; i < noteData.length; i++) {
    if (chosen === noteData[i]) {
      delete noteData[i];
      noteJSON = JSON.stringify(notes,null,2);
      writeFileAsync("db.json", noteJSON).then(function(){
      console.log ("Note has been deleted!");
      });
    }
  }
  return res.json(false); //what does it mean?
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
