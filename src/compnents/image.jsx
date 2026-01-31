import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }
    console.log("<<<<<file path checking>>>", file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(" http://127.0.0.1:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Upload failed: " + err.response?.data?.message);
    }
  };
  console.log("<<<file checking>>", file);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Image / PDF</h2>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleChange}
      />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default FileUpload;
