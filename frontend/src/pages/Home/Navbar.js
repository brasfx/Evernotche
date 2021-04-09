import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import img from '../../assets/default_user.png';
import LogoProfile from '../../components/LogoProfile';
import { useTranslation } from 'react-i18next'

import * as BiIcons from 'react-icons/bi';

function Navbar() {
  const {t} = useTranslation()
  const SidebarData = [
    {
      title:  t("home_page"),
      path: '/home',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text',
      id: 'first',
    },
    {
      title: t("add_note"),
      path: '/addnote',
      icon: <FiIcons.FiFilePlus />,
      cName: 'nav-text',
    },
    {
      title:  t("all_notes"),
      path: '/viewnotes',
      icon: <FiIcons.FiFileText />,
      cName: 'nav-text',
    },
    {
      title: t("settings"),
      path: '/configuration',
      icon: <FiIcons.FiSettings />,
      cName: 'nav-text',
    },
    {
      title: t("trash"),
      path: '#',
      icon: <FiIcons.FiTrash2 />,
      cName: 'nav-text',
    },
    {
      title: t("support"),
      path: '/support',
      icon: <BiIcons.BiSupport />,
      cName: 'nav-text',
    },
  ];

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const getName = localStorage.getItem('name');
  const getEmail = localStorage.getItem('email');

  const resetSession = () => {
    localStorage.removeItem('app-token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  };

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <Link
            onClick={resetSession}
            id="first"
            className="navbar"
            to="/"
            style={{ textAlign: 'center' }}
          >
            <FiIcons.FiLogOut size={25} color="#fff" />
            <span style={{ padding: '10px' }}>Logout</span>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items " onClick={showSidebar} id="slide-out">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li style={{ textAlign: 'center', marginBottom: '30px' }}>
              <Link to="#">
                <LogoProfile />
                <h6>{getName}</h6>
                <h6>{getEmail}</h6>
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
