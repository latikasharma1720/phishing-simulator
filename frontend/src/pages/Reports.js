import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Reports = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/campaigns");
      setCampaigns(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reports", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f5f7fb", minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Reports
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Detailed summary of all phishing simulation campaigns.
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : campaigns.length === 0 ? (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
          No reports available yet.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {campaigns.map((campaign) => {
            const totalTargets = campaign.targetEmails?.length || 0;
            const clicked = campaign.clicked || 0;
            const ignored = campaign.ignored || 0;
            const successRate =
              totalTargets > 0
                ? ((clicked / totalTargets) * 100).toFixed(1)
                : 0;

            return (
              <Grid item xs={12} md={6} key={campaign._id}>
                <Card sx={{ borderRadius: "16px", boxShadow: 4 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {campaign.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Created: {new Date(campaign.createdAt).toLocaleString()}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Total Targets:</strong> {totalTargets}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Clicked:</strong> {clicked}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Ignored:</strong> {ignored}
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                      <strong>Success Rate:</strong> {successRate}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Reports;
