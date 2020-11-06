const express = require("express");
const path = require("path");
const fs = require("fs");

const server = express();

const PORT = process.env.PORT || 3000;


server.use(express.urlencoded({ extended: true }));
server.use(express.json());


// deliver static files in assets folder
server.use("/assets",express.static(path.join(__dirname, "assets")));


//routes for html pages and apis
server.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
})

server.get("/notes", (req,res)=> {
    res.sendFile(path.join(__dirname, "notes.html"));
})

server.get("/api/notes", (req,res)=> {
    // get request function to read all notes in db.json
    // send response to server
    let notes = fs.readFileSync("db.json");
    res.json(JSON.parse(notes));
})


server.post("/api/notes", (req, res)=> {
    //post method, get new note be saved
    let newNote = req.body;

    //read notes form db.json
    //create array of exisiting notes
    //push new note into array
    let readNotes = fs.readFileSync("db.json");
    let notesArray = JSON.parse(readNotes);
    notesArray.push(newNote);
    //write all notes to db.json
    fs.writeFileSync("db.json", JSON.stringify(notesArray));
    //send updated note array to server
    res.json(notesArray);
})


server.delete("/api/notes/:id", (req, res)=> {
    // read all notes from db.json
    let getNotes = fs.readFileSync("db.json");
    let allNotes = JSON.parse(getNotes);
    // create an array by removing the note that is to be deleted
    // this is done by creating an array of all notes that do not match the delete note id
    // req.params.id has the unique note id to be deleted
    const newNotesArray = allNotes.filter(notes => notes.id !== req.params.id);
    //write updated notes to db.json
    fs.writeFileSync("db.json", JSON.stringify(newNotesArray));
    //send updated notes to server
    res.json(newNotesArray);
})

//all undefinded routes will load index.html
server.get("/*", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
})


server.listen(PORT, ()=> {
    console.log(`Server listening on: http://localhost: ${PORT}`);
})