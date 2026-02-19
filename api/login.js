const { db } = require("./_db");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const client = await db();
    const result = await client.execute({
      sql: "SELECT email FROM admin_users WHERE email = ? AND password = ?",
      args: [email.toLowerCase().trim(), password],
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({ ok: true, email: result.rows[0].email });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
