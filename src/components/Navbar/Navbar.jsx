import React, { useContext, useState } from 'react';
import './Navbar.css';
import AuthContext from "../Auth/auth-context";
import { IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Settings } from '@material-ui/icons';
import ChangePasswordAlert from '../ChangePasswordAlert/ChangePasswordAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const Navbar = ({ username, score }) => {
    const authCtx = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => authCtx.logout();
    const handleOnChangePasswordSelected = () => setAlertOpen(true);
    const closeAlert = () => setAlertOpen(false);

    return (
        <div className="Navbar">
            <div className="Navbar-left">
                <p>MENIU</p>
                <div style={{ display: "flex", alignItems: "center", marginLeft: 130, fontSize: 30 }}>
                    <FontAwesomeIcon icon={faStar} className="star-icon" color={"yellow"} />
                    <span className="number">{score}</span>
                </div>
            </div>
            <div className="Navbar-center">
                <p className="Navbar-title">{username}</p>
            </div>
            <div className="Navbar-right">
                <IconButton className="Navbar-item" onClick={handleClick}>
                    <Settings />
                    <ArrowDropDownIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    <MenuItem onClick={handleOnChangePasswordSelected}>Change Password</MenuItem>
                    <ChangePasswordAlert open={alertOpen} onClose={closeAlert} />
                </Menu>
            </div>
        </div>
    );
};