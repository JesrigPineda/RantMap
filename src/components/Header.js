import React from "react";

const Header = ({ color, brand }) => {
  return (
    <nav className={`navbar navbar-expand-md navbar-blue bg-${color} shadow`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {brand ? brand : "Navbar"}{" "}
          <img
            src="https://icongr.am/material/map-search.svg?size=25&color=006eff"
            alt=""
          />
        </a>
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

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="map">
                Map
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
