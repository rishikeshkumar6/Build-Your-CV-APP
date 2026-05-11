import React, { useState } from "react";
import ChatSidebar from "./Chat_User_List";
import ChatDetails from "./Chat_Details";
import {
  useGetALLUserQuery,
  useGetLastMessageHistoryQuery,
} from "../../Redux/services/userService";
const Chat = () => {
  const [current_user, setSelectedUser] = useState({
    id: null,
    full_name: "",
    email: "",
    uuid: "",
  });
  const {
    isSuccess,
    isError,
    data: users,
    error,
    isLoading,
  } = useGetALLUserQuery();
  const {
    data: lastMessages,
    isSuccess: isLastMessagesSuccess,
    isError: isLastMessagesError,
    error: lastMessagesError,
    isLoading: isLastMessagesLoading,
  } = useGetLastMessageHistoryQuery();
  const handleChatSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex">
      <ChatSidebar onChatSelect={handleChatSelect} users={users} />
      <ChatDetails current_user={current_user} />
    </div>
  );
};

export default Chat;
