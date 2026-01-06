import PostList from "../components/PostList";
import Paginator from "../components/Paginator";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function InquiryByCategory({
  cardClasses,
  tableHeaderClasses,
  tableCellClasses,
  actionButtonClasses,
}) {
  const [getParams] = useSearchParams();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  let field = useRef();
  let pages = useRef();
  let page = getParams.get("page");

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        `http://localhost:8000/api/admin/byCategory/${category}?page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem('token') 
          },
        }
      );
      let fetchedPosts = await response.json();
      if (response.ok) {
        pages.current = fetchedPosts.last_page;
        setPosts(fetchedPosts.data.map((post) => post.post));
      }
    }
    async function fetchCategories() {
      const response = await fetch(`http://localhost:8000/api/categories`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      let fetchCategories = await response.json();
      if (response.ok) {
        setCategories(fetchCategories);
      }
    }

    fetchPosts();
    fetchCategories();
  }, [page, category]);
  if (
    !localStorage.getItem("token") &&
    localStorage.getItem("role") != "admin"
  ) {
    return <Navigate to="/" replace />;
  }
  function deletePost(post) {
    async function deletePost() {
      const response = await fetch(
        "http://localhost:8000/api/posts/" + post.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      if (response.ok)
        setPosts((prevPosts) => prevPosts.filter((p) => p.id != post.id));
    }
    deletePost();
  }
  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          Справка постове по категория
        </h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-3/5 xl:w-1/2">
          <select
            ref={field}
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 w-full sm:w-3/4 text-sm"
          >
            {categories.length !== 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
          </select>
          <button
          onClick={()=>{setCategory(()=>field.current.value)
          }}
           className="w-full sm:w-1/4 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-150 flex items-center justify-center space-x-2">
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
            <span>Find</span>
          </button>
        </div>
      </div>
      {posts.length == 0 && (
        <p className="text-center py-8 text-gray-500">Enter category!</p>
      )}
      {posts.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>Id</th>
                  <th className={tableHeaderClasses}>Title</th>
                  <th className={tableHeaderClasses}>Content</th>
                  <th className={tableHeaderClasses}>Slug</th>
                  <th className={tableHeaderClasses}>Status</th>
                  <th className={tableHeaderClasses}>Author</th>
                  <th className={tableHeaderClasses}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className={tableCellClasses}>{post.id}</td>
                    <td className={tableCellClasses}>{post.title}</td>
                    <td className={tableCellClasses}>
                      {post.content.length > 8
                        ? post.content.slice(0, 8).trim() + "..."
                        : post.content}
                    </td>
                    <td className={tableCellClasses}>{post.slug}</td>
                    <td className={tableCellClasses}>{post.status}</td>
                    <td className={tableCellClasses}>{post.author.name}</td>
                    <td className={`${tableCellClasses} flex space-x-2`}>
                      <Link
                        to={`http://localhost:3000/admin/posts/${post.id}`}
                        className={`${actionButtonClasses} bg-blue-500 text-white hover:bg-blue-600`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePost(post)}
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
          <Paginator pages={pages.current} currentPage={page} />
        </>
      )}
    </div>
  );
}
