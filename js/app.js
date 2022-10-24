// Variables
//  definition of empty My Notes
const noteList = document.querySelector("#note-list");

// EventListeners
eventListeners();
function eventListeners() {
  // eventlistener for form adding note to note-list
  document.querySelector("#form").addEventListener("submit", newNote);
  //  eventlistener for removing item from note-list
  document.querySelector("#note-list").addEventListener("click", removeNote);
  //   load items from local storage to My Notes on load
  document.addEventListener("DOMContentLoaded", notesOnLoad);
}

// Functions
//  function for adding notes to note list
function newNote(e) {
  //  prevent for refreshing page
  e.preventDefault();
  // get value from textarea
  const notes = document.querySelector("#MNotes").value;
  //  create li element
  const li = document.createElement("li");
  // add content of text area to li
  li.appendChild(document.createTextNode(notes));
  //  create remove button
  const removeBtn = document.createElement("a");
  // give  X sign  to remove button
  removeBtn.appendChild(document.createTextNode("X"));
  //  assign a class to remove button
  removeBtn.classList = "r-btn";
  // add remove button to li
  li.appendChild(removeBtn);
  // add li as new note to note-list
  noteList.appendChild(li);

  this.reset();

  //  also add the note in  local storage
  addNoteToLocalStorage(notes);

  alert("You Add New Note successfully.");
}


//  function for removing notes from note list
function removeNote(e) {
  if (e.target.classList.contains("r-btn")) {
    e.target.parentElement.remove();
  }
  //  also remove note from local storage
  removeNoteFromLocalStorage(e.target.parentElement.textContent);
}


//  also add note to local storage
function addNoteToLocalStorage(note) {
  //  get notes from local storage
  const notes = getNoteFromLocalStorage();
  // add new note to notes array
  notes.push(note);
  //  create notes item and set items to it(before saving we need to turn array into string)
  localStorage.setItem("notes", JSON.stringify(notes));
}


// add items from local storage to My Notes on load
function notesOnLoad() {
  //  get notes from local storage
  const notes = getNoteFromLocalStorage();
  notes.forEach(function (note) {
    //  create li element
    const li = document.createElement("li");
    // add content of text area to li
    li.appendChild(document.createTextNode(note));
    //  create remove button
    const removeBtn = document.createElement("a");
    // give  X sign  to remove button
    removeBtn.appendChild(document.createTextNode("X"));
    //  assign a class to remove button
    removeBtn.classList = "r-btn";
    // add remove button to li
    li.appendChild(removeBtn);
    // add li as new note to note-list
    noteList.appendChild(li);
    //  also add the note in  local storage
  });
}


// remove notes from local storage
function removeNoteFromLocalStorage(noteContent) {
  // remove letter X from note
  const deletedNote = noteContent.substring(0, noteContent.length - 1);
  //  get notes from local storage
  const NoteFromLS = getNoteFromLocalStorage();
  //  check deletedNote is in array of notes
  NoteFromLS.forEach(function (note, index) {
    if (note === deletedNote) {
      //  if is true remove note from array
      NoteFromLS.splice(index, 1);
    }
  });
  //    set new array with deletedNote to local storage
  localStorage.setItem("notes", JSON.stringify(NoteFromLS));
}


// get notes from local storage
function getNoteFromLocalStorage() {
  const checkNotes = localStorage.getItem("notes");
  if (checkNotes === null) {
    //  if notes item is empty ,  empty array
    notes = [];
  } else {
    //  if notes item is not empty , turn  notes item into array
    notes = JSON.parse(checkNotes);
  }
  return notes;
}
