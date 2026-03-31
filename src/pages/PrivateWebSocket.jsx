import { useEffect, useRef, useState, useCallback } from "react";
import { useGetMessageHistoryQuery } from "../Redux/services/userService";

function PrivateSocket() {
  const token = localStorage.getItem("token");

  const { data, error, isLoading } = useGetMessageHistoryQuery(undefined, {
    skip: !token, // avoid request without token
  });

  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toUser, setToUser] = useState("");

  /* -----------------------------
     WebSocket Connection
  ------------------------------*/
  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8000/chat/ws?token=${token}`);
    socketRef.current = ws;

    ws.onopen = () => console.log("✅ Connected");

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setMessages((prev) => [...prev, parsed.message]);
      } catch {
        console.warn("Invalid WS message:", event.data);
      }
    };

    ws.onerror = (err) => console.error("WS error:", err);

    ws.onclose = () => console.log("❌ Disconnected");

    return () => ws.close();
  }, [token]);

  /* -----------------------------
     Load Message History
  ------------------------------*/
  useEffect(() => {
    if (!data) return;
    setMessages(data.map((m) => m.message));
  }, [data]);

  /* -----------------------------
     Send Message
  ------------------------------*/
  const sendMessage = useCallback(() => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn("Socket not ready");
      return;
    }

    if (!message.trim() || !toUser) return;

    socketRef.current.send(
      JSON.stringify({
        to: Number(toUser),
        text: message.trim(),
      }),
    );

    setMessage("");
  }, [message, toUser]);

  /* -----------------------------
     UI
  ------------------------------*/
  if (isLoading) return <p>Loading history...</p>;
  if (error) return <p>Error loading history</p>;

  return (
    <div>
      <h2>WebSocket Demo</h2>

      <input
        type="number"
        value={toUser}
        onChange={(e) => setToUser(e.target.value)}
        placeholder="Receiver ID"
      />

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
      />

      <button onClick={sendMessage}>Send</button>

      <ul>
        {messages.map((msg, i) => (
          <li key={`${i}-${msg.slice(0, 10)}`}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default PrivateSocket;
