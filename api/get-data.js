const { list } = require("@vercel/blob");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  try {
    const { blobs } = await list({ prefix: "data.json" });
    const blob = blobs.find((b) => b.pathname === "data.json");

    if (!blob) {
      return res.status(404).json({ error: "No data found" });
    }

    const response = await fetch(blob.url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Cache-Control",
      "s-maxage=10, stale-while-revalidate=30"
    );
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(data);
  } catch (err) {
    console.error("get-data error:", err);
    return res.status(500).json({ error: "Failed to read data" });
  }
};
