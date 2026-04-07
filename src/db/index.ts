import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

/**
 * Singleton database connection for Next.js in development mode.
 * Creates a single pool and reuses it across HMR events to prevent connection leaks.
 */

const globalForDb = global as unknown as {
  connection: mysql.Pool | undefined;
};

const pool = globalForDb.connection ?? mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 10,       // Conservative limit for local dev
  waitForConnections: true,  // Queue requests when pool is full
  queueLimit: 0,            // Unlimited queue size
  enableKeepAlive: true,     // Keep connections alive to reduce handshake overhead
  keepAliveInitialDelay: 10000,
});

if (process.env.NODE_ENV !== "production") globalForDb.connection = pool;

export const db = drizzle(pool, { schema, mode: "default" });
