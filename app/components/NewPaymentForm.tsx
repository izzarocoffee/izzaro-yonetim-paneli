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

export default function NewPaymentForm({ suppliers }: Props) {
  const router = useRouter();

  const [supplierId, setSupplierId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  async function savePayment() {
    const res = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supplierId: Number(supplierId),
        amount: Number(amount),
        note,
      }),
    });

    if (!res.ok) {
      alert("Ödeme kaydedilemedi.");
      return;
    }

    alert("Ödeme başarıyla kaydedildi.");

    router.push("/odemeler");
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
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        placeholder="Ödeme Tutarı"
        className="w-full p-3 rounded-lg bg-[#262626] mb-4"
      />

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Açıklama"
        className="w-full p-3 rounded-lg bg-[#262626] mb-6"
      />

      <button
        onClick={savePayment}
        className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-bold"
      >
        Kaydet
      </button>

    </div>
  );
}