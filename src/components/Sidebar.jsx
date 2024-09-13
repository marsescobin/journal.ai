import { useState, useEffect } from 'react'
import '../App.css'

export default function Sidebar({ notes, handleNoteClick }) {
    const entries = notes.map(note =>
        <div key={note.id}
            onClick={() => handleNoteClick(note.id)}>
            <p>{note.entry || "Untitled Note"}</p>
        </div>)

    return (
        <div>
            {entries}
        </div>
    )
}