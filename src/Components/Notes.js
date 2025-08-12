import React, { useContext, useRef, useState, useEffect } from "react";
import NotesState from "../Context/notes/NotesContext";
import Notesitem from "./Notesitem";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Addnote from "./Addnote";



function Notes(props) {
  const context = useContext(NotesState)
  const {  editNotes } = context;
  const initialNotes = []
  const history = useHistory();
  const [notes, setNotes] = useState(initialNotes)
  
  
 
const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""})
const hasFetched = useRef(false)
  const ref = useRef(null)
  const refClose = useRef(null)
  


 
  
  const updateNotes = (currentNote) => {
    ref.current.click(); // Simulate a button click
    setNote({id: currentNote._id, etitle : currentNote.title, edescription : currentNote.description , etag :currentNote.tag})
  }

  

  const onChange = (e)=>{
    setNote({...note, [e.target.name] : e.target.value})
  }
  const fetchNotes = async ()=>{
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes/` , {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const data = await response.json(); 
    console.log(data)
    setNotes(notes.concat(data))
  } 
  
  const handleClick = (e)=>{
    e.preventDefault()
    refClose.current.click();
    editNotes(note.id ,note.etitle, note.edescription, note.etag)
    
  }
  

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes()
    }
    else{
      history.push('/login')
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      

      <button ref={ref} style={{ display: "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} required/>
                  <div id="emailHelp" className="form-text">
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="description" name="edescription" value={note.edescription} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" id="tag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
       <div className='row my-3'>
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && "No Notes To Display"}
        </div>
    {notes.map((note) => {
      return <Notesitem notes={notes} showAlert={props.showAlert} note={note} updateNotes={updateNotes} key={note._id}/>
    })}
    </div>
    </>
  )
}

export default Notes
