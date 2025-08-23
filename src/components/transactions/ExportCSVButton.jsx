import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function ExportCSVButton({ data }) {
  const exportCSV = () => {
    const headers = ["Date", "Description", "Type", "Amount", "Balance"];
    const rows = data.map((t) => [
      t.date,
      t.description,
      t.type,
      t.amount,
      t.balance,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportCSV}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      <ArrowDownTrayIcon className="w-5 h-5" />
      Export CSV
    </button>
  );
}
