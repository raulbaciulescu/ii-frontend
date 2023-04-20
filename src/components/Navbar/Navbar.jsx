import React, { useContext } from 'react';
import './Navbar.css';

import AuthContext from "../Auth/auth-context";

export const Navbar = () => {
    const authCtx = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="Navbar">
            <div className="Navbar-left">
                <p>MENIU</p>
            </div>
            <div className="Navbar-center">
                <p className="Navbar-title" >nume utilizator</p>
            </div>
            <div className="Navbar-right">
                <p className="Navbar-item" onClick={() => { authCtx.logout() }}>LOGOUT</p>
            </div>
        </div>
    );
};