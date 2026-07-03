import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function OdemelerPage() {
  const payments = await prisma.payment.findMany({
    include: {
      supplier: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-green-400">
          💰 Ödemeler
        </h1>

        <Link href="/odemeler/yeni">
  <button className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-bold">
    + Yeni Ödeme
  </button>
</Link>

      </div>

      <div className="bg-[#151515] rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#202020]">

            <tr>

              <th className="text-left p-4">Firma</th>

              <th className="text-left p-4">Tutar</th>

              <th className="text-left p-4">Not</th>

              <th className="text-left p-4">Tarih</th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr
                key={payment.id}
                className="border-t border-[#2d2d2d]"
              >

                <td className="p-4">
                  {payment.supplier.name}
                </td>

                <td className="p-4 text-green-400 font-bold">
                  ₺{payment.amount.toLocaleString("tr-TR")}
                </td>

                <td className="p-4">
                  {payment.note || "-"}
                </td>

                <td className="p-4">
                  {new Date(payment.createdAt).toLocaleDateString("tr-TR")}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}