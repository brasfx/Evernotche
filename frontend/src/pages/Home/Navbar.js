import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFilePlus, FiLogOut, FiMenu } from 'react-icons/fi';
import yuna from '../../assets/default_user.png';
import logo from '../../assets/logo.png';
import './Navbar.css';
import M from 'materialize-css';

export default function Navbar() {
  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
    return () => {};
  });
  return (
    <div>
      <nav>
        <div className="nav-wrapper" style={{ backgroundColor: '#272727' }}>
          <Link
            data-target="slide-out"
            className="sidenav-trigger show-on-large"
          >
            <FiMenu size={25} color="#fff" />
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link id="first" to="/" style={{ textAlign: 'center' }}>
                <FiLogOut size={20} color="#fff" />
                <span style={{ padding: '10px' }}>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul
        id="slide-out"
        className="sidenav"
        style={{
          width: '25vw',
          minWidth: '400px',
          backgroundColor: '#272727',
        }}
      >
        <li>
          <div className="user-view">
            <Link to="/home">
              {' '}
              <img
                className="circle"
                src={yuna}
                style={{ width: '100px', height: '100px' }}
              />
            </Link>
            <Link>
              {' '}
              <span
                className="white-text name"
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                John Doe
              </span>
            </Link>
            <Link to="#">
              <span
                className="white-text email"
                style={{ fontSize: '14px', fontWeight: 'bold' }}
              >
                jdandturk@gmail.com
              </span>
            </Link>
          </div>
        </li>
        <li>
          <div className="divider"></div>
        </li>
        <br />
        <li>
          <Link id="first" to="/addnote">
            {' '}
            <FiFilePlus size={20} color="#fff" />
            <span style={{ padding: '10px' }}>Adicionar nota</span>
          </Link>
        </li>
        <br />
      </ul>
    </div>
  );
}
