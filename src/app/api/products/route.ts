import { sql, initDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await initDB();
  const rows = await sql`
    SELECT id, name, category, price, min_order as "minOrder", unit,
           description, image, in_stock as "inStock", discount, pieces_per_carton as "piecesPerCarton"
    FROM products ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  await initDB();
  const b = await req.json();
  const rows = await sql`
    INSERT INTO products (name, category, price, min_order, unit, description, image, in_stock, discount, pieces_per_carton)
    VALUES (${b.name}, ${b.category}, ${b.price}, ${b.minOrder}, ${b.unit},
            ${b.description}, ${b.image}, ${b.inStock}, ${b.discount ?? null}, ${b.piecesPerCarton ?? null})
    RETURNING id, name, category, price, min_order as "minOrder", unit,
              description, image, in_stock as "inStock", discount, pieces_per_carton as "piecesPerCarton"
  `;
  return NextResponse.json(rows[0]);
}
