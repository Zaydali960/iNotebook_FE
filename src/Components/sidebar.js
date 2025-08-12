import React from 'react'
import sidebarCss from '../my-css/sidebar.module.css'
import { Link } from "react-router-dom";

const sidebar = () => {
  return (
    <div className={`${sidebarCss.container}`}>
    <div className={`d-flex row my-3 ${sidebarCss.sidebar} `} style={{"height":"450px"}} >
        <div className={`${sidebarCss.box}`}>
        <Link to='/'><i className={`fa-solid fa-house ${sidebarCss.icon} `}></i></Link>
        <Link  className={`${sidebarCss.link}`} to='/'><p className={`${sidebarCss.para1}`}>Home</p></Link>
      </div>
        <div className={`${sidebarCss.box}`}>
        <Link to='/addnotes'><i className={`fa-solid fa-pen ${sidebarCss.icon}`}></i></Link>
        <Link className={`${sidebarCss.link}`} to='/addnotes'><p className={`${sidebarCss.para2}`}>Add Note</p></Link>
      </div>
        <div className={`${sidebarCss.box}`}>
        <Link to='/notes'><i className={`fa-solid fa-note-sticky ${sidebarCss.icon} `}></i></Link>
        <Link className={`${sidebarCss.link}`} to='/notes'><p className={`${sidebarCss.para3}`}>Notes</p></Link>
      </div>
        <div className={`${sidebarCss.box}`}>
        <Link to='/me'><i className={`fa-solid fa-user ${sidebarCss.icon} `}></i></Link>
        <Link className={`${sidebarCss.link}`} to='/me'><p className={`${sidebarCss.para4}`}>Me</p></Link>
      </div>
    </div>
    </div>
  )
}

export default sidebar
