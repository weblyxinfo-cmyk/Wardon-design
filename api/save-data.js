const { put, list, del } = require("@vercel/blob");

const REQUIRED_KEYS = [
  "thumbnails",
  "creators",
  "reviews",
  "stats",
  "process",
  "faq",
  "about",
  "socials",
  "siteSettings",
];

module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Auth check
  const authHeader = req.headers.authorization;
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return res.status(500).json({ error: "ADMIN_PASSWORD not configured" });
  }

  if (!authHeader || authHeader !== `Bearer ${password}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = req.body;

    // Validate required keys
    for (const key of REQUIRED_KEYS) {
      if (!(key in data)) {
        return res.status(400).json({ error: `Missing key: ${key}` });
      }
    }

    // Delete old blob if exists
    const { blobs } = await list({ prefix: "data.json" });
    for (const blob of blobs) {
      if (blob.pathname === "data.json") {
        await del(blob.url);
      }
    }

    // Write new data
    await put("data.json", JSON.stringify(data), {
      contentType: "application/json",
      access: "public",
      addRandomSuffix: false,
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("save-data error:", err);
    return res.status(500).json({ error: "Failed to save data" });
  }
};
