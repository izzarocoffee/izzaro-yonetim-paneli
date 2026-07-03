"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeletePaymentButton({ id }: Props) {
  const router = useRouter();

  async function deletePayment() {
    if (!confirm("Bu ödemeyi silmek istediğine emin misin?")) return;

    const res = await fetch("/api/payments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      alert("Ödeme silinemedi.");
      return;
    }

    router.refresh();
  }
  
  return (
    <button
      onClick={deletePayment}
      className="text-red-500 hover:text-red-300 text-xl"
      title="Ödemeyi Sil"
    >
      🗑️
    </button>
  );
}