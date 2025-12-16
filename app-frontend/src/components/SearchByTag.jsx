import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchByTag() {
  const ref = useRef();
  const navigate = useNavigate();
  return (
    <div className="flex w-full sm:w-80 shadow-md rounded-lg">
      <div className="relative flex-grow">
        <input
          ref={ref}
          type="text"
          placeholder={`Search tag...`}
          className="flex-grow p-3 pl-10 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-sm"
          style={{ borderRightWidth: 0 }}
        />
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
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <button
        onClick={()=>{
            navigate(`/tag/${ref.current.value}`);
        }}
        className="px-4 py-3 bg-stone-900 text-white font-medium rounded-r-lg shadow-lg hover:bg-stone-950 transition duration-150 transform hover:scale-[1.01] flex items-center justify-center space-x-2 whitespace-nowrap"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>Search</span>
      </button>
    </div>
  );
}
