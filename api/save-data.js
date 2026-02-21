const { db, verifyAuth } = require("./_db");

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
  "seo",
];

module.exports = async function handler(req, res) {
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

  try {
    const client = await db();
    const email = await verifyAuth(client, req.headers.authorization);

    if (!email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = req.body;

    for (const key of REQUIRED_KEYS) {
      if (!(key in data)) {
        return res.status(400).json({ error: `Missing key: ${key}` });
      }
    }

    await client.execute({
      sql: `INSERT INTO site_data (id, data, updated_at) VALUES (1, ?, datetime('now'))
            ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
      args: [JSON.stringify(data)],
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("save-data error:", err);
    return res.status(500).json({ error: "Failed to save data" });
  }
};
