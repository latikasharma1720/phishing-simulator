import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Campaigns() {
  const [name, setName] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [targetEmails, setTargetEmails] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8080/api/campaigns");
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8080/api/campaigns", {
        name,
        emailTemplate,
        targetEmails: targetEmails.split(",").map((email) => email.trim()),
      });
      alert("Campaign created!");
      setName("");
      setEmailTemplate("");
      setTargetEmails("");
      fetchCampaigns();
    } catch (err) {
      console.error("Error creating campaign:", err);
      alert("Failed to create campaign");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create a Campaign</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Campaign Name:</label><br />
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email Template:</label><br />
          <textarea
            value={emailTemplate}
            onChange={(e) => setEmailTemplate(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Target Emails (comma separated):</label><br />
          <textarea
            value={targetEmails}
            onChange={(e) => setTargetEmails(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Campaign</button>
      </form>

      <h2>Existing Campaigns</h2>
      <ul>
        {campaigns.map((c) => (
          <li key={c._id}>
            {c.name} – {c.targetEmails.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
