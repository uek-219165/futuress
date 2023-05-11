import Hamburger from "hamburger-react";
import Logout from "../components/clickables/Logout";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <img
          className="logo logo-nav"
          src="./assets/logo-light.svg"
          alt="Futures"
        />
        <Hamburger onToggle={() => setShowMenu(!showMenu)} />
        <ul className={`navMenu ${showMenu ? "active" : ""}`}>
          <li className="navMenu__item">
            <NavLink className="btn btn-primary link" to="/">
              Home
            </NavLink>
          </li>
          <li className="navMenu__item">
            <NavLink className="btn btn-primary link" to="/archives">
              Archives
            </NavLink>
          </li>
          <li className="navMenu__item">
            <Logout />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
