"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Supplier = {
  id: number;
  name: string;
};

type Props = {
  suppliers: Supplier[];
};

export default function NewInvoiceForm({ suppliers }: Props) {
  const router = useRouter();

  const [supplierId, setSupplierId] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  async function saveInvoice() {
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supplierId: Number(supplierId),
        invoiceNo,
        amount: Number(amount),
        note,
      }),
    });

    if (!res.ok) {
      alert("İrsaliye kaydedilemedi.");
      return;
    }

    alert("İrsaliye başarıyla kaydedildi.");

    router.push("/irsaliyeler");
    router.refresh();
  }

  return (
    <div className="bg-[#151515] rounded-2xl p-8 max-w-xl">

      <label className="block mb-2">Tedarikçi</label>

      <select
        value={supplierId}
        onChange={(e) => setSupplierId(e.target.value)}
        className="w-full p-3 rounded-lg bg-[#262626] mb-4"
      >
        <option value="">Tedarikçi Seç</option>

        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </select>

      <input
        value={invoiceNo}
        onChange={(e) => setInvoiceNo(e.target.value)}
        placeholder="İrsaliye No"
        className="w-full p-3 rounded-lg bg-[#262626] mb-4"
      />

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Tutar"
        type="number"
        className="w-full p-3 rounded-lg bg-[#262626] mb-4"
      />

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Not"
        className="w-full p-3 rounded-lg bg-[#262626] mb-6"
      />

      <button
        onClick={saveInvoice}
        className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
      >
        Kaydet
      </button>

    </div>
  );
}