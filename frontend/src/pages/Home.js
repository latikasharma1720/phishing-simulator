import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Home = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1E3C72, #2A5298)",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        px: 3,
        pt: 10,
      }}
    >
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Phishing Attack Simulator
      </Typography>
      <Typography variant="h6" sx={{ maxWidth: "800px", mb: 4 }}>
        Test, train and improve your organization's defense against phishing
        attacks. Launch simulation campaigns, analyze results in real-time, and
        educate your team on cybersecurity best practices.
      </Typography>

      {/* Go to Dashboard Button */}
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#00C6FF",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "bold",
          px: 4,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          "&:hover": {
            backgroundColor: "#0094cc",
          },
        }}
        href="/dashboard"
      >
        Go to Dashboard <ArrowForwardIcon />
      </Button>

      {/* Features Section */}
      <Grid
        container
        spacing={4}
        sx={{ mt: 10, maxWidth: "1000px", justifyContent: "center" }}
      >
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "16px",
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Real-Time Dashboard
            </Typography>
            <Typography>
              Monitor campaign performance live with charts and metrics.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "16px",
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Simulate Attacks
            </Typography>
            <Typography>
              Launch phishing campaigns safely to test your team’s readiness.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "16px",
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Improve Awareness
            </Typography>
            <Typography>
              Educate employees and reduce vulnerability with practical training.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
