import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from "@mui/material";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    const res = await axios.get("http://127.0.0.1:8080/api/campaigns");
    setCampaigns(res.data);
  };

  useEffect(() => {
    fetchCampaigns();
    const socket = io("http://127.0.0.1:8080");
    socket.on("newCampaign", (newCampaign) => {
      setCampaigns((prev) => [newCampaign, ...prev]);
    });
    return () => socket.disconnect();
  }, []);

  const totalCampaigns = campaigns.length;
  const emailsSent = totalCampaigns * 20; // Example
  const successRate = totalCampaigns > 0 ? 60 : 0;

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {/* Stats Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">{totalCampaigns}</Typography>
            <Typography color="text.secondary">Total Campaigns</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">{emailsSent}</Typography>
            <Typography color="text.secondary">Emails Sent</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">{successRate}%</Typography>
            <Typography color="text.secondary">Success Rate</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Campaigns Table */}
      <Grid item xs={12}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Recent Campaigns
          </Typography>
          {campaigns.length === 0 ? (
            <Typography>No campaigns found.</Typography>
          ) : (
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
                    <TableCell>
                      {new Date(c.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
