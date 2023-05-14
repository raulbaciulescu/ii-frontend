import React, { useState } from "react";
import "./ChangePasswordAlert.css";
import axios from "axios";
import { HOST, PORT } from '../../prodURL';
import { TextField } from "@mui/material";

const ChangePasswordAlert = ({ open, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = () => {

    if (inputValue === "")
      return;

    const url = `http://${HOST}:${PORT}/user/change-password`;
    const token = localStorage.getItem("token");
    axios
      .post(url, {
        email: 'maria@gmail.com',
        newPassword: inputValue
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then((_) => console.log('succeeded to change password'))
      .catch(console.error);

    setInputValue("");
    onClose();
  };

  return (
    open && (
      <div className="alert-backdrop">
        <div className="alert-content">
          
          <TextField
            type="password"
            className="inputNewPassword"
            label="New Password"
            variant="standard"
            required
            value={inputValue}
            onChange={(e) => {
              if (e.target.value === "") {
                setDisabled(true);
                setInputValue(e.target.value);
                return;
              }

              setDisabled(false);
              setInputValue(e.target.value);
            }}
          ></TextField>

          <button onClick={handleSubmit} className={`changePasswordButton1 ${disabled ? 'disabled' : ''}`} disabled={disabled}>Submit</button>
          <button
            onClick={() => {
              setInputValue("");
              onClose();
            }}
            className="changePasswordButton2">Cancel</button>
        </div>
      </div>
    )
  );
};

export default ChangePasswordAlert;
