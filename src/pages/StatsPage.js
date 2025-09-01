import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function StatsPage() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("links")) || [];
    setLinks(stored);
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      {links.length === 0 && <Typography>No links shortened yet.</Typography>}

      {links.map((link) => (
        <Card key={link.code} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Short URL:{" "}
              <a href={`/short/${link.code}`}>
                http://localhost:3000/short/{link.code}
              </a>
            </Typography>
            <Typography>Original URL: {link.url}</Typography>
            <Typography>
              Created: {new Date(link.created).toLocaleString()}
            </Typography>
            <Typography>
              Expires: {new Date(link.expiry).toLocaleString()}
            </Typography>
            <Typography>Clicks: {link.clicks.length}</Typography>

            {link.clicks.length > 0 && (
              <Box mt={1}>
                <Typography variant="subtitle1">Click Details:</Typography>
                {link.clicks.map((c, i) => (
                  <Typography key={i} variant="body2">
                    {c.time} — {c.referrer} — {c.location}
                  </Typography>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
