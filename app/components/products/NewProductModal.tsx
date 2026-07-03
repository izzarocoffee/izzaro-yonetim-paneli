
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NewProductModal({
  open,
  onClose,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [unit, setUnit] = useState("Adet");
  const [minStock, setMinStock] = useState("");

  if (!open) return null;

  async function saveProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        barcode,
        unit,
        minStock: Number(minStock),
      }),
    });

    if (!res.ok) {
      alert("Ürün eklenemedi.");
      return;
    }

    router.refresh();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-[#181818] rounded-2xl p-8 w-[500px]">

        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          Yeni Ürün
        </h2>

        <input
          placeholder="Ürün Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#262626] mb-4"
        />

        <input
          placeholder="Barkod"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#262626] mb-4"
        />

        <input
          placeholder="Birim (Adet, KG...)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#262626] mb-4"
        />

        <input
          type="number"
          placeholder="Minimum Stok"
          value={minStock}
          onChange={(e) => setMinStock(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#262626]"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-red-600 px-5 py-2 rounded-lg"
          >
            İptal
          </button>

          <button
            onClick={saveProduct}
            className="bg-cyan-500 px-5 py-2 rounded-lg font-bold"
          >
            Kaydet
          </button>
        </div>

      </div>
    </div>
  );
}