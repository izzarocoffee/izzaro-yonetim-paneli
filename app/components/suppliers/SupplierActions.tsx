"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  supplierId: number;
};

export default function SupplierActions({ supplierId }: Props) {
  const router = useRouter();

  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [invoiceNote, setInvoiceNote] = useState("");

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentNote, setPaymentNote] = useState("");

  async function saveInvoice() {
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supplierId,
        invoiceNo,
        amount: Number(invoiceAmount),
        note: invoiceNote,
      }),
    });

    if (!res.ok) {
      alert("İrsaliye kaydedilemedi.");
      return;
    }

    setInvoiceOpen(false);
    setInvoiceNo("");
    setInvoiceAmount("");
    setInvoiceNote("");

    router.refresh();
  }

  async function savePayment() {
    const res = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supplierId,
        amount: Number(paymentAmount),
        note: paymentNote,
      }),
    });

    if (!res.ok) {
      alert("Ödeme kaydedilemedi.");
      return;
    }

    setPaymentOpen(false);
    setPaymentAmount("");
    setPaymentNote("");

    router.refresh();
  }

  return (
    <>
      <div className="flex gap-4 mt-8 mb-8">
        <button
          onClick={() => setInvoiceOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl"
        >
          ➕ Yeni İrsaliye
        </button>

        <button
          onClick={() => setPaymentOpen(true)}
          className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl"
        >
          💰 Ödeme Gir
        </button>
      </div>

      {invoiceOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-2xl p-8 w-[500px]">
            <h2 className="text-3xl text-yellow-400 font-bold mb-6">
              Yeni İrsaliye
            </h2>

            <input
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              placeholder="İrsaliye No"
              className="w-full p-3 rounded-lg bg-[#262626] mb-4"
            />

            <input
              value={invoiceAmount}
              onChange={(e) => setInvoiceAmount(e.target.value)}
              placeholder="Tutar"
              type="number"
              className="w-full p-3 rounded-lg bg-[#262626] mb-4"
            />

            <textarea
              value={invoiceNote}
              onChange={(e) => setInvoiceNote(e.target.value)}
              placeholder="Not"
              className="w-full p-3 rounded-lg bg-[#262626]"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setInvoiceOpen(false)}
                className="px-5 py-2 bg-red-600 rounded-lg"
              >
                İptal
              </button>

              <button
                onClick={saveInvoice}
                className="px-5 py-2 bg-yellow-400 text-black rounded-lg font-bold"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
      {paymentOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-2xl p-8 w-[500px]">
            <h2 className="text-3xl text-green-500 font-bold mb-6">
              Ödeme Gir
            </h2>

            <input
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Ödeme Tutarı"
              type="number"
              className="w-full p-3 rounded-lg bg-[#262626] mb-4"
            />

            <textarea
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              placeholder="Açıklama"
              className="w-full p-3 rounded-lg bg-[#262626]"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setPaymentOpen(false)}
                className="px-5 py-2 bg-red-600 rounded-lg"
              >
                İptal
              </button>

              <button
                onClick={savePayment}
                className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}