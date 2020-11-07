import React, { Component } from 'react';
import yuna from '../../assets/default_user.png';
import logo from '../../assets/logo.png';
import './Navbar.css';
import M from 'materialize-css';

export class Navbar extends Component {

    componentDidMount() {

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems, {});
        });

    }

    render() {
        return (
            <div>
            <nav>
                <div className="nav-wrapper" style={{backgroundColor: "#272727"}}>
                <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>

                <a href="#" className="brand-logo"><img className="circle" src={logo} style={{width: "75px", height: "75px"}}/></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                
                    <li><a id="first" href="/">Logout</a></li>
                
                </ul>
                </div>
            </nav>


            <ul id="slide-out" className="sidenav" style = {{width: "25vw", minWidth: "400px", backgroundColor: "#272727"}}>
                <li><div className="user-view">
                <a href="#user"><img className="circle" src={yuna} style={{width: "100px", height: "100px"}}/></a>
                <a href="#name"><span className="white-text name" style={{fontSize: "24px", fontWeight: "bold"}}>John Doe</span></a>
                <a href="#email"><span className="white-text email" style={{fontSize: "14px", fontWeight: "bold"}}>jdandturk@gmail.com</span></a>
                </div></li>
                <li><div className="divider"></div></li>
                <br/>
                <li><a id="first" style={{}} href="/addnote"><i id="first" className="material-icons">note_add</i>Adicionar nota</a></li>
                <br/>
                

            </ul>

            </div>
        )
    }
}

export default Navbar