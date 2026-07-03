import { prisma } from "@/lib/prisma";
import NewInvoiceForm from "@/app/components/NewInvoiceForm";

export default async function YeniIrsaliyePage() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white p-10">
      <h1 className="text-5xl font-bold text-yellow-400 mb-10">
        📄 Yeni İrsaliye
      </h1>

      <NewInvoiceForm suppliers={suppliers} />
    </main>
  );
}