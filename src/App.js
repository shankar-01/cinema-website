import "./homepage.css";
import Crousel from "./Crousel.js";
export default function App() {
  document.body.style.backgroundColor = "black";
  return (
    <div className="App">
      <Navbar />
      <Crousel />
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
          <button id="loginOrReg">Login or Register</button>
        </li>
      </ul>
    </div>
  );
}