// components/session/SessionTimeoutModal.jsx
export default function SessionTimeoutModal({ onContinue, onLogout }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-3">Session Expiring</h2>
        <p className="text-gray-700 mb-4">
          You have been inactive. You will be logged out soon.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
