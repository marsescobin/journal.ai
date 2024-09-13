import { useState, useEffect } from 'react'
import '../App.css'


export default function Editor({ className, submitEntry, currentNote, handleNoteChange }) {


    function handleSubmit(e) {
        e.preventDefault()
        submitEntry(e)
    }


    return (
        <form >
            <textarea
                className={className}
                name="entry"
                id="entry"
                value={currentNote.entry}
                onChange={(e) => handleNoteChange(e)}
                rows="10"
                cols="30"
                style={{ display: "flex", margin: "1rem" }} />
        </form>
    )
}