type Props = {
  title: string;
  value: string;
  icon: string;
};

export default function StatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="bg-[#171717] border border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300">

      <div className="flex justify-between items-center">

        <p className="text-gray-400">
          {title}
        </p>

        <span className="text-3xl">
          {icon}
        </span>

      </div>

      <h2 className="text-4xl font-black text-yellow-400 mt-6">
        {value}
      </h2>

    </div>
  );
}