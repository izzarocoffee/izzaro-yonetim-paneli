import SupplierActions from "@/app/components/suppliers/SupplierActions";
import DeleteInvoiceButton from "@/app/components/invoices/DeleteInvoiceButton";
import DeletePaymentButton from "@/app/components/payments/DeletePaymentButton";
import InvoiceTable from "@/app/components/invoices/InvoiceTable";

import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SupplierDetailPage({ params }: Props) {
  const { id } = await params;

  const supplier = await prisma.supplier.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      invoices: {
        orderBy: {
          createdAt: "desc",
        },
      },
      payments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!supplier) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <h1 className="text-4xl text-red-500">
          Tedarikçi bulunamadı.
        </h1>
      </main>
    );
  }

  const totalInvoices = supplier.invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  const totalPayments = supplier.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const currentDebt =
    supplier.oldDebt + totalInvoices - totalPayments;
    let balance = supplier.oldDebt;

const movements = [
  ...supplier.invoices.map((invoice) => ({
    type: "İrsaliye",
    date: invoice.createdAt,
    description: invoice.invoiceNo || "-",
    debt: invoice.amount,
    credit: 0,
  })),

  ...supplier.payments.map((payment) => ({
    type: "Ödeme",
    date: payment.createdAt,
    description: payment.note || "-",
    debt: 0,
    credit: payment.amount,
  })),
]
  .sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  )
  .map((item) => {
    balance += item.debt;
    balance -= item.credit;

    return {
      ...item,
      balance,
    };
  });
  return (
    <main className="min-h-screen bg-[#050505] text-white p-10">

      <h1 className="text-5xl font-bold text-yellow-400">
        {supplier.name}
      </h1>

      <SupplierActions supplierId={supplier.id} />

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 mt-10">

        <div className="bg-[#151515] rounded-2xl p-6">
          <p className="text-gray-400">Telefon</p>
          <h2 className="text-2xl">
            {supplier.phone || "-"}
          </h2>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6">
          <p className="text-gray-400">Adres</p>
          <h2 className="text-xl">
            {supplier.address || "-"}
          </h2>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6">
          <p className="text-gray-400">Eski Borç</p>
          <h2 className="text-3xl text-red-400 font-bold">
            ₺{supplier.oldDebt.toLocaleString("tr-TR")}
          </h2>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6">
          <p className="text-gray-400">Toplam İrsaliye</p>
          <h2 className="text-3xl text-green-400 font-bold">
            ₺{totalInvoices.toLocaleString("tr-TR")}
          </h2>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6">
          <p className="text-gray-400">Toplam Ödeme</p>
          <h2 className="text-3xl text-blue-400 font-bold">
            ₺{totalPayments.toLocaleString("tr-TR")}
          </h2>
        </div>

        <div className="bg-[#151515] rounded-2xl p-6">
          <p className="text-gray-400">Güncel Borç</p>
         <h2
  className={`text-3xl font-bold ${
    currentDebt >= 0 ? "text-red-400" : "text-green-400"
  }`}
>
  {currentDebt >= 0
    ? `₺${currentDebt.toLocaleString("tr-TR")}`
    : `Alacak ₺${Math.abs(currentDebt).toLocaleString("tr-TR")}`}
</h2>
        </div>

      </div>
     <InvoiceTable invoices={supplier.invoices} />
      <div className="mt-14">

        <h2 className="text-3xl font-bold text-green-400 mb-6">
          💰 Ödemeler
        </h2>

        <div className="overflow-x-auto rounded-2xl bg-[#151515]">

          <table className="w-full">

            <thead className="bg-[#202020]">

              <tr>

                <th className="text-left p-4">Tarih</th>

                <th className="text-left p-4">Tutar</th>

                <th className="text-left p-4">Not</th>

                <th className="text-right p-4">İşlem</th>

              </tr>

            </thead>

            <tbody>

              {supplier.payments.length === 0 ? (

                <tr>

                  <td
                    colSpan={4}
                    className="text-center p-8 text-gray-500"
                  >
                    Henüz ödeme bulunmuyor.
                  </td>

                </tr>

              ) : (

                supplier.payments.map((payment) => (

                  <tr
                    key={payment.id}
                    className="border-t border-[#2d2d2d]"
                  >

                    <td className="p-4">
                      {new Date(payment.createdAt).toLocaleDateString("tr-TR")}
                    </td>

                    <td className="p-4 text-blue-400 font-bold">
                      ₺{payment.amount.toLocaleString("tr-TR")}
                    </td>

                    <td className="p-4">
                      {payment.note || "-"}
                    </td>
                   <td className="p-4 text-center">
                   <DeletePaymentButton id={payment.id} />
                    </td>
                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
<div className="mt-14">

  <h2 className="text-3xl font-bold text-cyan-400 mb-6">
    📋 Cari Hareketler
  </h2>

  <div className="overflow-x-auto rounded-2xl bg-[#151515]">

    <table className="w-full">

      <thead className="bg-[#202020]">

        <tr>
          <th className="text-left p-4">Tarih</th>
          <th className="text-left p-4">İşlem</th>
          <th className="text-left p-4">Açıklama</th>
          <th className="text-right p-4">Borç</th>
          <th className="text-right p-4">Ödeme</th>
          <th className="text-right p-4">Bakiye</th>
        </tr>

      </thead>

     <tbody>

  {movements.map((item, index) => (

    <tr
      key={index}
      className="border-t border-[#2d2d2d] hover:bg-[#1b1b1b]"
    >

      <td className="p-4">
        {new Date(item.date).toLocaleDateString("tr-TR")}
      </td>

      <td className="p-4 font-semibold">
        {item.type}
      </td>

      <td className="p-4">
        {item.description}
      </td>

      <td className="p-4 text-right text-red-400 font-bold">
        {item.debt > 0
          ? `₺${item.debt.toLocaleString("tr-TR")}`
          : "-"}
      </td>

      <td className="p-4 text-right text-green-400 font-bold">
        {item.credit > 0
          ? `₺${item.credit.toLocaleString("tr-TR")}`
          : "-"}
      </td>

      <td
        className={`p-4 text-right font-bold ${
          item.balance >= 0
            ? "text-red-400"
            : "text-green-400"
        }`}
      >
        {item.balance >= 0
          ? `₺${item.balance.toLocaleString("tr-TR")}`
          : `₺${Math.abs(item.balance).toLocaleString("tr-TR")}`}
      </td>

    </tr>

  ))}

</tbody>

    </table>

  </div>

</div>
    </main>
  );
}