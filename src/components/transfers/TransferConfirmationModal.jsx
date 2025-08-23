export default function TransferConfirmationModal({
  open,
  form,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm Transfer</h2>
        <p className="mb-2">
          <strong>From:</strong> {form?.sourceAccount}
        </p>
        <p className="mb-2">
          <strong>To:</strong> {form?.beneficiary}
        </p>
        <p className="mb-2">
          <strong>Amount:</strong> ₦{Number(form?.amount || 0).toLocaleString()}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {form?.description || "—"}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
