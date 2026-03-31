import { useState, useEffect, useRef, useCallback } from "react";
import {
  useGetMessageHistoryQuery,
  api,
} from "../../Redux/services/userService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Chat.css";

function Chat() {
  const { id } = useParams();
  console.log("Chat with user ID:", id);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toUser, setToUser] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const selectUser = api.endpoints.getUser.select();
  const userData = useSelector(selectUser)?.data?.data;
  console.log("User Data from Redux:", userData);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const token = localStorage.getItem("token");

  const { data, error, isLoading, isSuccess } = useGetMessageHistoryQuery(id, {
    skip: !token, // avoid request without token
  });

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
        console.log("Received WS message:", parsed);
        setMessages((prev) => [...prev, parsed]);
      } catch (err) {
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
    setMessages(data);
  }, [data]);

  /* -----------------------------
       Send Message
    ------------------------------*/
  const sendMessage = useCallback(() => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn("Socket not ready");
      return;
    }

    if (!message.trim()) return;

    socketRef.current.send(
      JSON.stringify({
        to: parseInt(id),
        text: message.trim(),
      }),
    );

    setMessage("");
  }, [message, toUser]);
  console.log("Messages:", messages);

  /* -----------------------------
       UI
    ------------------------------*/
  if (isLoading) return <p>Loading history...</p>;
  if (error) return <p>Error loading history</p>;

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          <h2>Chat Room</h2>
          <span className="username-badge">{`Rishikesh Kumar Singh`}</span>
        </div>

        <div className="messages-container">
          {/* {false? (
            <div className="no-messages">
              <p>No messages yet. Be the first to say hello!</p>
            </div>
          ) : ( */}
          {isSuccess && messages?.length === 0 && (
            <div className="no-messages">
              <p>No messages yet. Be the first to say hello!</p>
            </div>
          )}
          {isSuccess &&
            messages?.length > 0 &&
            messages.map((msg, idx) => {
              return (
                <>
                  <div
                    key={idx}
                    className={`message ${msg?.sender_id == userData?.id ? "own-message" : "other-message"}`}
                  >
                    <div className="message-header">
                      <span className="message-username">{`Rishikesh Kumar Singh`}</span>
                      <span className="message-time">
                        {formatTime(`${msg?.created_at}`)}
                      </span>
                    </div>
                    <div className="message-content">{`${msg?.message}`}</div>
                  </div>
                  {/* <div className={`message other-message`}>
                    <div className="message-header">
                      <span className="message-username">{`Rishikesh Kumar Singh`}</span>
                      <span className="message-time">
                        {formatTime(`${msg?.created_at}`)}
                      </span>
                    </div>
                    <div className="message-content">{`hey i am reciver`}</div>
                  </div> */}
                </>
              );
            })}

          <div ref={messagesEndRef} />
        </div>

        <div className="message-input-form">
          <input
            type="text"
            placeholder="Type your message..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
