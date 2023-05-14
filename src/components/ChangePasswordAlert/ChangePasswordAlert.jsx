import React, { useState } from "react";
import "./ChangePasswordAlert.css";
import axios from "axios";
import { HOST, PORT } from '../../prodURL';

const ChangePasswordAlert = ({ open, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
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
    onClose();
  };

  return (
    open && (
      <div className="alert-backdrop">
        <div className="alert-content">
          <input type="text" value={inputValue} placeholder={'new password'} onChange={(e) => setInputValue(e.target.value)}/>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onclose}>Cancel</button>
        </div>
      </div>
    )
  );
};

export default ChangePasswordAlert;
