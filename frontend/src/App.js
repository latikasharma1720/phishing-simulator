import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Reports from "./pages/Reports";
import Home from "./pages/Home";
import { AppBar, Toolbar, Button } from "@mui/material";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
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
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;
