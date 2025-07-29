const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" },
});
app.set("io", io);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/ping", (req, res) => res.send("pong"));

// Routes
const campaignRoutes = require("./routes/campaigns");
app.use("/api/campaigns", campaignRoutes);

const PORT = 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
