import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-16 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Patients
            </Link>
            <Link
              to="/create-patient"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Create Patient
            </Link>
            <Link
              to="/create-provider"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Create Provider
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
