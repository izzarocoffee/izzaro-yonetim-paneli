import DeleteInvoiceButton from "./DeleteInvoiceButton";

type Invoice = {
  id: number;
  createdAt: Date;
  invoiceNo: string | null;
  amount: number;
  note: string | null;
};

type Props = {
  invoices: Invoice[];
};

export default function InvoiceTable({ invoices }: Props) {
  return (
    <div className="mt-14">

      <h2 className="text-3xl font-bold text-yellow-400 mb-6">
        📄 İrsaliyeler
      </h2>

      <div className="overflow-x-auto rounded-2xl bg-[#151515]">

        <table className="w-full">

          <thead className="bg-[#202020]">

            <tr>
              <th className="text-left p-4">Tarih</th>
              <th className="text-left p-4">İrsaliye No</th>
              <th className="text-left p-4">Tutar</th>
              <th className="text-left p-4">Not</th>
              <th className="text-center p-4">İşlem</th>
            </tr>

          </thead>

          <tbody>

            {invoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-8 text-gray-500">
                  Henüz irsaliye bulunmuyor.
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-t border-[#2d2d2d]"
                >
                  <td className="p-4">
                    {new Date(invoice.createdAt).toLocaleDateString("tr-TR")}
                  </td>

                  <td className="p-4">
                    {invoice.invoiceNo || "-"}
                  </td>

                  <td className="p-4 text-green-400 font-bold">
                    ₺{invoice.amount.toLocaleString("tr-TR")}
                  </td>

                  <td className="p-4">
                    {invoice.note || "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        ✏️
                      </button>

                      <DeleteInvoiceButton id={invoice.id} />
                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}