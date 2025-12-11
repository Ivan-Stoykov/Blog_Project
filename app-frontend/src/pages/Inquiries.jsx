import { useState } from "react";
import { Navigate } from "react-router-dom";
import InquiryByAuthor from "./InquiryByAuthor";
import InquiryByCategory from "./InquiryByCategory";
import InquiryByPeriod from "./InquiryByPeriod";
import InquiryByTag from "./InquiryByTag";
import InquiryNumberPosts from "./InquiryNumberPosts";

export default function InquiriesPage() {
  const cardClasses = "bg-white p-6 shadow-xl rounded-xl";
  const tableHeaderClasses =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const tableCellClasses = "px-6 py-4 whitespace-nowrap text-sm text-gray-900";
  const actionButtonClasses =
    "px-3 py-1 text-xs font-medium rounded-full transition duration-150";
  const [content, setContent] = useState(
    <InquiryByAuthor
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
            Inquiries
          </h2>
          <ul className="space-y-1">
            <li>
              <button
                className={`w-full text-left p-3 rounded-lg font-medium transition duration-150 text-gray-700 hover:bg-gray-100`}
                onClick={() => {
                  setContent(
                    <InquiryByAuthor
                      cardClasses={cardClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableCellClasses={tableCellClasses}
                      actionButtonClasses={actionButtonClasses}
                    />
                  );

                }}
              >
                By Author
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-3 rounded-lg font-medium transition duration-150 text-gray-700 hover:bg-gray-100`}
                onClick={() => {
                  setContent(
                    <InquiryByCategory
                      cardClasses={cardClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableCellClasses={tableCellClasses}
                      actionButtonClasses={actionButtonClasses}
                    />
                  );
                }}
              >
                By Category
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-3 rounded-lg font-medium transition duration-150 text-gray-700 hover:bg-gray-100`}
                onClick={() => {
                  setContent(
                    <InquiryByPeriod
                      cardClasses={cardClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableCellClasses={tableCellClasses}
                      actionButtonClasses={actionButtonClasses}
                    />
                  );
                }}
              >
                By Period
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-3 rounded-lg font-medium transition duration-150 text-gray-700 hover:bg-gray-100`}
                onClick={() => {
                  setContent(
                    <InquiryByTag
                      cardClasses={cardClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableCellClasses={tableCellClasses}
                      actionButtonClasses={actionButtonClasses}
                    />
                  );
                }}
              >
                By Tag
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-3 rounded-lg font-medium transition duration-150 text-gray-700 hover:bg-gray-100`}
                onClick={() => {
                  setContent(
                    <InquiryNumberPosts
                      cardClasses={cardClasses}
                      tableHeaderClasses={tableHeaderClasses}
                      tableCellClasses={tableCellClasses}
                    />
                  );

                }}
              >
                Posts count
              </button>
            </li>
          </ul>
        </div>
        <div className="lg:w-3/4">{content}</div>
      </div>
    </div>
  );
}
