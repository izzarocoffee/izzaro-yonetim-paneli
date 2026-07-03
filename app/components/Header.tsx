export default function Header() {
  const today = new Date();

  const date = today.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between mb-10">

      <div>

        <h1 className="text-5xl font-black text-yellow-400">
          ☕ İZZARO
        </h1>

        <p className="text-gray-400 mt-2">
          Yönetim Paneli
        </p>

      </div>

      <div className="text-right">

        <p className="text-gray-500">
          Bugün
        </p>

        <h2 className="text-2xl font-bold text-yellow-400">
          {date}
        </h2>

      </div>

    </header>
  );
}