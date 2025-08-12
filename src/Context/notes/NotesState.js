import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NoteContext from "./NotesContext";
import { useState, useEffect } from "react";

const NotesState = (props)=>{
  const host = "http://localhost:5000"
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)
  const history = useHistory();
  // const fetchNotes = async ()=>{
  //   const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes/` , {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": 'application/json',
  //       "auth-token": localStorage.getItem('token')
  //     },
  //   });
  //   const data = await response.json(); 
  //   console.log(data)
  //   setNotes(notes.concat(data))
  //   }
  useEffect(async() => {
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
    // eslint-disable-next-line
  }, [])
  //Add Note
 
  
  const loggingOut = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('dateOfBirth')
    setNotes([])
    history.push('/login')
  }
 

  //Add Note
  const addNote = async (title, description, tag)=>{
    props.showAlert("Note Added successfully", "success")
    const response = await fetch(`${host}/api/notes/toaddnote/` , {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const data = await response.json();
    const note = data;
    setNotes(notes.concat(note))
    
  }
  
  //Delete Note
  const deleteNote = async (id)=>{
    const response = await fetch(`${host}/api/notes/deletenotes/${id}` , {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    
  }

  //Edit Notes
  const editNotes = async (id, title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/toupdatenotes/${id}` , {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json()
    props.showAlert("Note Update successfully", "success")
    
   
    //For creating new Array
    let newNotes = JSON.parse(JSON.stringify(notes))
    

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  
    return(
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNotes, loggingOut}}>
            {props.children}
        </NoteContext.Provider>
    )

  }
  
export default NotesState;