import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function TagsCrudPage({
  cardClasses,
  tableHeaderClasses,
  tableCellClasses,
  actionButtonClasses,
}) {
  const [getParams] = useSearchParams();
  const [tags, setTags] = useState([]);
  let pages = useRef();
  let page = getParams.get("page");
  useEffect(() => {
    async function fetchTags() {
      const response = await fetch(
        `http://localhost:8000/api/tags?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const resData = await response.json();
      if (response.ok) {
        pages.current = resData.last_page;
        setTags(resData.data);
      }
    }
    fetchTags();
  }, [page]);
  if (
    !localStorage.getItem("token") &&
    localStorage.getItem("role") != "admin"
  ) {
    return <Navigate to="/" replace />;
  }
  console.log(tags);
  function deleteTag(tag) {
    async function fetchDelete() {
      const resData = await fetch(`http://localhost:8000/api/tags/${tag.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const response = await resData.json();
      console.log(response);
      if (resData.ok)
        setTags((prevTags) => prevTags.filter((u) => u.id != tag.id));
    }
    fetchDelete();
  }

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          Managing: Tags
        </h2>
      </div>
      {tags.length == 0 && (
        <p className="text-center py-8 text-gray-500">Fetching tags...</p>
      )}
      {tags.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={tableHeaderClasses}>Id</th>
                <th className={tableHeaderClasses}>Name</th>
                <th className={tableHeaderClasses}>Slug</th>
                <th className={tableHeaderClasses}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50">
                  <td className={tableCellClasses}>{tag.id}</td>
                  <td className={tableCellClasses}>{tag.name}</td>
                  <td className={tableCellClasses}>{tag.slug}</td>
                  <td className={`${tableCellClasses} flex space-x-2`}>
                    <Link
                      to={`http://localhost:3000/admin/tags/${tag.id}`}
                      className={`${actionButtonClasses} bg-blue-500 text-white hover:bg-blue-600`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteTag(tag)}
                      className={`${actionButtonClasses} bg-red-500 text-white hover:bg-red-600`}
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
