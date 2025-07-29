const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");

// GET all campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new campaign
router.post("/", async (req, res) => {
  try {
    const { name, emailTemplate, targetEmails } = req.body;

    const campaign = new Campaign({
      name,
      emailTemplate,
      targetEmails,
    });

    const saved = await campaign.save();

    // Real-time update
    if (req.io) {
      req.io.emit("newCampaign", saved);
    }

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ message: err.message });
  }
});

// PATCH for clicks
router.patch("/:id/click", async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (req.io) {
      req.io.emit("campaignUpdated", campaign);
    }
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH for ignore
router.patch("/:id/ignore", async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $inc: { ignored: 1 } },
      { new: true }
    );
    if (req.io) {
      req.io.emit("campaignUpdated", campaign);
    }
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
