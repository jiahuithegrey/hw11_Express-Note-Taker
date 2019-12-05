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
let noteData = require("./db/db.json");

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//-----------------------------------------------------------

// Displays all notes
app.get("/api/notes", function(req, res) {
  res.json(noteData);
});

//create new post
app.post("/api/notes", function(req, res) {
  let newNote = req.body;

  console.log("Req.body:", req.body);
  noteData.push(newNote);

  // write to the db.json file as well
  writeFileAsync("./db/db.json", JSON.stringify(noteData)).then(function(){
    console.log("db.json has been updated!");
  })

  res.json(newNote);
});

//delete a post
app.delete("/api/notes/:id", function(req, res) {
  console.log("Req.params:", req.params);

  let chosenId = parseInt(req.params.id);

  for (let i = 0; i < noteData.length; i++) {
    if (chosenId === noteData[i].id) {
      delete noteData[i];
      let noteJSON = JSON.stringify(noteData, null, 2);
      writeFileAsync("./db/db.json", noteJSON).then(function() {
        console.log("Note has been deleted!");
      });
    }
  }
  //return res.json(false);
});

// If no matching route is found default to home
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
