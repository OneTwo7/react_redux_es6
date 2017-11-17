import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav>
    <NavLink exact to="/">Home</NavLink>
    {" | "}
    <NavLink to="/courses">Courses</NavLink>
    {" | "}
    <NavLink to="/about">About</NavLink>
  </nav>
);

export default Header;
