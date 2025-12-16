import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg text-center bg-white p-10 md:p-16 shadow-xl rounded-xl">
        {/* Large Error Code */}
        <p className="text-8xl font-extrabold text-red-500 font-serif mb-4">
          404
        </p>

        {/* Main Heading */}
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8">
          The resource you were looking for could not be located. It might have
          been moved or deleted.
        </p>

        {/* Call to Action Button */}
        <Link
          to={"/"}
          className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-150 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Go to Home Page!</span>
        </Link>
      </div>
    </div>
  );
}
