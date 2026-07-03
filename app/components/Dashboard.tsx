import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";


export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#0b0b0b] text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        <Header />

        <div className="grid grid-cols-4 gap-6 mt-8">

          <StatCard
            title="Toplam Borç"
            value="₺0"
            icon="💰"
          />

          <StatCard
            title="Bugünkü İrsaliye"
            value="0"
            icon="📄"
          />

          <StatCard
            title="Bu Ay Ödeme"
            value="₺0"
            icon="💳"
          />

          <StatCard
            title="Tedarikçi"
            value="0"
            icon="🚚"
          />

        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="col-span-2 bg-[#151515] border border-yellow-500/20 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-yellow-400 mb-6">
              Son Hareketler
            </h2>

            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-700">

                  <th className="text-left py-3">Tarih</th>
                  <th className="text-left">Firma</th>
                  <th className="text-left">İşlem</th>
                  <th className="text-right">Tutar</th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b border-gray-800">

                  <td className="py-4">02.07.2026</td>
                  <td>Coca Cola</td>
                  <td>İrsaliye</td>
                  <td className="text-right text-yellow-400">
                    ₺3.250
                  </td>

                </tr>

                <tr>

                  <td className="py-4">02.07.2026</td>
                  <td>Efes</td>
                  <td>Ödeme</td>
                  <td className="text-right text-green-400">
                    ₺1.500
                  </td>

                </tr>

              </tbody>

            </table>

          </div>
          <div className="bg-[#151515] border border-yellow-500/20 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-yellow-400 mb-6">
              Hızlı İşlemler
            </h2>

            <div className="space-y-4">

              <button className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition">
                ➕ İrsaliye Ekle
              </button>

              <button className="w-full bg-[#222] border border-yellow-500 text-yellow-400 py-3 rounded-xl hover:bg-[#2d2d2d] transition">
                💳 Ödeme Gir
              </button>

              <button className="w-full bg-[#222] border border-yellow-500 text-yellow-400 py-3 rounded-xl hover:bg-[#2d2d2d] transition">
                🚚 Tedarikçi Ekle
              </button>

              <button className="w-full bg-[#222] border border-yellow-500 text-yellow-400 py-3 rounded-xl hover:bg-[#2d2d2d] transition">
                📦 Stok Ekle
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}