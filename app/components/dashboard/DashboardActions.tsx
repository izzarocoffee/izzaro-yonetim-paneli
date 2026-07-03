"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import NewInvoiceModal from "../NewInvoiceModal";
import NewSupplierModal from "../NewSupplierModal";
import NewPaymentModal from "../NewPaymentModal";

type Props = {
  suppliers: any[];
};

export default function DashboardActions({ suppliers }: Props) {
  const router = useRouter();

  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [loading, setLoading] = useState(false);

async function saveSupplier(data: {
  name: string;
  phone: string;
  address: string;
  taxNo: string;
  oldDebt: number;
}) {
  try {
    setLoading(true);

    const res = await fetch("/api/tedarikciler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Kayıt başarısız");
    }

    setSupplierOpen(false);
    router.refresh();
  } finally {
    setLoading(false);
  }
}
  return (
    <>
      <div className="space-y-3">
        <button
          onClick={() => setInvoiceOpen(true)}
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl"
        >
          ➕ İrsaliye Ekle
        </button>

       <button
  onClick={() => setPaymentOpen(true)}
  className="w-full bg-[#222] py-3 rounded-xl hover:bg-[#333]"
>
  💳 Ödeme Gir
</button>

        <button
          onClick={() => setSupplierOpen(true)}
          className="w-full bg-[#222] py-3 rounded-xl hover:bg-[#333]"
        >
          🚚 Tedarikçi Ekle
        </button>
      </div>

      <NewInvoiceModal
        open={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
        suppliers={suppliers}
      />

     <NewSupplierModal
  open={supplierOpen}
  onClose={() => setSupplierOpen(false)}
  onSave={saveSupplier}
  loading={loading}
/>
<NewPaymentModal
  open={paymentOpen}
  onClose={() => setPaymentOpen(false)}
  suppliers={suppliers}
/>
    </>
  );
}