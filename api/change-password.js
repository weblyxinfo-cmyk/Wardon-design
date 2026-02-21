const { db, verifyAuth } = require("./_db");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

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

    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: "Password must be at least 4 characters" });
    }

    await client.execute({
      sql: "UPDATE admin_users SET password = ? WHERE email = ?",
      args: [newPassword, email],
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("change-password error:", err);
    return res.status(500).json({ error: "Failed to change password" });
  }
};
