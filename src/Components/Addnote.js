import React, { useContext, useState, useEffect } from "react";
import NotesState from "../Context/notes/NotesContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Addnote(props) {
    const context = useContext(NotesState)
    const {addNote} = context;
    
    
   
    const [note, setNote] = useState({title:"", description:"", tag:""})
    const handleClick = (e)=>{
      e.preventDefault()
      if(localStorage.getItem('token')){
        addNote(note.title, note.description, note.tag)
        setNote({title:"", description:"", tag:""})
      }
      else{
        props.showAlert("Login To Add Notes", "danger")
      }
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }

    
      // useEffect(() => {
      //    if(fetched===""){
      //      fetchNotes()
      //      setFetched(null)
      //    }
      //    else{
      //      history.push('/login')
      //    }
      //    // eslint-disable-next-line
      //  }, [])
     
  return (
    <div className="container my-3">
    <h1>Add a note</h1>
    <form className="my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
        <div id="emailHelp" className="form-text">
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input type="text" className="form-control" id="description" name="description"  value={note.description} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Tag
        </label>
        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
      </div>
      
      <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<5 || note.description.length<5}>
        Add Note
      </button>
    </form>
    </div>
  )
}

export default Addnote
