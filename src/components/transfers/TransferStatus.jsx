export default function TransferStatus({ status, reference }) {
  if (!status) return null;

  return (
    <div
      className={`mt-4 p-3 rounded-lg text-sm font-medium ${
        status === "success"
          ? "bg-green-100 text-green-700"
          : status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status === "pending" && "Processing transfer..."}
      {status === "success" && (
        <span>
          Transfer successful ✅ <br />
          <strong>Ref:</strong> {reference}
        </span>
      )}
      {status === "failed" && "Transfer failed ❌"}
    </div>
  );
}
