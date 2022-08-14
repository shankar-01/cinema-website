import "./homepage.css";
import Crousel from "./Crousel.js";
import MoviesPanel from "./MoviesPanel";
import MovieDetail from "./MovieDetail";
import Footer from "./Footer";
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import About from "./About";
import React, { useState } from "react";
import ContactUs from './ContactUs';
import Account from "./Account";
import axios from "axios";
export default function App() {
  window.BeforeUnloadEvent = ()=>{
    localStorage.removeItem("cinema-account")
  }
  
  const [account, setAccount] = useState(()=>{
    if(localStorage.getItem("cinema-account"))
      return true;
    })
  const accountSet = (val)=>{
    setAccount(val)
  }
  document.body.style.backgroundColor = "black";
  return (
    <div className="App">
      <Router>
      <Navbar account={account}/>
      <Routes>
          <Route path="/" element={<>
          <Crousel />
          <MoviesPanel />
          </>}>
          
          </Route>
          <Route 
          path="details/:i"
           element={<MovieDetail />}>
          </Route>
          <Route 
          path="/about"
           element={<About />}>
          </Route>
          <Route 
          path="/contactus"
           element={<ContactUs />}>
          </Route>
          <Route path='/account'
          element={<Account/>}
          ></Route>
        </Routes>
        <Footer/>
      </Router>
      <Login fn={accountSet}/>
      <Registeration />
    </div>
  );
}
function Navbar(prop) {
  
  return (
    <div >
      <img
        src="https://cdn.worldvectorlogo.com/logos/oscar-event-management-2.svg"
        className="image"
        alt="logo"
      />
      <ul>
        <li className="active" 
        >
          <Link to="/">
              
            <button>
            <i className="fa fa-home"></i>
              Home</button></Link>
        </li>
        <li >
        <Link to="/about">
        
          <button>
          <i className="fa fa-info-circle"></i>
            About</button></Link>
        </li>
        <li >
        <Link to="/contactus">
        
        <button>
        <i className="fa fa-send"></i>
          Contact Us
          </button></Link>
        
        </li>
        <li>
          {!prop.account?
    <button id="loginOrReg" 
            className="btn btn-info"
    data-toggle="modal" data-target="#login">Login or Register</button>:
    <Link to="/account">
    <button  
    className="btn btn-primary" style={{
      borderRadius: "50%"}}>
    <i className="fa fa-user"></i>
    </button>
    </Link>
    }
          
          
          
        </li>
      </ul>
      
      
    </div>
  );
}
function Login(prop){
  const login = async ()=>{
    const email = document
    .getElementById("loginEmail").value;
    const pass = document
    .getElementById("loginPass").value;

    const {data} = await axios
    .put('http://localhost:4000/api/login', 
    {
      _id:email
      ,password:pass
    })
    if(data[0]){
      alert("Login Successfull")
      prop.fn(true)
      localStorage.setItem("cinema-account", 
      JSON.stringify(data[0]))
    }
    else{
      alert("Check Email and Password!")
    }
  }
  return (<div className="modal fade" id="login" role="dialog">
  <div className="modal-dialog">

    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title" align="center">Login</h4>
      </div>
      <div className="modal-body">
        <table align="center" width="80%"
        height="250rem" >
          <tbody>
            
          <tr>
            <td><input type="text" style={{
              width:"100%", fontSize:"1.5em"}}
            placeholder="Email"
            id="loginEmail"
            /></td>
          </tr>
          
          <tr>
            <td><input type="password" style={{
              width:"100%", fontSize:"1.5em"}}
            placeholder="Password"
            id="loginPass"
            /></td>
          </tr>
          
          <tr>
            <td><input className="btn btn-info btn-block" type="button"
            value="Login"
            onClick={login}
            /></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="modal-footer">
        <p>Not a member yet? 
          <a data-toggle="modal" 
          data-target="#register">create account</a>
        </p>
      </div>
    </div>
    
  </div>
</div>);
}
function Registeration(){
  const validate = (mail)=>{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true;
  }
    return false;
  }
  const register = async ()=>{
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const pass = document.getElementById('pass').value
    const cpass = document.getElementById('cpass').value
    
    if(validate(email)){
      if(name.length>0){
        if(pass == cpass){
          if(pass.length==0){
            alert("Enter Password")
            return;
          }
        const {data} = await axios
      .put('http://localhost:4000/api/register',
      {
        _id:email,
        password:pass,
        name:name
      })
      if(data){
        alert("Account Created Successfully")
        
      }
      else{
        alert("Error Occured. You are already member.")
      }
        }
        else{
          alert('Confirm password did not match.')
        }
      }
      else{
        alert("Enter name")
      }
    }
    else{
      alert("insert valid email!")
    }
  }
  return (
    <div className="modal fade" id="register" role="dialog">
  <div className="modal-dialog">

    <div className="modal-content">
      <div className="modal-header">
        <button type="button" 
        className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title" align="center">
          Register</h4>
      </div>
      <div className="modal-body">
      <table align="center" width="80%" 
      height="250rem">
          <tbody>
          <tr>
            <td><input type="text" style={{
              width:"100%", fontSize:"1.5em"}}
            placeholder="Name"
            id="name"
            /></td>
          </tr>
          <tr>
            <td><input type="text" style={{
              width:"100%", fontSize:"1.5em"}}
            placeholder="Email"
            id="email"
            /></td>
          </tr>
          
          <tr>
            <td><input type="password" style={{
              width:"100%", fontSize:"1.5em"}}
            placeholder="Password"
            id="pass"
            /></td>
          </tr>
          <tr>
            <td><input type="password" style={{
              width:"100%", fontSize:"1.5em"}}
            placeholder="Confirm Password"
            id="cpass"
            /></td>
          </tr>
          <tr>
            <td><input className="btn btn-info btn-block" type="button"
            value="Register" onClick={register}
            data-dismiss="modal"
            /></td>
          </tr>
          </tbody>
        </table>
    </div>
    <div className="modal-footer">
    <p>Already a member? <a data-dismiss="modal">Login</a></p>
    </div>
  </div>
  </div>
  </div>
  )
}