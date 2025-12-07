import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Paginator from "./Paginator";

export default function AddBannedWord({
  cardClasses,
  tableHeaderClasses,
  tableCellClasses,
  actionButtonClasses,
}) {
  const [getParams] = useSearchParams();
  const [words, setWords] = useState();
  let pages = useRef();
  let page = getParams.get("page");

  

  useEffect(() => {
    async function fetchWords() {
      const response = await fetch(
        `http://localhost:8000/api/bannedWords?page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      let fetchedWords = await response.json();
      if (response.ok) {
        pages.current = fetchedWords.last_page;
        setWords(fetchedWords.data);
        console.log(fetchedWords);
      }
    }

    fetchWords();
  }, [page]);
  if (!localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }
  function handleDelete(word) {
    async function deletePost() {
      const response = await fetch(
        "http://localhost:8000/api/bannedWords/" + word.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      const resData = await response.json();
      console.log(resData);
      if (response.ok)
        setWords((prevWords) => prevWords.filter((w) => w.id != word.id));
    }
    deletePost();
  }

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          Managing: Posts
        </h2>
        <Link
          to="/admin/create-bannedWord"
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-medium rounded-full shadow-md hover:bg-green-700 transition duration-150"
        >
          <span>Create New</span>
        </Link>
      </div>
      {!words && (
        <p className="text-center py-8 text-gray-500">
          Fetching banned words...
        </p>
      )}
      {words && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={tableHeaderClasses}>Id</th>
                <th className={tableHeaderClasses}>Word</th>
                <th className={tableHeaderClasses}>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {words.map((word) => (
                <tr key={word.id} className="hover:bg-gray-50">
                  <td className={tableCellClasses}>{word.id}</td>
                  <td className={tableCellClasses}>{word.word}</td>
                  <td className={`${tableCellClasses} flex space-x-2`}>
                    <button
                      className={`${actionButtonClasses} bg-red-500 text-white hover:bg-red-600`}
                      onClick={() => handleDelete(word)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Paginator pages={pages.current} currentPage={page} />
    </div>
  );
}
