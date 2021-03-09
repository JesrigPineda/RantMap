import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ color, brand }) => {
  return (
    <nav className={`navbar navbar-expand-md navbar-blue bg-${color} shadow`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {brand ? brand : 'Navbar'}{' '}
          <img
            src="https://icongr.am/material/map-search.svg?size=25&color=006eff"
            alt=""
          />
        </Link>
        <button
          className="navbar-toggler navbar-light bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
