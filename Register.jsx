import React, { useState } from 'react';
import "./Register.css";
import userIcon from "../assets/person.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import closeIcon from "../assets/close.png";

const Register = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const register_url = window.location.origin + "/djangoapp/register";
    
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin + "/";
    } else {
      alert(json.error);
    }
  };

  return (
    <div className="register_container" style={{ width: "50%", margin: "0 auto", marginTop: "50px" }}>
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>SignUp</h1>
        <img onClick={onClose} src={closeIcon} alt="Close" style={{ cursor: "pointer", width: "20px" }} />
      </div>
      <form onSubmit={register}>
        <div className="inputs" style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          <div className="input">
            <img src={userIcon} alt="Username" />
            <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div className="input">
            <img src={userIcon} alt="First Name" />
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="input">
            <img src={userIcon} alt="Last Name" />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="input">
            <img src={emailIcon} alt="Email" />
            <input type="email" placeholder="email@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input">
            <img src={passwordIcon} alt="Password" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <div className="submit_panel" style={{ marginTop: "20px" }}>
          <button type="submit" className="btn btn-primary btn-block">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
