import { useState, useEffect, useRef, useCallback } from "react";
import {
  useGetMessageHistoryQuery,
  api,
} from "../../Redux/services/userService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Chat.css";

function Chat_Details({ current_user }) {
  const { id } = useParams();
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [toUser, setToUser] = useState("");
  const [imgURL, setImageURL] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const selectUser = api.endpoints.getUser.select();
  const userData = useSelector(selectUser)?.data?.data;

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

  const { data, error, isLoading, isSuccess } = useGetMessageHistoryQuery(
    current_user?.id,
    {
      skip: !token && !current_user?.id, // avoid request without token
    },
  );

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

    if (!imgURL && !message.trim()) return;
    socketRef.current.send(
      JSON.stringify({
        to: parseInt(current_user?.id),
        text: message.trim(),
        img_url: imgURL,
        type: imgURL ? "file" : "text",
      }),
    );

    setMessage("");
    setImageURL(null);
  }, [message, toUser, imgURL]);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("<<<response checking>>>", res);
      setImageURL(res.data.fileUrl);
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Upload failed: " + err.response?.data?.message);
    }
  };

  /* -----------------------------
       UI
    ------------------------------*/
  if (isLoading) return <p>Loading history...</p>;
  if (error) return <p>Error loading history</p>;

  if (!current_user?.id) return <h1 className="m-[auto]">No Chat Selected</h1>;

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          <h2>Chat Room</h2>
          <span className="username-badge">{`${current_user?.full_name}`}</span>
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
              const isPDF = msg?.file_url?.toLowerCase().endsWith(".pdf");
              return (
                <>
                  {/*text message*/}
                  {msg.message_type === "text" ? (
                    <div
                      key={idx}
                      className={`message ${msg?.sender_id == userData?.id ? "own-message" : "other-message"}`}
                    >
                      <div className="message-header">
                        <span className="message-username">{`${msg?.sender_id == userData?.id ? userData?.full_name : current_user?.full_name}`}</span>
                        <span className="message-time">
                          {formatTime(`${msg?.created_at}`)}
                        </span>
                      </div>
                      <div className="message-content">{`${msg?.message}`}</div>
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className={`message ${msg?.sender_id == userData?.id ? "own-message" : "other-message"}`}
                    >
                      <div className="message-header">
                        <span className="message-username">{`${msg?.sender_id == userData?.id ? userData?.full_name : current_user?.full_name}`}</span>
                        <span className="message-time">
                          {formatTime(`${msg?.created_at}`)}
                        </span>
                      </div>
                      <div>
                        {isPDF ? (
                          <iframe
                            src={msg?.file_url}
                            className="w-full h-[500px] rounded-base"
                            title="PDF Preview"
                          />
                        ) : (
                          <img
                            className="h-auto max-w-full rounded-base"
                            src={msg?.file_url}
                            alt="Uploaded"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </>
              );
            })}

          <div ref={messagesEndRef} />
        </div>

        <div className="message-input-form items-center">
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
              />
            </svg>
          </label>
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

export default Chat_Details;
