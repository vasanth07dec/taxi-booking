import { CarTaxiFront } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 text-center">
      
      <div className="flex items-center mb-6">
        <CarTaxiFront className="text-blue-600" size={40} />
        <span className="ml-3 text-2xl font-extrabold text-gray-800">
          TaxiGo
        </span>
      </div>

      <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, the page you are trying to access is not available.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 text-white font-medium shadow hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
