import { CreditCardIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function LandingPage() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Bank Smarter with <span className="text-blue-600">SwitchMFB</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-4 flex items-center justify-center lg:justify-start gap-3">
            <CreditCardIcon className="h-7 w-7 text-blue-500" />
            Seamless digital payments{" "}
          </p>
          <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-4 flex items-center justify-center lg:justify-start gap-3">
            <ArrowPathIcon className="h-7 w-7 text-blue-500" />
            Real-time transactions.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
            <a
              href="/login"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started
            </a>
            {/* You can add another button here, e.g., "Learn More" */}
            {/* <a
              href="#features"
              className="px-8 py-4 border border-blue-600 text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Learn More
            </a> */}
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full lg:w-1/2 max-w-md lg:max-w-none rounded-3xl shadow-2xl overflow-hidden mt-10 lg:mt-0">
          <img
            src="/assets/naira.png"
            alt="Secure Digital Banking"
            className="w-full h-full object-cover rounded-3xl" // Added w-full h-full object-cover for responsiveness
          />
        </div>
      </div>
    </section>
  );
}
