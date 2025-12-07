import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../store/userContext";

export default function MainNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef()
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <Link
            to={"/"}
            className="text-3xl font-serif font-bold text-neutral-900"
          >
            Blog Page
          </Link>
          <nav className="flex gap-8 items-center">
            {localStorage.getItem("token") && (
              <>
                <Link
                  to="/create-post"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Create Post
                </Link>
                <Link
                  to="/drafts"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  My Drafts
                </Link>
                <button
                  onClick={() => {
                    userCtx.logout();
                    navigate("/");
                  }}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
            {localStorage.getItem("role") == "admin" && (
                <div className="relative" ref={dropdownRef}>
                  <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 transition-colors"
              >
                <span className="text-sm font-medium text-neutral-900">
                Admin
                </span>
              </button>
                {isDropdownOpen && 
                <div
                  className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50"
                >
                  <Link to={"/admin"} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">Dashboard</Link>
                  <Link
                    to={"/admin/bannedWords"}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Banned Words
                  </Link>
                  <Link
                    to={"/admin/inquiryByAuthor"}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Spravka Avtor
                  </Link>
                  <Link
                    to={"/admin/inquiryByCategory"}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Spravka Kategoriq
                  </Link>
                  <Link
                    to={"/admin/inquiryByTag"}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Spravka Tag
                  </Link>
                  <Link
                    to={"/admin/inquiryByPeriod"}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Spravka Period
                  </Link>
                </div>}</div>
            )}
            {!localStorage.getItem("token") && (
              <>
                <Link
                  to={"/login"}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to={"/register"}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
