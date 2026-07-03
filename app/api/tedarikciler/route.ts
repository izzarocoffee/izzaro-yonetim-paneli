import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(suppliers);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Tedarikçiler alınamadı." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supplier = await prisma.supplier.create({
      data: {
        name: body.name,
        phone: body.phone,
        address: body.address,
        taxNo: body.taxNo,
        oldDebt: Number(body.oldDebt || 0),
      },
    });

    return NextResponse.json(supplier);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Tedarikçi oluşturulamadı." },
      { status: 500 }
    );
  }
}