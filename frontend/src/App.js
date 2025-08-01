import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Reports from "./pages/Reports";
import AIAnalysis from "./pages/AIAnalysis";

function App() {
  return (
    <>
      {/* Top Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1E3C72" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>Phishing Simulator</Box>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/campaigns">
              Campaigns
            </Button>
            <Button color="inherit" component={Link} to="/reports">
              Reports
            </Button>
            <Button color="inherit" component={Link} to="/ai-analysis">
              AI Analysis
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/ai-analysis" element={<AIAnalysis />} />
      </Routes>
    </>
  );
}

export default App;
