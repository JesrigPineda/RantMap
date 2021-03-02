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
      </div>
    </nav>
  );
};

export default Header;
