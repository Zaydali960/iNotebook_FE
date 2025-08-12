import React, {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Signup = (props) => {
  let history = useHistory()
   const [credentials, setcredentials]= useState({name:"", lastName:"", dateOfBirth:"", email:"", password:"", cpassword:""})
    const onChange = (e)=>{
      setcredentials({...credentials, [e.target.name] : e.target.value})
    }
    const handleClick = async (e)=>{
      e.preventDefault()
    console.log(credentials.dateOfBirth)
    const response = await fetch(`http://localhost:5000/api/auth/createuser` , {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({name:credentials.name, lName:credentials.lastName, email: credentials.email, password: credentials.password,dob:credentials.dateOfBirth}),
    });
    const json = await response.json()
    
    console.log(json)
    console.log(credentials.dateOfBirth)
     if(json.succes){
      //redirect
      localStorage.setItem('token', json.authtoken)
      history.push("/")
      props.showAlert("Account Created Successfully", "success")
     }
     else{
      props.showAlert("This Email Already Exist", "danger")
     }
     if(credentials.name, credentials.dateOfBirth){
      localStorage.setItem('firstName',credentials.name)
      localStorage.setItem('lastName',credentials.lastName)
      localStorage.setItem('dateOfBirth',credentials.dateOfBirth)
      
     }
  }
  return (
<div className='mt-2 container'>
<h1 className='my-2'>Create an account to explore iNotebook</h1>
      <form onSubmit={handleClick}>
      <div className="form-group my-2">
    <label htmlFor="exampleInputPassword1">First Name</label>
    <input type="text" className="form-control" id="name" name="name" placeholder='First Name' onChange={onChange}/>
  </div>
      <div className="form-group my-2">
    <label htmlFor="exampleInputPassword1">Last Name</label>
    <input type="text" className="form-control" id="lastName" name="lastName" placeholder='Last Name' onChange={onChange}/>
  </div>
      <div className="form-group my-2">
    <label htmlFor="exampleInputPassword1">Date Of Birth</label>
    <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" placeholder='Enter Date Of Birth' onChange={onChange}/>
  </div>
  <div className="form-group my-2">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group my-2">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" placeholder="Password"onChange={onChange} minLength={5} required/>
  </div>
  <div className="form-group my-2">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Password"onChange={onChange} minLength={5} required/>
  </div>
  
  <button disabled={credentials.password!==credentials.cpassword} type="submit" className="btn btn-primary" >Signup</button>
</form>
    </div>
  )
}

export default Signup
