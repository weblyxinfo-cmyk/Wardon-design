const { put } = require("@vercel/blob");
const { db, verifyAuth } = require("./_db");

// Disable body parsing so we get raw stream for file upload
module.exports.config = {
  api: { bodyParser: false },
};

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Filename");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = await db();
    const email = await verifyAuth(client, req.headers.authorization);
    if (!email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const filename = "wardon/" + Date.now() + "-" + (req.headers["x-filename"] || "image.png").replace(/[^a-zA-Z0-9._-]/g, "_");
    const contentType = req.headers["content-type"] || "image/png";

    const blob = await put(filename, req, {
      access: "public",
      contentType: contentType,
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error("upload error:", err);
    return res.status(500).json({ error: "Upload failed: " + err.message });
  }
};
