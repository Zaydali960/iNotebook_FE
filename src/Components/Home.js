import React, { useContext, useState } from "react";
import NotesState from "../Context/notes/NotesContext";
import sidebarCss from '../my-css/sidebar.module.css'
import Notes from "./Notes";

import Notesitem from "./Notesitem";




const Home = (props) => {
  const context = useContext(NotesState)
  const { notes } = context;
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""})
  
  const updateNotes = (currentNote) => {
    // ref.current.click(); // Simulate a button click
    setNote({id: currentNote._id, etitle : currentNote.title, edescription : currentNote.description , etag :currentNote.tag})
  }
 

  return (
    <>
    <div  className={`d-flex `}>
      
    
      its home
    
    </div>
   
    </>
  );
};

export default Home;
