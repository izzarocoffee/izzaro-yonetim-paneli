import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(products);
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        barcode: body.barcode || null,
        unit: body.unit,
        minStock: Number(body.minStock),
      },
    });

    return NextResponse.json(product);

  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "Ürün oluşturulamadı." },
      { status: 500 }
    );
  }
}