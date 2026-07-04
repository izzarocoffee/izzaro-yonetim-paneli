import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      {
        error: e.message,
        stack: e.stack,
      },
      { status: 500 }
    );
  }
}