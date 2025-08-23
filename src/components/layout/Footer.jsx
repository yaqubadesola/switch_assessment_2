export default function Footer() {
  return (
    <footer className="bg-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} PayQuick. All rights reserved.</p>
        <div className="space-x-4 sm:mt-0">
          <a href="#privacy" className="hover:text-blue-600">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-blue-600">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
