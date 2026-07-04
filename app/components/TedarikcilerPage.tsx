"use client";
import Link from "next/link";
import { useState } from "react";
import NewSupplierModal from "./NewSupplierModal";

type Supplier = {
  id: number;
  name: string;
  phone: string | null;
  address: string | null;
  taxNo: string | null;
  oldDebt: number;
  createdAt: Date;

  invoices:{
    amount: number;
  }[];

  payments:{
    amount: number;
  }[];
};

type Props = {
  suppliers: Supplier[];
  supplierCount: number;
  total0ldDebt: number;
};

export default function TedarikcilerPage({ 
  suppliers,
supplierCount,
total0ldDebt,
 }: Props) {
console.log("TEDARIKCILER PAGE ÇALIŞTI");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

 async function saveSupplier(data: {
  name: string;
  phone: string;
  address: string;
  taxNo: string;
  oldDebt: number;
}) {
  alert("2");

  try {
    setLoading(true);

    const res = await fetch("/api/tedarikciler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    alert("Status: " + res.status);

    const text = await res.text();
    alert(text);

    if (!res.ok) return;

    setOpen(false);
    location.reload();

  } catch (err) {
    alert("HATA: " + String(err));
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen bg-[#050505] text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold text-yellow-400">
            🚚 Tedarikçiler
          </h1>

          <p className="text-gray-400 mt-2">
            Tüm tedarikçileri buradan yönetebilirsin.
          </p>
        </div>

        <button
  onClick={() => {
    console.log("BUTON ÇALIŞTI");
    alert("BUTON ÇALIŞTI");
    setOpen(true);
  }}
  className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
>
  + Yeni Tedarikçi
</button>
           </div>
           <div className="grid grid-cols-2 gap-6 mb-8">

          <div className="bg-[#151515] rounded-2xl p-6">
          <p className="text-gray-400">Toplam Tedarikçi</p>
          <h2 className="text-4xl text-yellow-400 font-bold">
          {supplierCount}
        </h2>
       </div>

        <div className="bg-[#151515] rounded-2xl p-6">
        <p className="text-gray-400">Toplam Güncel Borç</p>
        <h2 className="text-4xl text-red-400 font-bold">
       ₺{total0ldDebt.toLocaleString("tr-TR")}
      </h2>
      </div>

    </div>
      <div className="bg-[#151515] rounded-2xl overflow-hidden border border-yellow-500/20">
        <table className="w-full">
          <thead className="bg-[#1f1f1f]">
            <tr>
              <th className="text-left p-5">Firma</th>
              <th className="text-left">Telefon</th>
              <th className="text-left">Borç</th>
              <th className="text-left">Kayıt Tarihi</th>
              <th className="text-center">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  Henüz tedarikçi bulunmuyor.
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="border-t border-gray-800 hover:bg-[#1b1b1b]"
                >
                  <td className="p-5 font-semibold">
                    {supplier.name}
                  </td>

                  <td>{supplier.phone || "-"}</td>

                 <td className="text-red-400 font-bold">
                 ₺{(
                    supplier.oldDebt +
                    supplier.invoices.reduce((s, i) => s + i.amount, 0) -
                    supplier.payments.reduce((s, p) => s + p.amount, 0)
                   ).toLocaleString("tr-TR")}
                  </td>

                  <td>
                    {new Date(supplier.createdAt).toLocaleDateString("tr-TR")}
                  </td>

                  <td className="text-center">
  <Link href={`/tedarikciler/${supplier.id}`}>
    <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition">
      Detay
    </button>
  </Link>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <NewSupplierModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={saveSupplier}
        loading={loading}
      />
    </main>
  );
}