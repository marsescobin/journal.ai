import { useState, useEffect } from 'react'
import '../App.css'


export default function Editor({ className, setTempNoteText, tempNoteText }) {


    return (
        <form >
            <textarea
                className={className}
                name="entry"
                id="entry"
                value={tempNoteText}
                onChange={(e) => setTempNoteText(e.target.value)}
                rows="10"
                cols="30"
                style={{ display: "flex", margin: "1rem" }} />
        </form>
    )
}