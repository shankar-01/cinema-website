import "./homepage.css";
import Crousel from "./Crousel.js";
import MoviesPanel from "./MoviesPanel";
import MovieDetail from "./MovieDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  document.body.style.backgroundColor = "black";
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<>
          <Crousel />
          <MoviesPanel />
          </>}>
          
          </Route>
          <Route 
          path="details/:id"
           element={<MovieDetail />}>
          </Route>  
        </Routes>
      </Router>
    </div>
  );
}
function Navbar() {
  return (
    <div>
      <img
        src="https://cdn.worldvectorlogo.com/logos/oscar-event-management-2.svg"
        className="image"
        alt="logo"
      />
      <ul>
        <li className="active">
          <button>Home</button>
        </li>
        <li>
          <button>About</button>
        </li>
        <li>
          <button>Contact Us</button>
        </li>
        <li>
          <button id="loginOrReg" 
          className="btn btn-info" 
  data-toggle="modal" data-target="#myModal">Login or Register</button>
        </li>
      </ul>
      <Modal />
    </div>
  );
}
function Modal(){
  return (<div className="modal fade" id="myModal" role="dialog">
  <div className="modal-dialog">

    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title" align="center">Login</h4>
      </div>
      <div className="modal-body">
        <table align="center" width="80%">
          <tbody>
            
          <tr>
            <td><input type="text" style={{
              width:"100%", fontSize:"1.5em"}}
            placeholder="Email or User Name"/></td>
          </tr>
          
          <tr>
            <td><input type="password" style={{
              width:"100%", fontSize:"1.5em"}}
            placeholder="Password"/></td>
          </tr>
          
          <tr>
            <td><input className="btn btn-info btn-block" type="button"
            value="Login"/></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="modal-footer">
        <p>Not a member yet? <a></a></p>
      </div>
    </div>
    
  </div>
</div>);
}