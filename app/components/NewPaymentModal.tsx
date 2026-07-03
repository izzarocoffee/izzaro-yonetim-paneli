"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Supplier = {
  id: number;
  name: string;
};

type Props = {
  suppliers: Supplier[];
  open: boolean;
  onClose: () => void;
};

export default function NewPaymentModal({
  suppliers,
  open,
  onClose,
}: Props) {
  const router = useRouter();

  const [supplierId, setSupplierId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  if (!open) return null;

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

    onClose();
    router.refresh();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

      <div className="bg-[#181818] p-8 rounded-2xl w-[500px]">

        <h2 className="text-3xl text-green-400 font-bold mb-6">
          Yeni Ödeme
        </h2>

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
          placeholder="Tutar"
          className="w-full p-3 rounded-lg bg-[#262626] mb-4"
        />

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Not"
          className="w-full p-3 rounded-lg bg-[#262626]"
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-600 rounded-lg"
          >
            İptal
          </button>

          <button
            onClick={savePayment}
            className="px-5 py-2 bg-green-500 rounded-lg font-bold"
          >
            Kaydet
          </button>

        </div>

      </div>

    </div>
  );
}