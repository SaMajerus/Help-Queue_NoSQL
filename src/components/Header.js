import React from "react";
//import ticketsImage from "./../img/tickets.png";
import { Link } from "react-router-dom";

function Header(){
  return (
    <React.Fragment>
      <h1> Help Queue</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
      </ul>
      {/* <img src={ticketsImage} alt="An image of tickets" /> */}
    </React.Fragment>
  );
}

export default Header;