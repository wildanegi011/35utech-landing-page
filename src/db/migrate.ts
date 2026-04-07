import { db } from "./index";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🚀 Starting manual migration...");

  try {
    // 1. Create sub-tables
    await db.execute(sql`CREATE TABLE IF NOT EXISTS project_categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE
    )`);
    console.log("✅ Created project_categories");

    await db.execute(sql`CREATE TABLE IF NOT EXISTS service_categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE
    )`);
    console.log("✅ Created service_categories");

    await db.execute(sql`CREATE TABLE IF NOT EXISTS project_galleries (
      id SERIAL PRIMARY KEY,
      project_id INT NOT NULL,
      image_url TEXT NOT NULL
    )`);
    console.log("✅ Created project_galleries");

    await db.execute(sql`CREATE TABLE IF NOT EXISTS project_tech_stack (
      id SERIAL PRIMARY KEY,
      project_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      icon VARCHAR(50)
    )`);
    console.log("✅ Created project_tech_stack");

    await db.execute(sql`CREATE TABLE IF NOT EXISTS project_features (
      id SERIAL PRIMARY KEY,
      project_id INT NOT NULL,
      name VARCHAR(255) NOT NULL
    )`);
    console.log("✅ Created project_features");

    await db.execute(sql`CREATE TABLE IF NOT EXISTS service_features (
      id SERIAL PRIMARY KEY,
      service_id INT NOT NULL,
      name VARCHAR(255) NOT NULL
    )`);
    console.log("✅ Created service_features");

    await db.execute(sql`CREATE TABLE IF NOT EXISTS project_statuses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) NOT NULL UNIQUE
    )`);
    console.log("✅ Created project_statuses");

    // 2. Add category_id and status_id columns if not exist
    try {
      await db.execute(sql`ALTER TABLE projects ADD COLUMN category_id INT`);
      console.log("✅ Added category_id to projects");
    } catch (e) {}

    try {
      await db.execute(sql`ALTER TABLE projects ADD COLUMN status_id INT`);
      console.log("✅ Added status_id to projects");
    } catch (e) {}

    try {
      await db.execute(sql`ALTER TABLE services ADD COLUMN category_id INT`);
      console.log("✅ Added category_id to services");
    } catch (e) {}

    // 3. Seed default statuses if empty
    const [rows]: any = await db.execute(sql`SELECT COUNT(*) as count FROM project_statuses`);
    if (rows[0].count === 0) {
      const statuses = [
        { name: "Aktif", slug: "aktif" },
        { name: "Selesai", slug: "selesai" },
        { name: "Eksperimental", slug: "eksperimental" }
      ];
      for (const s of statuses) {
        await db.execute(sql`INSERT INTO project_statuses (name, slug) VALUES (${s.name}, ${s.slug})`);
      }
      console.log("✅ Seeded default project statuses");
    }

    // 3. (Optional) Cleanup old JSON columns if you want, but for safety keep them for now.
    
    console.log("✨ Migration successful!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
