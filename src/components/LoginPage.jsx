import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/configurator");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#000" }}>
      <h1 style={{ color: "teal" }}>Login</h1>
      <input type="text" placeholder="Username" style={{ margin: "10px", padding: "10px" }} />
      <input type="password" placeholder="Password" style={{ margin: "10px", padding: "10px" }} />
      <button onClick={handleLogin} style={{ padding: "10px 20px", background: "teal", color: "#fff", border: "none", cursor: "pointer" }}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
