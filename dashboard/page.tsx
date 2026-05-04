"use client";

import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://localhost:5000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const role = data.user.role;

        if (role === "PATRON") {
          window.location.href = "/dashboard/patron";
        } else if (role === "MEMBER") {
          window.location.href = "/dashboard/member";
        } else {
          window.location.href = "/dashboard/leader";
        }
      });
  }, []);

  return <p>Loading dashboard...</p>;
}