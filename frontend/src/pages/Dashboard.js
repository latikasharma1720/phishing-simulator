import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Pie } from "react-chartjs-2";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const socket = io("http://localhost:8080"); // Socket.io connection

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    emailsSent: 0,
    successRate: 0,
    clicks: 0,
    ignores: 0,
  });

  // Fetch campaigns from backend
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/campaigns");
      setCampaigns(res.data);

      // Update stats based on campaigns
      const total = res.data.length;
      let clicks = 0;
      let ignores = 0;
      res.data.forEach((c) => {
        clicks += c.clicks || 0;
        ignores += c.ignores || 0;
      });

      const emailsSent = total * 40; // For demo purposes
      const successRate = emailsSent ? Math.round((clicks / emailsSent) * 100) : 0;

      setStats({
        totalCampaigns: total,
        emailsSent,
        successRate,
        clicks,
        ignores,
      });
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    }
  };

  useEffect(() => {
    fetchCampaigns();

    // Live updates via socket.io
    socket.on("campaignUpdated", () => {
      fetchCampaigns();
    });

    return () => socket.off("campaignUpdated");
  }, []);

  const pieData = {
    labels: ["Clicked Links", "Ignored"],
    datasets: [
      {
        data: [stats.clicks, stats.ignores],
        backgroundColor: ["#f87171", "#4ade80"],
      },
    ],
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Overview of your phishing simulation campaigns.
      </Typography>

      {/* Top Stats */}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{stats.totalCampaigns}</Typography>
              <Typography color="textSecondary">Total Campaigns</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{stats.emailsSent}</Typography>
              <Typography color="textSecondary">Emails Sent</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">{stats.successRate}%</Typography>
              <Typography color="textSecondary">Success Rate</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie Chart */}
      <Box mt={4} maxWidth="400px">
        <Pie data={pieData} />
      </Box>

      {/* Campaign Table */}
      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Recent Campaigns
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email Template</TableCell>
              <TableCell>Targets</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.emailTemplate}</TableCell>
                <TableCell>{c.targetEmails.join(", ")}</TableCell>
                <TableCell>{new Date(c.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
