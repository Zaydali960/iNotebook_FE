import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Login = (props) => {
  let history = useHistory()
  const [credentials, setcredentials]= useState({email:"", password:""})
  const onChange = (e)=>{
    setcredentials({...credentials, [e.target.name] : e.target.value})
  }

  const handleClick = async (e )=>{
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/auth/login` , {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password}),
    });
    const json = await response.json()
    console.log(json)
     if(json.succes){
      //redirect
      console.log(localStorage.setItem('token', json.authtoken))
      history.push("/")
      props.showAlert("Logged in Successfully", "success")
     }
     else{
      props.showAlert("Try With Right Credentials", "danger")
     }
  }
  return (
    <div className='mt-2'>
      <h1>Logged in to create notes</h1>
      <form  onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name="email"  aria-describedby="emailHelp"  onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} id="password"  name="password" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login
