import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TransferForm from "../components/transfers/TransferForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileSlice";
import Loader from "../components/common/Loader";
import ProfileCard from "../components/profile/ProfileCard";
export default function TransfersPage() {
  const { accountId } = useParams();
  const dispatch = useDispatch();
  const { list: accounts } = useSelector((state) => state.accounts);

  // Pre-select account if route has accountId
  const preselectedAccount = accounts.find((a) => a.id === accountId);
  const { data: profile, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <aside className="lg:col-span-1 p-6 bg-white rounded-xl shadow-md border border-gray-200 h-fit">
          {profileLoading ? <Loader /> : <ProfileCard profile={profile} />}
        </aside>
        {/* Transfer Feature */}
        <div className="lg:col-span-3">
          {" "}
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-start">
              {" "}
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Funds Transfer
              </h1>{" "}
              <Link
                to="/dashboard"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                ← Back to Dashboard
              </Link>
            </div>
            <TransferForm preselectedAccount={preselectedAccount} />
          </div>
        </div>
      </div>
    </div>
  );
}
