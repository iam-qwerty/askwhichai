import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
} from 'drizzle-orm/pg-core'

// Legacy scaffold table — can be removed once fully migrated
export const todos = pgTable('todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

// Which AI — tools table (migrated from Supabase)
export const tools = pgTable('tools', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text().notNull(),
  toolUrl: text('tool_url').notNull(),
  pricing: text().notNull(),
  upvotes: integer().default(0),
  downvotes: integer().default(0),
  slug: text().notNull(),
  category: text(),
  featured: boolean().default(false),
  tags: text().array(),
  addedAt: timestamp('added_at').defaultNow(),
})
