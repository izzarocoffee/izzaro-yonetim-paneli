"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteInvoiceButton({ id }: Props) {
  const router = useRouter();

  async function deleteInvoice() {
    if (!confirm("Bu irsaliyeyi silmek istediğine emin misin?")) return;

    const res = await fetch("/api/invoices", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      alert("İrsaliye silinemedi.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={deleteInvoice}
      className="text-red-500 hover:text-red-300 text-xl"
      title="İrsaliyeyi Sil"
    >
      🗑️
    </button>
  );
}