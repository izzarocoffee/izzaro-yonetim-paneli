 import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function IrsaliyelerPage() {
const invoices = await prisma.invoice.findMany({
  include: {
    supplier: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});

const suppliers = await prisma.supplier.findMany({
  orderBy: {
    name: "asc",
  },
});

  return (
    <main className="min-h-screen bg-[#050505] text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-yellow-400">
          📄 İrsaliyeler
        </h1>

       <Link href="/irsaliyeler/yeni">
  <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold">
    + Yeni İrsaliye
  </button>
</Link>

      </div>

      <div className="bg-[#151515] rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#202020]">

            <tr>

              <th className="text-left p-4">Firma</th>

              <th className="text-left p-4">İrsaliye No</th>

              <th className="text-left p-4">Tutar</th>

              <th className="text-left p-4">Tarih</th>

            </tr>

          </thead>

          <tbody>

            {invoices.map((invoice) => (

              <tr
                key={invoice.id}
                className="border-t border-[#2d2d2d]"
              >

                <td className="p-4">
                  {invoice.supplier.name}
                </td>

                <td>
                  {invoice.invoiceNo || "-"}
                </td>

                <td className="text-green-400 font-bold">
                  ₺{invoice.amount.toLocaleString("tr-TR")}
                </td>

                <td>
                  {new Date(invoice.createdAt).toLocaleDateString("tr-TR")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}