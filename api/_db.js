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
  const db = getClient();
  await db.batch([
    `CREATE TABLE IF NOT EXISTS site_data (
      id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      data TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS admin_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`,
  ]);
  _initialized = true;
}

async function db() {
  await initDB();
  return getClient();
}

module.exports = { db };
