import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const invoice = await prisma.invoice.create({
      data: {
        supplierId: body.supplierId,
        amount: Number(body.amount),
        invoiceNo: body.invoiceNo,
        note: body.note,
      },
    });
    

    return NextResponse.json(invoice);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Fatura oluşturulamadı." },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.invoice.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "İrsaliye silinemedi." },
      { status: 500 }
    );
  }
}
