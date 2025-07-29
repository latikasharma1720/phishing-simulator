import React, { useState } from "react";
import axios from "axios";

export default function Campaigns() {
  const [name, setName] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [targetEmails, setTargetEmails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/campaigns", {
        name,
        emailTemplate,
        targetEmails: targetEmails.split(","),
      });
      alert("Campaign created successfully!");
      setName("");
      setEmailTemplate("");
      setTargetEmails("");
    } catch (err) {
      console.error("Error creating campaign:", err);
      alert("Failed to create campaign");
    }
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  };

  const buttonStyle = {
    padding: "12px 20px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };

  return (
    <div style={formStyle}>
      <h2 style={headingStyle}>Create Phishing Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Campaign Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            placeholder="Enter a campaign name"
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Email Template</label>
          <textarea
            value={emailTemplate}
            onChange={(e) => setEmailTemplate(e.target.value)}
            style={{ ...inputStyle, height: "100px" }}
            placeholder="Write the phishing email content here"
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Target Emails (comma separated)</label>
          <input
            type="text"
            value={targetEmails}
            onChange={(e) => setTargetEmails(e.target.value)}
            style={inputStyle}
            placeholder="user1@example.com, user2@example.com"
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Create Campaign
        </button>
      </form>
    </div>
  );
}
