const express = require("express");
const Campaign = require("../models/Campaign");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, emailTemplate, targetEmails } = req.body;

    const newCampaign = new Campaign({
      name,
      emailTemplate,
      targetEmails: Array.isArray(targetEmails)
        ? targetEmails
        : targetEmails.split(",").map((e) => e.trim()),
    });

    await newCampaign.save();

    const io = req.app.get("io");
    io.emit("newCampaign", newCampaign);

    res.status(201).json(newCampaign);
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ error: "Failed to create campaign" });
  }
});

module.exports = router;
