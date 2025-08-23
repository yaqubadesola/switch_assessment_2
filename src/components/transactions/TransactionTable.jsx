export default function TransactionTable({ transactions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3">Date</th>
            <th className="p-3">Description</th>
            <th className="p-3">Type</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, i) => (
            <tr key={i} className="border-b hover:bg-gray-50 transition">
              <td className="p-3">{txn.date}</td>
              <td className="p-3">{txn.description}</td>
              <td
                className={`p-3 font-medium ${
                  txn.type === "credit" ? "text-green-600" : "text-red-600"
                }`}
              >
                {txn.type.toUpperCase()}
              </td>
              <td
                className={`p-3 font-bold ${
                  txn.type === "credit" ? "text-green-600" : "text-red-600"
                }`}
              >
                ₦{txn.amount.toLocaleString()}
              </td>
              <td className="p-3">₦{txn.balance.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
