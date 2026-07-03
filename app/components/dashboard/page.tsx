import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const suppliers = await prisma.supplier.findMany({
    include: {
      invoices: true,
      payments: true,
    },
  });

  const supplierCount = suppliers.length;

  const totalDebt = suppliers.reduce((sum, supplier) => {
    const invoices = supplier.invoices.reduce(
      (s, i) => s + i.amount,
      0
    );

    const payments = supplier.payments.reduce(
      (s, p) => s + p.amount,
      0
    );

    return sum + supplier.oldDebt + invoices - payments;
  }, 0);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-10">
      <h1 className="text-5xl font-bold text-yellow-400 mb-10">
        📊 Dashboard
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-[#151515] rounded-2xl p-6">
          <p className="text-gray-400">Toplam Tedarikçi</p>
          <h2 className="text-4xl font-bold text-yellow-400">
            {supplierCount}
          </h2>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6">
          <p className="text-gray-400">Toplam Borç</p>
          <h2 className="text-4xl font-bold text-red-400">
            ₺{totalDebt.toLocaleString("tr-TR")}
          </h2>
        </div>

      </div>
    </main>
  );
}