import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "./transactionsSlice";
import Loader from "../../components/common/Loader";
import TransactionFilters from "../../components/transactions/TransactionFilters";
import TransactionTable from "../../components/transactions/TransactionTable";
import Pagination from "../../components/transactions/Pagination";
import ExportCSVButton from "../../components/transactions/ExportCSVButton";

export default function TransactionsContainer() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    list: transactions,
    loading,
    accountMeta,
  } = useSelector((state) => state.transactions);

  const [filters, setFilters] = useState({
    type: "all",
    startDate: "",
    endDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    if (id) dispatch(fetchTransactions(id));
  }, [id, dispatch]);

  // Apply filters
  const filteredTxns = transactions.filter((txn) => {
    let match = true;
    if (filters.type !== "all" && txn.type !== filters.type) match = false;
    if (filters.startDate && new Date(txn.date) < new Date(filters.startDate))
      match = false;
    if (filters.endDate && new Date(txn.date) > new Date(filters.endDate))
      match = false;
    return match;
  });

  // Pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentTxns = filteredTxns.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTxns.length / rowsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-4">
        {/* Account Type */}
        <h2 className="text-2xl font-bold text-gray-800">
          {accountMeta?.type || ""} Account
        </h2>

        {/* Subtle Back Link */}
        <Link
          to="/dashboard"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Filters + Export */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Transaction History
        </h3>
        <div className="flex items-center gap-3">
          <TransactionFilters filters={filters} setFilters={setFilters} />
          <ExportCSVButton data={filteredTxns} />
        </div>
      </div>

      {/* Transactions Table */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <TransactionTable transactions={currentTxns} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
