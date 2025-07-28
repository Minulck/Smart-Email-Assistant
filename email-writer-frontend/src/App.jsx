import {
  Container,
  CircularProgress,
  TextField,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("formal");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateReply = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (err) {
      console.error("Error generating reply:", err);
      setError("Failed to generate reply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: 380,
        height: 600,
        minHeight: 600,
        maxWidth: 380,
        boxShadow: 3,
        borderRadius: 3,
        bgcolor: '#f8fafc',
        px: 2,
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
        <img
          src="https://image.cdn2.seaart.me/2025-07-28/d23psote878c7386h1gg-2/ffb93f60b267d781498ab9cbbe129930_high.webp"
          alt="Logo"
          style={{ width: 56, height: 56, borderRadius: 12, marginBottom: 8, objectFit: 'cover', boxShadow: '0 2px 8px #0001' }}
        />
        <Typography variant="h6" component="h1" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 0.5 }}>
          Smart Email Assistant
        </Typography>
      </Box>

      <Box sx={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Original Email"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 1, bgcolor: 'white', borderRadius: 1 }}
          size="small"
        />

        <FormControl fullWidth sx={{ mb: 1 }} size="small" variant="outlined">
          <InputLabel>Tone</InputLabel>
          <Select
            label="Tone"
            value={tone || "formal"}
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="formal">Formal</MenuItem>
            <MenuItem value="informal">Informal</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="concise">Concise</MenuItem>
            <MenuItem value="detailed">Detailed</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ mt: 1, mb: 1, display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateReply}
            disabled={loading || !emailContent}
            fullWidth
            sx={{ fontWeight: 600, fontSize: 15, py: 1 }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Generate Reply"
            )}
          </Button>
        </Box>
        {error && (
          <Typography color="error" sx={{ fontSize: 13, mb: 1, textAlign: 'center' }}>{error}</Typography>
        )}
        {generatedReply && (
          <Box sx={{ mt: 1, bgcolor: '#f1f5f9', borderRadius: 2, p: 1.5, boxShadow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Generated Reply
            </Typography>
            <TextField
              label=""
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              value={generatedReply || ""}
              InputProps={{ readOnly: true }}
              sx={{ mb: 1, bgcolor: 'white', borderRadius: 1 }}
              size="small"
            />
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => navigator.clipboard.writeText(generatedReply || "")}
              sx={{ fontWeight: 500, fontSize: 14 }}
            >
              Copy
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 'auto', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          &copy; {new Date().getFullYear()} Smart Email Assistant
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
