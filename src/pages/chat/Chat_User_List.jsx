import React, { useState } from "react";
import { api } from "../../Redux/services/userService";
import { useSelector } from "react-redux";
import { User } from "lucide-react";

export default function ChatSidebar({ onChatSelect, users }) {
  const [search, setSearch] = useState("");
  //get single user data from redux store
  const selectUser = api.endpoints.getUser.select();
  const userData = useSelector(selectUser)?.data?.data;
  //get all user list from redux store
  const all_user_list = api.endpoints.getALLUser.select();
  const all_user_list_data = useSelector(all_user_list)?.data?.data;
  //get last message history from redux store
  const last_message_history = api.endpoints.getLastMessageHistory.select();
  const last_message_history_data = useSelector(last_message_history)?.data;

  return (
    <div className="w-80 h-screen bg-white border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>

      {/* Search */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {users?.data?.length > 0 &&
          users?.data?.map(
            (user) =>
              userData?.id !== user.id && (
                <div
                  key={user.id}
                  onClick={() => {
                    onChatSelect(user);
                  }}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold"></div>
                      {/* {user.online && ( */}
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      {/* )} */}
                    </div>

                    {/* Name & Message */}
                    <div>
                      <h4 className="text-sm font-medium">{user?.full_name}</h4>
                      <p className="text-xs text-gray-500 truncate w-40">
                        {`${last_message_history_data?.find((elem) => elem.other_user_id == user.id)?.message || "No messages yet"}`}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <span className="text-xs text-gray-400">{user.time}</span>
                </div>
              ),
          )}

        {users?.data?.length === 0 && (
          <p className="text-center text-gray-400 mt-5">No users found</p>
        )}
      </div>
    </div>
  );
}
