import { prisma } from "@/lib/prisma";
import NewPaymentForm from "@/app/components/NewPaymentForm";

export default async function YeniOdemePage() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white p-10">
      <h1 className="text-5xl font-bold text-green-400 mb-10">
        💰 Yeni Ödeme
      </h1>

      <NewPaymentForm suppliers={suppliers} />
    </main>
  );
}