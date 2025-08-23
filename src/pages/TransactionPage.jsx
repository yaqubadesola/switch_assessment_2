import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileSlice";
import Loader from "../components/common/Loader";
import ProfileCard from "../components/profile/ProfileCard";
import TransactionsContainer from "../features/transactions/TransactionsContainer";

export default function TransactionsPage() {
  const dispatch = useDispatch();
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

        {/* Transaction Feature */}
        <section className="lg:col-span-3">
          <TransactionsContainer />
        </section>
      </div>
    </div>
  );
}
