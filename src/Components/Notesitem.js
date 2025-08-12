import React, { useContext, useEffect,  } from "react";
import NotesState from "../Context/notes/NotesContext";


function Notesitem(props) {
  
  const context = useContext(NotesState)
    const {deleteNote} = context;
    const delNote = ()=>{
      deleteNote(note._id)
      props.showAlert("Note Deleted successfully", "success")
    }
    
    const {note, updateNotes} = props; 
    const updNote = ()=>{
      
      updateNotes(note)
    }
    
    
    return (
    <div className='col-md-3'>
      <div className="my-3">
  <div className="card-body">
    <div className="d-flex justify-content-between">
    <h5 className="card-title">{note.title}</h5>
    <div className="d-flex">
    <i className="fa-solid fa-trash-can mx-2" style={{"fontSize": "22px"}} onClick={delNote}></i>
    <i className="fa-solid fa-pen-to-square mx-2 " style={{"fontSize": "22px"}} onClick={updNote}></i>
    </div>
    </div>
    <p className="card-text"> {note.description}</p>
  </div>
</div>
    </div>
  )
}

export default Notesitem
