import { useEffect, useState } from "react";

function Websocket() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data).data.text]);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(JSON.stringify({ text: message }));
      setMessage("");
    }
  };

  return (
    <div>
      <h2>WebSocket Demo</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
      />

      <button onClick={sendMessage}>Send</button>

      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Websocket;
