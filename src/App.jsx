import { useEffect, useState } from 'react'
import './App.css'
import Editor from './components/Editor.jsx'
import Sidebar from './components/Sidebar.jsx'
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { db, notesCollection } from './firebase.js'





function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(notes[0])
  notes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  const [tempNoteText, setTempNoteText] = useState("")

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.entry)
    }

  }, [currentNote])

  useEffect(() => {
    const timeOut = setTimeout(() => { handleNoteChange() },
      500)
    return () => clearTimeout(timeOut)
  },
    [tempNoteText])


  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setNotes(notesData)
    })
    return () => unsubscribe()

  }

    , [])

  async function createNote() {
    const newNote = {
      entry: `Untitled Note`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()

    }

    try {
      const newNoteRef = await addDoc(notesCollection, newNote)
      const newNoteWithId = { id: newNoteRef.id, ...newNote }
      setCurrentNote(newNoteWithId)
      console.log(currentNote)
    } catch (error) {
      console.error(error)
    }

  }

  function handleNoteClick(id) {
    const selectedNote = notes.find(note => note.id === id)
    setCurrentNote(selectedNote)

  }


  async function handleNoteChange(e) {
    if (!currentNote) return;
    const updatedNote = {
      ...currentNote,
      entry: tempNoteText,
      updatedAt: new Date().toISOString()
    };

    setCurrentNote(updatedNote);
    const docRef = doc(db, "notes", currentNote.id)
    await setDoc(docRef, updatedNote, { merge: true })

    setNotes(notes => {
      // Move the updated note to the top
      return [updatedNote, ...notes.filter(note => note.id !== currentNote.id)];
    });
  }

  async function deleteNote(id) {
    const noteToDelete = doc(db, "notes", id)
    await deleteDoc(noteToDelete)

    if (currentNote && currentNote.id === id) {
      setCurrentNote(null);
    }
  }


  return (
    <>
      <h1>Journal App</h1>
      {notes.length === 0 && <h2>You have no notes yet</h2>}
      <button onClick={createNote}>Create a Note</button>
      <div className='container'>
        <Sidebar className='sidebar' notes={notes} handleNoteClick={handleNoteClick} deleteNote={deleteNote} />
        {currentNote && <Editor className='editor' currentNote={currentNote} handleNoteChange={handleNoteChange} tempNoteText={tempNoteText}
          setTempNoteText={setTempNoteText} />}
      </div>
    </>
  )
}

export default App
