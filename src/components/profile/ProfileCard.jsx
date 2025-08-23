export default function ProfileCard({ profile }) {
  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://placehold.co/100x100/A0D9EF/ffffff?text=YA"
          alt="User Profile"
          className="w-24 h-24 rounded-full ring-4 ring-blue-500 mb-4 object-cover"
        />
        <h2 className="text-2xl font-semibold text-gray-800">
          {profile?.name}
        </h2>
        <p className="text-sm text-gray-500">Premium Customer</p>
      </div>
      <div className="text-sm text-gray-700 space-y-3 border-t pt-4 mt-4 border-gray-200">
        <p className="flex items-center">
          <span className="font-medium text-gray-500 w-24">Email:</span>
          <span className="flex-1 text-blue-600 hover:underline">
            {profile?.email}
          </span>
        </p>
      </div>
    </>
  );
}
