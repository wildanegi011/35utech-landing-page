import { mysqlTable, serial, varchar, text } from "drizzle-orm/mysql-core";

export const services = mysqlTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  image: text("image").notNull(),
  features: text("features").notNull(), // JSON string or comma separated
});
