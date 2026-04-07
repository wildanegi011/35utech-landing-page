import { mysqlTable, serial, varchar, text, int, boolean, timestamp } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const projectCategories = mysqlTable("project_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  order: int("order").notNull().default(0),
});

export const projectStatuses = mysqlTable("project_statuses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
});

export const serviceCategories = mysqlTable("service_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  order: int("order").notNull().default(0),
});

export const achievementCategories = mysqlTable("achievement_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  order: int("order").notNull().default(0),
});

export const services = mysqlTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  image: text("image").notNull(),
  categoryId: int("category_id").notNull(),
  isPublished: boolean("is_published").notNull().default(false),
});

export const serviceFeatures = mysqlTable("service_features", {
  id: serial("id").primaryKey(),
  serviceId: int("service_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  impact: text("impact").notNull(),
  categoryId: int("category_id").notNull(),
  image: text("image").notNull(),
  aspectRatio: varchar("aspect_ratio", { length: 50 }).notNull().default("aspect-video"),
  year: varchar("year", { length: 4 }).notNull(),
  client: varchar("client", { length: 255 }).notNull(),
  statusId: int("status_id").notNull(),
  link: text("link"),
  isPublished: boolean("is_published").notNull().default(false),
});

export const projectGalleries = mysqlTable("project_galleries", {
  id: serial("id").primaryKey(),
  projectId: int("project_id").notNull(),
  imageUrl: text("image_url").notNull(),
  order: int("order").notNull().default(0),
});

export const projectTechStack = mysqlTable("project_tech_stack", {
  id: serial("id").primaryKey(),
  projectId: int("project_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 255 }),
});

export const availableTechStacks = mysqlTable("available_tech_stacks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  icon: text("icon").notNull(),
});

export const projectFeatures = mysqlTable("project_features", {
  id: serial("id").primaryKey(),
  projectId: int("project_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const achievements = mysqlTable("achievements", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  year: varchar("year", { length: 4 }).notNull(),
  description: text("description").notNull(),
  categoryId: int("category_id").notNull(),
  scope: varchar("scope", { length: 50 }).notNull(), // "Lokal" | "Nasional"
  image: text("image").notNull(),
  icon: varchar("icon", { length: 50 }),
  isPublished: boolean("is_published").notNull().default(false),
});

export const achievementGalleries = mysqlTable("achievement_galleries", {
  id: serial("id").primaryKey(),
  achievementId: int("achievement_id").notNull(),
  imageUrl: text("image_url").notNull(),
  order: int("order").notNull().default(0),
});

export const siteConfigs = mysqlTable("site_configs", {
  id: serial("id").primaryKey(),
  configKey: varchar("config_key", { length: 100 }).unique().notNull(),
  configLabel: varchar("config_label", { length: 255 }).notNull(),
  configValue: text("config_value"),
  configType: varchar("config_type", { length: 50 }).notNull().default("text"), // text, textarea, radio, number
  configGroup: varchar("config_group", { length: 100 }).notNull().default("General"),
  configOptions: text("config_options"), // JSON string for radio/select options
  isActive: boolean("is_aktif").notNull().default(true),
  isDisabled: boolean("is_disabled").notNull().default(false),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const newsletters = mysqlTable("newsletters", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

// -- Relations --

export const projectCategoriesRelations = relations(projectCategories, ({ many }) => ({
  projects: many(projects),
}));

export const serviceCategoriesRelations = relations(serviceCategories, ({ many }) => ({
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  category: one(serviceCategories, {
    fields: [services.categoryId],
    references: [serviceCategories.id],
  }),
  features: many(serviceFeatures),
}));

export const serviceFeaturesRelations = relations(serviceFeatures, ({ one }) => ({
  service: one(services, {
    fields: [serviceFeatures.serviceId],
    references: [services.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  category: one(projectCategories, {
    fields: [projects.categoryId],
    references: [projectCategories.id],
  }),
  status: one(projectStatuses, {
    fields: [projects.statusId],
    references: [projectStatuses.id],
  }),
  gallery: many(projectGalleries),
  techStack: many(projectTechStack),
  features: many(projectFeatures),
}));

export const projectStatusesRelations = relations(projectStatuses, ({ many }) => ({
  projects: many(projects),
}));

export const projectGalleriesRelations = relations(projectGalleries, ({ one }) => ({
  project: one(projects, {
    fields: [projectGalleries.projectId],
    references: [projects.id],
  }),
}));

export const projectTechStackRelations = relations(projectTechStack, ({ one }) => ({
  project: one(projects, {
    fields: [projectTechStack.projectId],
    references: [projects.id],
  }),
}));

export const projectFeaturesRelations = relations(projectFeatures, ({ one }) => ({
  project: one(projects, {
    fields: [projectFeatures.projectId],
    references: [projects.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ one, many }) => ({
  category: one(achievementCategories, {
    fields: [achievements.categoryId],
    references: [achievementCategories.id],
  }),
  gallery: many(achievementGalleries),
}));

export const achievementCategoriesRelations = relations(achievementCategories, ({ many }) => ({
  achievements: many(achievements),
}));

export const achievementGalleriesRelations = relations(achievementGalleries, ({ one }) => ({
  achievement: one(achievements, {
    fields: [achievementGalleries.achievementId],
    references: [achievements.id],
  }),
}));
