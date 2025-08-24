export default function TransactionFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      <select
        value={filters.type}
        onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
        className="border border-gray-300 rounded-lg p-2 text-sm sm:block"
      >
        <option value="all">All</option>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>
      <input
        type="date"
        value={filters.startDate}
        onChange={(e) =>
          setFilters((f) => ({ ...f, startDate: e.target.value }))
        }
        className="border border-gray-300 rounded-lg p-2 text-sm sm:block"
      />
      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
        className="border border-gray-300 rounded-lg p-2 text-sm sm:block"
      />
    </div>
  );
}
