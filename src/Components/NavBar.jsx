import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/header-logo-gfn.png';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/plants', label: 'Plants' },
  { to: '/sales/information', label: 'Sales Information' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light sticky-top gfn-navbar" aria-label="Primary navigation">
    <div className="container-fluid gfn-navbar__inner">
      <Link to="/" className="navbar-brand gfn-navbar__brand" aria-label="GFN home">
        <img src={logo} alt="GFN — Green Flow Nurseries" className="header-logo" />
        <span className="header-logo__text">Green Flow</span>
      </Link>

      <button
        type="button"
        className="navbar-toggler gfn-navbar__toggle"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse gfn-navbar__collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto gfn-navbar__links">
          {navItems.map((item) => (
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}
              state={item.to === '/about' ? { hiddenParam: 'nobtn' } : undefined}
              key={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
