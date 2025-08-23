import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../features/accounts/accountsSlice";
import { fetchProfile } from "../features/profile/profileSlice";
import Loader from "../components/common/Loader";
import AccountsList from "../components/accounts/AccountsList";
import ProfileCard from "../components/profile/ProfileCard";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { list: accounts, loading: accountsLoading } = useSelector(
    (state) => state.accounts
  );
  const { data: profile, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("balance-desc");

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchProfile());
  }, [dispatch]);

  // Filtering
  let filteredAccounts =
    filter === "all"
      ? accounts
      : accounts.filter(
          (acc) => acc.type.toLowerCase() === filter.toLowerCase()
        );

  // Sorting
  filteredAccounts = [...filteredAccounts].sort((a, b) => {
    switch (sortOption) {
      case "balance-asc":
        return a.balance - b.balance;
      case "balance-desc":
        return b.balance - a.balance;
      case "date-asc":
        return (
          new Date(a.lastTransactionDate) - new Date(b.lastTransactionDate)
        );
      case "date-desc":
        return (
          new Date(b.lastTransactionDate) - new Date(a.lastTransactionDate)
        );
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 p-4 bg-white rounded-xl shadow-md border border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Account Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            A comprehensive view of your financial standing.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Profile Sidebar */}
          <aside className="lg:col-span-1 p-6 bg-white rounded-xl shadow-md border border-gray-200 h-fit flex flex-col gap-6">
            {profileLoading ? <Loader /> : <ProfileCard profile={profile} />}

            <div className="text-center border-t pt-4">
              <Link
                to="/transfers"
                className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm font-medium"
              >
                Make a Transfer
              </Link>
            </div>
          </aside>

          {/* Accounts Section */}
          <section className="lg:col-span-3">
            {/* Filter + Sort Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800">
                Your Financial Accounts
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                {/* Filter */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="accountFilter"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Filter:
                  </label>
                  <select
                    id="accountFilter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 text-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="all">All</option>
                    <option value="Current">Current</option>
                    <option value="Savings">Savings</option>
                    <option value="Loan">Loan</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sortOption"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Sort by:
                  </label>
                  <select
                    id="sortOption"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 text-sm text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="balance-desc">Balance (High → Low)</option>
                    <option value="balance-asc">Balance (Low → High)</option>
                    <option value="date-desc">Last Transaction (Newest)</option>
                    <option value="date-asc">Last Transaction (Oldest)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Accounts */}
            {accountsLoading ? (
              <Loader />
            ) : filteredAccounts.length === 0 ? (
              <p className="text-gray-500">No accounts found.</p>
            ) : (
              <AccountsList accounts={filteredAccounts} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
