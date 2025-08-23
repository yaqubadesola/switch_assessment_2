import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initiateTransfer,
  resetStatus,
} from "../../features/transfers/transfersSlice";
import { fetchAccounts } from "../../features/accounts/accountsSlice";
import TransferConfirmationModal from "./TransferConfirmationModal";
import TransferStatus from "./TransferStatus";

export default function TransferForm({ preselectedAccount }) {
  const dispatch = useDispatch();
  const { list: accounts } = useSelector((state) => state.accounts);
  const { status, reference } = useSelector((state) => state.transfers);

  const initialForm = {
    sourceAccount: preselectedAccount?.id || "",
    beneficiary: "",
    amount: "",
    description: "",
  };

  const [form, setForm] = useState(initialForm);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmTransfer = () => {
    dispatch(initiateTransfer(form));
    setShowModal(false);
  };

  useEffect(() => {
    if (status === "success") {
      setForm(initialForm);
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Source Account */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Source Account
        </label>
        {preselectedAccount ? (
          <input
            type="text"
            value={`${
              preselectedAccount.type
            } (****${preselectedAccount.number.slice(-4)})`}
            disabled
            className="w-full p-2 border rounded-lg bg-gray-100 text-gray-700"
          />
        ) : (
          <select
            name="sourceAccount"
            value={form.sourceAccount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.type} (****{acc.number.slice(-4)})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Beneficiary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Beneficiary Account Number
        </label>
        <input
          type="text"
          name="beneficiary"
          value={form.beneficiary}
          onChange={handleChange}
          pattern="^[0-9]{10}$"
          required
          className="w-full p-2 border rounded-lg"
          placeholder="Enter 10-digit account number"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          min="1"
          required
          className="w-full p-2 border rounded-lg"
          placeholder="Enter amount"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="2"
          className="w-full p-2 border rounded-lg"
          placeholder="Optional note"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit Transfer
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <TransferConfirmationModal
          form={form}
          onClose={() => setShowModal(false)}
          onConfirm={confirmTransfer}
          open={showModal}
        />
      )}

      {/* Transfer Status */}
      <TransferStatus status={status} reference={reference} />
    </form>
  );
}
