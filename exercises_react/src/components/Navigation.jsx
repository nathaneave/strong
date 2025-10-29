import React from 'react'
import '../App.css'

import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="app-nav">
      <Link to="/">Home</Link>
      <Link to="/add-exercise">Add an Exercise</Link>
    </nav>
  );
}

export default Navigation;