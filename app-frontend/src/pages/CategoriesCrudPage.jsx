import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function CategoriesCrudPage({
  cardClasses,
  tableHeaderClasses,
  tableCellClasses,
  actionButtonClasses,
}) {
  const [getParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  let pages = useRef();
  let page = getParams.get("page");
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        `http://localhost:8000/api/categories-paginate?page=${page}`,
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
        setCategories(resData.data);
      }
    }
    fetchCategories();
  }, [page]);
  if (
    !localStorage.getItem("token") &&
    localStorage.getItem("role") != "admin"
  ) {
    return <Navigate to="/" replace />;
  }
  console.log(categories);
  function deleteComments(category) {
    async function fetchDelete() {
      const resData = await fetch(
        `http://localhost:8000/api/categories/${category.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const response = await resData.json();
      console.log(response);
      if (resData.ok)
        setCategories((prevPosts) => prevPosts.filter((u) => u.id != category.id));
    }
    fetchDelete();
  }

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          Managing: Categories
        </h2>
        <Link
          to="/admin/create-category"
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-medium rounded-full shadow-md hover:bg-green-700 transition duration-150"
        >
          <span>Create New</span>
        </Link>
      </div>
      {categories.length == 0 && (
        <p className="text-center py-8 text-gray-500">Fetching categories...</p>
      )}
      {categories.length > 0 && (
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
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className={tableCellClasses}>{category.id}</td>
                  <td className={tableCellClasses}>{category.name}</td>
                  <td className={tableCellClasses}>{category.slug}</td>
                  <td className={`${tableCellClasses} flex space-x-2`}>
                    <Link
                      to={`http://localhost:3000/admin/categories/${category.id}`}
                      className={`${actionButtonClasses} bg-blue-500 text-white hover:bg-blue-600`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteComments(category)}
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
