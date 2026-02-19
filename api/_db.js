const { createClient } = require("@libsql/client");

let _client = null;
let _initialized = false;

function getClient() {
  if (!_client) {
    _client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return _client;
}

async function initDB() {
  if (_initialized) return;
  const c = getClient();
  await c.batch([
    `CREATE TABLE IF NOT EXISTS site_data (
      id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      data TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS admin_users (
      email TEXT PRIMARY KEY,
      password TEXT NOT NULL
    )`,
  ]);
  // Seed default users if table is empty
  const count = await c.execute("SELECT COUNT(*) as n FROM admin_users");
  if (count.rows[0].n === 0) {
    await c.batch([
      { sql: "INSERT INTO admin_users (email, password) VALUES (?, ?)", args: ["wardondesign@gmail.com", "wardon2024"] },
      { sql: "INSERT INTO admin_users (email, password) VALUES (?, ?)", args: ["info@weblyx.cz", "weblyx2024"] },
    ]);
  }
  _initialized = true;
}

async function db() {
  await initDB();
  return getClient();
}

async function verifyAuth(client, authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const sep = token.indexOf(":");
  if (sep < 0) return null;
  const email = token.slice(0, sep);
  const password = token.slice(sep + 1);
  const result = await client.execute({
    sql: "SELECT email FROM admin_users WHERE email = ? AND password = ?",
    args: [email, password],
  });
  if (result.rows.length === 0) return null;
  return email;
}

module.exports = { db, verifyAuth };
