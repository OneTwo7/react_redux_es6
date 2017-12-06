import React from 'react';
import { NavLink } from 'react-router-dom';
import LoadingDots from './LoadingDots';
import PropTypes from 'prop-types';

const Header = ({ loading }) => (
  <nav>
    <NavLink exact to="/">Home</NavLink>
    {" | "}
    <NavLink to="/courses">Courses</NavLink>
    {" | "}
    <NavLink to="/about">About</NavLink>
    {loading && <LoadingDots interval={100} dots={20} />}
  </nav>
);

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
