import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payment = await prisma.payment.create({
      data: {
        supplierId: body.supplierId,
        amount: Number(body.amount),
        note: body.note,
      },
    });

    return NextResponse.json(payment);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Ödeme oluşturulamadı." },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.payment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Ödeme silinemedi." },
      { status: 500 }
    );
  }
}