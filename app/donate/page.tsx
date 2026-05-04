"use client";

import { useState } from "react";

export default function Donate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    const message = `Hi, my name is ${name}.
Email: ${email}
Phone: ${phone}

I would like to contribute KES ${amount}.
Please share payment details.`;

    const url = `https://wa.me/2547XXXXXXXX?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Donate</h2>

      <input placeholder="Full Name" onChange={e => setName(e.target.value)} /><br />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
      <input placeholder="Phone" onChange={e => setPhone(e.target.value)} /><br />
      <input placeholder="Amount" onChange={e => setAmount(e.target.value)} /><br />

      <button onClick={handleDonate}>Donate via WhatsApp</button>
    </div>
  );
}