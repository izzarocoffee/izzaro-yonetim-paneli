import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import { prisma } from "@/lib/prisma";
import DashboardActions from "./components/dashboard/DashboardActions";
export default async function Home() {
  const suppliers = await prisma.supplier.findMany({
  orderBy: {
    name: "asc",
  },
});

const invoices = await prisma.invoice.findMany({
  include: {
    supplier: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});

const payments = await prisma.payment.findMany({
  include: {
    supplier: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});
const totalInvoice = invoices.reduce(
  (sum, invoice) => sum + invoice.amount,
  0
);

const totalPayment = payments.reduce(
  (sum, payment) => sum + payment.amount,
  0
);

const totalDebt = totalInvoice - totalPayment;
const movements = [
  ...invoices.map((invoice) => ({
    type: "İrsaliye",
    supplier: invoice.supplier.name,
    amount: invoice.amount,
    createdAt: invoice.createdAt,
  })),

  ...payments.map((payment) => ({
    type: "Ödeme",
    supplier: payment.supplier.name,
    amount: payment.amount,
    createdAt: payment.createdAt,
  })),
].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
);
const now = new Date();

const thisMonthInvoices = invoices
  .filter(
    (invoice) =>
      invoice.createdAt.getMonth() === now.getMonth() &&
      invoice.createdAt.getFullYear() === now.getFullYear()
  )
  .reduce((sum, invoice) => sum + invoice.amount, 0);
  const thisMonthPayments = payments
  .filter(
    (payment) =>
      payment.createdAt.getMonth() === now.getMonth() &&
      payment.createdAt.getFullYear() === now.getFullYear()
  )
  .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <main className="flex min-h-screen bg-[#090909] text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <Header />

        <div className="grid grid-cols-4 gap-6">

          <StatCard
            title="Toplam Borç"
            value={`₺${totalDebt.toLocaleString("tr-TR")}`}
            icon="💰"
          />

          <StatCard
            title="Bu Ay İrsaliye"
            value={`₺${thisMonthInvoices.toLocaleString("tr-TR")}`}
            icon="📄"
          />

          <StatCard
            title="Bu Ay Ödeme"
            value={`₺${thisMonthPayments.toLocaleString("tr-TR")}`}
            icon="💳"
          />

          <StatCard
            title="Tedarikçi"
            value={suppliers.length.toString()}
            icon="🚚"
          />

        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="col-span-2 bg-[#171717] border border-yellow-500/30 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-yellow-400 mb-5">
              Son Hareketler
            </h2>

            <table className="w-full">

              <thead>

                <tr className="text-left border-b border-gray-700">

                  <th className="py-3">Tarih</th>

                  <th>Firma</th>

                  <th>İşlem</th>

                  <th className="text-right">Tutar</th>

                </tr>

              </thead>

             <tbody>
  {movements.slice(0, 10).map((item, index) => (
    <tr
      key={index}
      className="border-b border-gray-800"
    >
      <td className="py-3">
        {new Date(item.createdAt).toLocaleDateString("tr-TR")}
      </td>

      <td>{item.supplier}</td>

      <td>
        {item.type === "İrsaliye" ? (
          <span className="text-yellow-400">
            📄 İrsaliye
          </span>
        ) : (
          <span className="text-green-400">
            💳 Ödeme
          </span>
        )}
      </td>

      <td className="text-right font-bold">
        ₺{item.amount.toLocaleString("tr-TR")}
      </td>
    </tr>
  ))}
</tbody>

            </table>

          </div>

          <div className="bg-[#171717] border border-yellow-500/30 rounded-2xl p-6">

  <h2 className="text-2xl font-bold text-yellow-400 mb-5">
    Hızlı İşlemler
  </h2>

  <DashboardActions suppliers={suppliers} />

</div>

          </div>
      </section>

    </main>
  );
}