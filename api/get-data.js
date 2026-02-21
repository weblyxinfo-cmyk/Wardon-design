const { db } = require("./_db");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = await db();
    const result = await client.execute("SELECT data FROM site_data WHERE id = 1");

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    const data = JSON.parse(result.rows[0].data);

    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=30");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(data);
  } catch (err) {
    console.error("get-data error:", err);
    return res.status(500).json({ error: "Failed to read data" });
  }
};
