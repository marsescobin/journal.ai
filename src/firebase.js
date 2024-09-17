import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPq7vWPTkfldjlvIOGOIpPSkmiCrO6HLU",
    authDomain: "journal-ai-72a08.firebaseapp.com",
    projectId: "journal-ai-72a08",
    storageBucket: "journal-ai-72a08.appspot.com",
    messagingSenderId: "805837470765",
    appId: "1:805837470765:web:d2c597ae9fade320884ca4",
    measurementId: "G-7TMKSS61Y8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const notesCollection = collection(db, "notes");

export { db, notesCollection };