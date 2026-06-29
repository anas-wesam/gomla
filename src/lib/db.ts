import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price NUMERIC NOT NULL,
      min_order INTEGER NOT NULL,
      unit TEXT NOT NULL,
      description TEXT,
      image TEXT,
      in_stock BOOLEAN DEFAULT true,
      discount INTEGER,
      pieces_per_carton INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}
