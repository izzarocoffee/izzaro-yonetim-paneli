import ProductsActions from "@/app/components/products/ProductsActions";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });
  const suppliers = await prisma.supplier.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold text-cyan-400">
            📦 Ürünler
          </h1>

          <p className="text-gray-400 mt-2">
            Stoktaki tüm ürünleri buradan yönetebilirsin.
          </p>
        </div>

        <ProductsActions suppliers={suppliers} />

      </div>
<div className="overflow-x-auto rounded-2xl bg-[#151515]">

  <table className="w-full">

    <thead className="bg-[#202020]">

      <tr>

        <th className="text-left p-4">Ürün</th>

        <th className="text-left p-4">Barkod</th>

        <th className="text-left p-4">Birim</th>

        <th className="text-right p-4">Stok</th>

        <th className="text-right p-4">Minimum</th>

      </tr>

    </thead>

    <tbody>

      {products.length === 0 ? (

        <tr>

          <td
            colSpan={5}
            className="text-center p-10 text-gray-500"
          >
            Henüz ürün bulunmuyor.
          </td>

        </tr>

      ) : (

        products.map((product) => (

          <tr
            key={product.id}
            className="border-t border-[#2d2d2d]"
          >

            <td className="p-4 font-bold">
              {product.name}
            </td>

            <td className="p-4">
              {product.barcode || "-"}
            </td>

            <td className="p-4">
              {product.unit}
            </td>

            <td className="p-4 text-right">
              {product.stock}
            </td>

            <td
              className={`p-4 text-right font-bold ${
                product.stock <= product.minStock
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {product.minStock}
            </td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>
    </main>
  );
}