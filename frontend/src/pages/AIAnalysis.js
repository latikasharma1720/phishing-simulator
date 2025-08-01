import React, { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent } from "@mui/material";

const AIAnalysis = () => {
  const [emailContent, setEmailContent] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    const lower = emailContent.toLowerCase();
    let score = 0;
    const issues = [];

    if (lower.includes("password") || lower.includes("urgent")) {
      score += 40;
      issues.push("Sensitive keywords detected");
    }
    if (lower.includes("click") || lower.includes("verify")) {
      score += 30;
      issues.push("Suspicious action words detected");
    }
    if (lower.includes("account") || lower.includes("security")) {
      score += 20;
      issues.push("Security-related content detected");
    }

    let riskLevel = "Low";
    if (score >= 60) riskLevel = "High";
    else if (score >= 30) riskLevel = "Medium";

    setAnalysis({ score, riskLevel, issues });
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fb", minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        AI & LLM Driven Analysis
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Paste an email template below to analyze its phishing risk.
      </Typography>

      <Card sx={{ maxWidth: 700, mt: 3, borderRadius: "16px", boxShadow: 4 }}>
        <CardContent>
          <TextField
            label="Email Content"
            multiline
            rows={6}
            fullWidth
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAnalyze}
          >
            Analyze
          </Button>

          {analysis && (
            <Box sx={{ mt: 3, p: 2, backgroundColor: "#eef3ff", borderRadius: "10px" }}>
              <Typography variant="h6">Analysis Result</Typography>
              <Typography>
                <strong>Risk Level:</strong> {analysis.riskLevel}
              </Typography>
              <Typography>
                <strong>Score:</strong> {analysis.score}
              </Typography>
              <Typography>
                <strong>Issues:</strong> {analysis.issues.join(", ")}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AIAnalysis;
