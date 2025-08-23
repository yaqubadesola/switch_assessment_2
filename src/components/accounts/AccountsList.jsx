import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // heroicons
import { Link } from "react-router-dom";

export default function AccountsList({ accounts }) {
  const [showDetails, setShowDetails] = useState({
    number: false,
    balance: false,
  });

  return (
    <div className="space-y-6">
      {accounts.map((acc) => {
        return (
          <div
            key={acc.id}
            className="account-card bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-gray-800">
                {acc.type} Account
              </h4>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-5">
              {/* Account Number with Eye Toggle */}
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium text-gray-500">Account Number</p>
                  <p className="text-gray-900 font-bold text-lg">
                    {showDetails.number
                      ? acc.number
                      : "**** " + acc.number.slice(-4)}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setShowDetails((prev) => ({
                      ...prev,
                      number: !prev.number,
                    }))
                  }
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {showDetails.number ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Balance with Eye Toggle */}
              <div className="flex items-center gap-2">
                <div>
                  <p className="font-medium text-gray-500">Available Balance</p>
                  <p className="text-2xl font-extrabold text-gray-900">
                    {showDetails.balance
                      ? `₦${acc.balance.toLocaleString()}`
                      : "₦****"}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setShowDetails((prev) => ({
                      ...prev,
                      balance: !prev.balance,
                    }))
                  }
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {showDetails.balance ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Type */}
              <div>
                <p className="font-medium text-gray-500">Account Type</p>
                <p className="text-gray-900">{acc.type}</p>
              </div>

              {/* Last Transaction */}
              <div>
                <p className="font-medium text-gray-500">Last Transaction</p>
                <p className="text-gray-900">{acc.lastTransactionDate}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link
                to={`/accounts/${acc.id}/transactions`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                View Transactions
              </Link>{" "}
              &nbsp; | &nbsp;
              <Link
                to={`/transfers/${acc.id}`}
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Transfer
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
