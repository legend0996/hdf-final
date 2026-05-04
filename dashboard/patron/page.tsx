"use client";

import { useEffect, useState } from "react";
import { getGreeting } from "../../../components/greeting";

export default function PatronDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{getGreeting(data.user.name)}</h2>

      <h3>📢 Notifications</h3>
      {data.notifications.map((n: any) => (
        <div key={n.id}>
          <strong>{n.title}</strong>
          <p>{n.message}</p>
        </div>
      ))}

      <h3>👥 Users</h3>
      {data.users?.map((u: any) => (
        <div key={u.id}>
          <p>{u.name} - {u.role}</p>
        </div>
      ))}
    </div>
  );
}