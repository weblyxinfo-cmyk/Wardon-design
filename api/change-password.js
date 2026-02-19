const { db } = require("./_db");

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
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = await db();

    // Verify current password
    const authHeader = req.headers.authorization;
    const currentPassword = await getCurrentPassword(client);

    if (!currentPassword) {
      return res.status(500).json({ error: "No password configured" });
    }

    if (!authHeader || authHeader !== `Bearer ${currentPassword}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: "Password must be at least 4 characters" });
    }

    // Upsert new password
    await client.execute({
      sql: `INSERT INTO admin_settings (key, value) VALUES (?, ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      args: ["admin_password", newPassword],
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("change-password error:", err);
    return res.status(500).json({ error: "Failed to change password" });
  }
};
