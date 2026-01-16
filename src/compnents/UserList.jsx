import React from "react";
import { Edit, Trash2, Phone, Mail, User, Tag } from "lucide-react";
import { useGetUserQuery } from "../Redux/Action";

const sampleData = [
  {
    id: 1,
    name: "Alexandra Chen",
    email: "alexandra.chen@example.com",
    phoneNumber: "+1 (555) 123-4567",
    nickname: "Alex",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@example.com",
    phoneNumber: "+1 (555) 234-5678",
    nickname: "Marc",
  },
  {
    id: 3,
    name: "Samantha Williams",
    email: "samantha.williams@example.com",
    phoneNumber: "+1 (555) 345-6789",
    nickname: "Sam",
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@example.com",
    phoneNumber: "+1 (555) 456-7890",
    nickname: "Dave",
  },
  {
    id: 5,
    name: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    phoneNumber: "+1 (555) 567-8901",
    nickname: "Jess",
  },
  {
    id: 6,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phoneNumber: "+1 (555) 678-9012",
    nickname: "Mike",
  },
];

function UserList() {
  const { isLoading, isSuccess, data, isError, error } = useGetUserQuery();
  return (
    <div className="app-container">
      <div className="app-wrapper">
        <div className="header">
          <h1>User Directory</h1>
          <p>Manage and view user information</p>
        </div>

        <div className="table-container">
          <div className="table-scroll">
            <table className="user-table">
              <tbody>
                {isSuccess === true &&
                  data.length > 0 &&
                  data.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <div className="avatar">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="name">{user.name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="email">{user.email}</div>
                        <div className="subtext">Primary contact</div>
                      </td>
                      <td className="mono">{user.phonenumber}</td>
                      <td>
                        <span className="nickname">{user.nickname}</span>
                      </td>
                      <td className="actions">
                        <button className="edit-btn">
                          <Edit size={16} />
                        </button>
                        <button className="delete-btn">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="footer">
          <div>
            Showing <strong>{sampleData.length}</strong> users
          </div>
          <div className="status">
            <span className="dot"></span>
            Active users
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
