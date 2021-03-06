// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var dbjson = require("./db/db.json")
var moment = require('moment'); // require


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


// Routes added for notes.html and index.html files
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
    res.json(dbjson);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    newNote.id = moment().format(); 

    console.log(newNote);

    dbjson.push(newNote);

    res.json(newNote);
});

app.delete("/api/notes", function (req, res) {

    res.send(dbjson);
});

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});
