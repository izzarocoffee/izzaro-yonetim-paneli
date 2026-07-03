import Link from "next/link";
type MenuProps = {
  text: string;
  href?: string;
  active?: boolean;
};

function Menu({ text, href = "#", active = false }: MenuProps) {
return (
  <Link href={href}>
    <button
      className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 ${
        active
          ? "bg-yellow-400 text-black font-bold"
          : "text-gray-300 hover:bg-[#222] hover:text-yellow-400"
      }`}
    >
      {text}
    </button>
  </Link>
);
}

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#111111] border-r border-yellow-500/20 h-screen p-6">

      <h1 className="text-3xl font-black text-yellow-400 mb-10">
        ☕ IZZARO
      </h1>

      <div className="space-y-2">

        <Menu text="🏠 Dashboard" href="/dashboard" active />

        <Menu text="🚚 Tedarikçiler" href="/tedarikciler" />

        <Menu text="📄 İrsaliyeler" href="/irsaliyeler" />

        <Menu text="💳 Ödemeler" href="/odemeler" />

        <Menu text="📦 Stok" href="/stok" />

        <Menu text="💰 Kasa" href="/kasa" />

        <Menu text="👨‍🍳 Personeller" href="/personeller" />

        <Menu text="📊 Raporlar" href="/raporlar" />

        <Menu text="⚙️ Ayarlar" href="/ayarlar" />

      </div>

    </aside>
  );
}