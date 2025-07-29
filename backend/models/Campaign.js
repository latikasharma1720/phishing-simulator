const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailTemplate: { type: String, required: true },
  targetEmails: [String],
  clicks: { type: Number, default: 0 },
  ignored: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Campaign", campaignSchema);
