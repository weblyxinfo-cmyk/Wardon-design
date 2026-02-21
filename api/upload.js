const { put } = require("@vercel/blob");
const { db, verifyAuth } = require("./_db");

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Filename");
}

async function handler(req, res) {
  cors(res);

  if (req.method === "OPTIONS") {
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

    const rawName = (req.headers["x-filename"] || "image.png").replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = "wardon/" + Date.now() + "-" + rawName;
    const contentType = req.headers["content-type"] || "image/png";

    const blob = await put(filename, req, {
      access: "public",
      contentType: contentType,
    });

    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error("upload error:", err);
    return res.status(500).json({ error: "Upload failed: " + err.message });
  }
}

handler.config = {
  api: { bodyParser: false },
};

module.exports = handler;
