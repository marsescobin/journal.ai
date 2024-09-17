import { useState, useEffect } from 'react'
import '../App.css'

export default function Sidebar({ notes, handleNoteClick, deleteNote }) {

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    }


    const entries = notes.map(note =>
        <div key={note.id}
            onClick={() => handleNoteClick(note.id)}
            className="sidebar-entry">
            <div className="sidebar-note-info">
                <p className="sidebar-note-title">{note.entry || "Untitled Note"}</p>
                <span className="sidebar-note-updated-at">{formatDate(note.updatedAt)}</span>
            </div>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>)

    return (
        <div className="sidebar">
            {entries}
        </div>
    )
}