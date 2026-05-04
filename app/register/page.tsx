"use client";

import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    await fetch("http://localhost:5000/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    alert("Check your email for password");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Become a Member</h2>

      <input placeholder="Full Name" onChange={e => setName(e.target.value)} /><br />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}