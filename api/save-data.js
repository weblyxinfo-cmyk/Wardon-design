const { db } = require("./_db");

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

async function getCurrentPassword(client) {
  try {
    const result = await client.execute({
      sql: "SELECT value FROM admin_settings WHERE key = ?",
      args: ["admin_password"],
    });
    if (result.rows.length > 0) return result.rows[0].value;
  } catch (e) {}
  return process.env.ADMIN_PASSWORD || "wardon2024";
}

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

  try {
    const client = await db();

    // Auth check — DB password first, then env var fallback
    const authHeader = req.headers.authorization;
    const password = await getCurrentPassword(client);

    if (!password) {
      return res.status(500).json({ error: "ADMIN_PASSWORD not configured" });
    }

    if (!authHeader || authHeader !== `Bearer ${password}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = req.body;

    // Validate required keys
    for (const key of REQUIRED_KEYS) {
      if (!(key in data)) {
        return res.status(400).json({ error: `Missing key: ${key}` });
      }
    }

    // Upsert site data (INSERT or REPLACE — id is always 1)
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
