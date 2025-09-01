import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    const links = JSON.parse(localStorage.getItem("links")) || [];
    const link = links.find(l => l.code === code);

    if (link && Date.now() < link.expiry) {
      link.clicks.push({
        time: new Date().toISOString(),
        referrer: document.referrer || "direct",
        location: "India" // dummy, real API would be used
      });
      localStorage.setItem("links", JSON.stringify(links));
      window.location.href = link.url;
    } else {
      alert("Link expired or invalid");
    }
  }, [code]);

  return <p>Redirecting...</p>;
}
