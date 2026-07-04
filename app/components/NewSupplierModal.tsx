"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    phone: string;
    address: string;
    taxNo: string;
    oldDebt: number;
  }) => Promise<void>;
  loading: boolean;
};

export default function NewSupplierModal({
  open,
  onClose,
  onSave,
  loading,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [taxNo, setTaxNo] = useState("");
  const [oldDebt, setOldDebt] = useState("");

  if (!open) return null;
  async function handleSave() {
    alert("handelSave çalıştı");
  await onSave({
    name,
    phone,
    address,
    taxNo,
    oldDebt: Number(oldDebt) || 0,
  });

  setName("");
  setPhone("");
  setAddress("");
  setTaxNo("");
  setOldDebt("");
  onClose();
}

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="w-[600px] bg-[#151515] border border-yellow-500 rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
          Yeni Tedarikçi
        </h2>

        <div className="space-y-4">

          <input
            className="w-full bg-[#222] rounded-xl p-4"
            placeholder="Firma Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full bg-[#222] rounded-xl p-4"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="w-full bg-[#222] rounded-xl p-4"
            placeholder="Adres"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            className="w-full bg-[#222] rounded-xl p-4"
            placeholder="Vergi No"
            value={taxNo}
            onChange={(e) => setTaxNo(e.target.value)}
          />

          <input
            className="w-full bg-[#222] rounded-xl p-4"
            placeholder="Eski Borç"
            value={oldDebt}
            onChange={(e) => setOldDebt(e.target.value)}
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-[#333]"
          >
            İptal
          </button>

          <button
  onClick={handleSave}
  disabled={loading}
  className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-bold disabled:opacity-50"
>
  {loading ? "Kaydediliyor..." : "Kaydet"}
</button>

        </div>

      </div>

    </div>
  );
}