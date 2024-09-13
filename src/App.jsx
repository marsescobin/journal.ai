import { useEffect, useState } from 'react'
import './App.css'
import Editor from './components/Editor.jsx'
import Sidebar from './components/Sidebar.jsx'


function handleCreateNoteId() {
  let id = 0
  return function addNoteId() {
    return id += 1
  }
}

const addNote = handleCreateNoteId()


function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)


  function createNote() {
    const newNote = {
      id: addNote(),
      entry: `What's going on?`

    }
    setNotes(prev => (
      [...prev, newNote]
    ))
    setCurrentNote(newNote)

  }

  function handleNoteClick(id) {
    const selectedNote = notes.find(note => note.id === id)

    setCurrentNote(selectedNote)
    console.log(currentNote)

  }

  function handleNoteChange(e) {
    setCurrentNote(prev => ({
      ...prev,
      entry: e.target.value
    }))
    setNotes(prev => prev.map(note => note.id === currentNote.id ? { ...note, entry: e.target.value } : note))
  }


  return (
    <>
      <h1>Journal App</h1>
      {notes.length === 0 && <h2>You have no notes yet</h2>}
      <button onClick={createNote}>Create a Note</button>
      <div className='container'>
        <Sidebar className='sidebar' notes={notes} handleNoteClick={handleNoteClick} />
        {currentNote && <Editor className='editor' currentNote={currentNote} handleNoteChange={handleNoteChange} />}
      </div>
    </>
  )
}

export default App
