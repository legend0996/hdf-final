"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function MeetingPage({ params }: any) {
  const { roomId } = params;

  const localVideo = useRef<HTMLVideoElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const [name] = useState("User");

  // 🎥 camera
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(s => {
        setStream(s);
        if (localVideo.current) localVideo.current.srcObject = s;
      });
  }, []);

  // 🔗 socket
  useEffect(() => {
    if (!stream) return;

    socket.emit("join-room", {
      roomId,
      user: { name }
    });

    socket.on("participants", setParticipants);

    socket.on("receive-message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on("reaction", (r) => {
      alert(`${r.name} reacted ${r.reaction}`);
    });

  }, [stream]);

  // 💬 send chat
  const sendMessage = () => {
    socket.emit("send-message", {
      roomId,
      message: input,
      name
    });

    setInput("");
  };

  // 👍 reaction
  const sendReaction = (reaction: string) => {
    socket.emit("reaction", {
      roomId,
      reaction,
      name
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT: VIDEO GRID */}
      <div style={{ flex: 3, padding: 20 }}>
        <h2>Meeting Room</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: 10
        }}>
          {/* LOCAL */}
          <div style={{ border: "1px solid #ccc", padding: 10 }}>
            <video ref={localVideo} autoPlay muted width="100%" />
            <p>You</p>
          </div>

          {/* PARTICIPANTS */}
          {participants.map(p => (
            <div key={p.socketId} style={{
              border: "1px solid #ccc",
              padding: 10,
              textAlign: "center"
            }}>
              {/* Avatar */}
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#ddd",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20
              }}>
                {p.name?.charAt(0)}
              </div>

              <p>{p.name}</p>

              <p>{p.isMuted ? "🔇" : "🎤"}</p>
              <p>{p.isVideoOn ? "📹" : "📷 Off"}</p>
            </div>
          ))}
        </div>

        {/* REACTIONS */}
        <div style={{ marginTop: 20 }}>
          <button onClick={() => sendReaction("👍")}>👍</button>
          <button onClick={() => sendReaction("❤️")}>❤️</button>
          <button onClick={() => sendReaction("👏")}>👏</button>
        </div>
      </div>

      {/* RIGHT: CHAT */}
      <div style={{
        flex: 1,
        borderLeft: "1px solid #ccc",
        padding: 10,
        display: "flex",
        flexDirection: "column"
      }}>
        <h3>Chat</h3>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div key={i}>
              <strong>{m.name}</strong>: {m.message}
              <br />
              <small>{m.time}</small>
            </div>
          ))}
        </div>

        <div style={{ display: "flex" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}