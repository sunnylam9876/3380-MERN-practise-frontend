import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        BookList
      </Link>{' '}
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              List all book in database
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Add A book
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
