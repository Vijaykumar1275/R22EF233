import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

// frontend "middleware" logger
function logRequest(action, payload) {
  console.log(`[LOG] ${new Date().toISOString()} - ${action}`, payload);
}

export default function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [expiry, setExpiry] = useState("");
  const [code, setCode] = useState("");
  const [links, setLinks] = useState(
    () => JSON.parse(localStorage.getItem("links")) || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.startsWith("http")) {
      alert("Invalid URL");
      return;
    }

    const finalCode = code || Math.random().toString(36).substring(2, 7);
    const expiryMinutes = expiry ? parseInt(expiry) : 30;
    const expiryTime = Date.now() + expiryMinutes * 60000;

    const newLink = {
      url,
      code: finalCode,
      created: Date.now(),
      expiry: expiryTime,
      clicks: []
    };

    // logging middleware usage
    logRequest("CREATE_SHORT_LINK", newLink);

    const updated = [...links, newLink];
    setLinks(updated);
    localStorage.setItem("links", JSON.stringify(updated));

    setUrl("");
    setExpiry("");
    setCode("");
  };

  return (
    <Box p={3}>
      <Typography variant="h4">URL Shortener</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Original URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Expiry (minutes)"
          fullWidth
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Custom Code (optional)"
          fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Shorten
        </Button>
      </form>

      {links.map((link) => (
        <Box key={link.code} mt={2} p={1} border="1px solid #ccc" borderRadius="8px">
          <Typography>
            Short URL:{" "}
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              http://localhost:3000/short/{link.code}
            </a>
          </Typography>
          <Typography>
            Expires: {new Date(link.expiry).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
