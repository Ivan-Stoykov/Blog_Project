import { useState } from "react";
import UsersCrudPage from "./UsersCrudPage";
import PostsCrudPage from "./PostsCrudPage";
import TagsCrudPage from "./TagsCrudPage";
import { Navigate } from "react-router-dom";
import AddBannedWord from "../components/BannedWordsCrud";

export default function AdminPage() {
  const cardClasses = "bg-white p-6 shadow-xl rounded-xl";
  const tableHeaderClasses =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableCellClasses = "px-6 py-4 whitespace-nowrap text-sm text-gray-900";
  const actionButtonClasses =
    "px-3 py-1 text-xs font-medium rounded-full transition duration-150";
  const [content, setContent] = useState(
    <UsersCrudPage
      cardClasses={cardClasses}
      tableHeaderClasses={tableHeaderClasses}
      tableCellClasses={tableCellClasses}
      actionButtonClasses={actionButtonClasses}
    />
  );
  if (
    !localStorage.getItem("token") &&
    localStorage.getItem("role") != "admin"
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 w-full">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">
        Admin Dashboard
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className={`lg:w-1/4 ${cardClasses}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Manage
          </h2>
          <ul className="space-y-1">
            <li>
              <button
                className={`w-full text-left p-3 rounded-lg font-medium transition duration-150 text-gray-700 hover:bg-gray-100`}
                onClick={() => {
                  setContent(
                    <UsersCrudPage
                      cardClasses={cardClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableCellClasses={tableCellClasses}
                      actionButtonClasses={actionButtonClasses}
                    />
                  );

                }}
              >
                Users
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-3 rounded-lg font-medium transition duration-150 text-gray-700 hover:bg-gray-100`}
                onClick={() => {
                  setContent(
                    <PostsCrudPage
                      cardClasses={cardClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableCellClasses={tableCellClasses}
                      actionButtonClasses={actionButtonClasses}
                    />
                  );
                }}
              >
                Posts
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-3 rounded-lg font-medium transition duration-150 text-gray-700 hover:bg-gray-100`}
                onClick={() => {
                  setContent(
                    <TagsCrudPage
                      cardClasses={cardClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableCellClasses={tableCellClasses}
                      actionButtonClasses={actionButtonClasses}
                    />
                  );
                }}
              >
                Tags
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-3 rounded-lg font-medium transition duration-150 text-gray-700 hover:bg-gray-100`}
                onClick={() => {
                  setContent(
                    <AddBannedWord
                      cardClasses={cardClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableCellClasses={tableCellClasses}
                      actionButtonClasses={actionButtonClasses}
                    />
                  );
                }}
              >
                Banned words
              </button>
            </li>
          </ul>
        </div>
        <div className="lg:w-3/4">{content}</div>
      </div>
    </div>
  );
}
