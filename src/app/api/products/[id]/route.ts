import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await req.json();
  const rows = await sql`
    UPDATE products SET
      name=${b.name}, category=${b.category}, price=${b.price},
      min_order=${b.minOrder}, unit=${b.unit}, description=${b.description},
      image=${b.image}, in_stock=${b.inStock}, discount=${b.discount ?? null},
      pieces_per_carton=${b.piecesPerCarton ?? null}
    WHERE id=${id}
    RETURNING id, name, category, price, min_order as "minOrder", unit,
              description, image, in_stock as "inStock", discount, pieces_per_carton as "piecesPerCarton"
  `;
  return NextResponse.json(rows[0]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sql`DELETE FROM products WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
