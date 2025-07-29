import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    const res = await axios.get("http://localhost:8080/api/campaigns");
    setCampaigns(res.data);
  };

  useEffect(() => {
    fetchCampaigns();
    const socket = io("http://localhost:8080");

    socket.on("newCampaign", (newCampaign) => {
      setCampaigns((prev) => [newCampaign, ...prev]);
    });

    socket.on("campaignUpdated", (updatedCampaign) => {
      setCampaigns((prev) =>
        prev.map((c) => (c._id === updatedCampaign._id ? updatedCampaign : c))
      );
    });

    return () => socket.disconnect();
  }, []);

  const totalClicks = campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0);
  const totalIgnored = campaigns.reduce((sum, c) => sum + (c.ignored || 0), 0);

  const pieData = {
    labels: ["Clicked", "Ignored"],
    datasets: [
      {
        data: [totalClicks, totalIgnored],
        backgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  };

  const barData = {
    labels: campaigns.map((c) =>
      new Date(c.createdAt).toLocaleDateString("en-US")
    ),
    datasets: [
      {
        label: "Campaigns Created",
        data: campaigns.map(() => 1),
        backgroundColor: "#4caf50",
      },
    ],
  };

  const handleAction = async (id, type) => {
    await axios.patch(`http://localhost:8080/api/campaigns/${id}/${type}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "40%" }}>
          <Pie data={pieData} />
        </div>
        <div style={{ width: "60%" }}>
          <Bar data={barData} />
        </div>
      </div>

      <h3>Recent Campaigns</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Template</th>
            <th>Targets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.emailTemplate}</td>
              <td>{c.targetEmails.join(", ")}</td>
              <td>
                <button onClick={() => handleAction(c._id, "click")}>
                  Simulate Click
                </button>
                <button onClick={() => handleAction(c._id, "ignore")}>
                  Simulate Ignore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
