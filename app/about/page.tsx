"use client";

import { useState } from "react";

export default function About() {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      
      <h1>Who We Are</h1>

      <p>
        Human Dignity Foundation is committed to promoting justice, equality,
        and empowerment in our community. We believe every individual deserves
        respect, opportunity, and a voice.
      </p>

      <h2>Our Mission</h2>
      <p>
        To empower individuals and communities through advocacy, leadership,
        and social impact programs.
      </p>

      <h2>Our Vision</h2>
      <p>
        A society where dignity, fairness, and equal opportunity are accessible
        to all.
      </p>

      <h2>Our Core Values</h2>
      <ul>
        <li>Integrity</li>
        <li>Transparency</li>
        <li>Inclusivity</li>
        <li>Accountability</li>
      </ul>

      {/* BUTTON */}
      <button
        onClick={() => setShowPDF(true)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        View Our Constitution
      </button>

      {/* PDF VIEW */}
      {showPDF && (
        <div style={{ marginTop: "30px" }}>
          <iframe
            src="/docs/constitution.pdf"
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        </div>
      )}
    </div>
  );
}