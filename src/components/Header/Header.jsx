import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <div className="header">
        <Link to="/Home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button>Log out</button>
        </div>
    );
};

export default Header;