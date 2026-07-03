"use client";

import { useState } from "react";
import NewProductModal from "./NewProductModal";

type Supplier = {
  id: number;
  name: string;
};

type Props = {
  suppliers: Supplier[];
};

export default function ProductActions({ suppliers }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-cyan-500 px-6 py-3 rounded-xl font-bold"
      >
        + Yeni Ürün
      </button>

      <NewProductModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}