import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function PostsCrudPage({
  cardClasses,
  tableHeaderClasses,
  tableCellClasses,
  actionButtonClasses,
}) {
  const [getParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  let pages = useRef();
  let page = getParams.get("page");
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        `http://localhost:8000/api/posts?page=${page}`,
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
        setPosts(resData.data);
      }
    }
    fetchPosts();
  }, [page]);
  if (
    !localStorage.getItem("token") &&
    localStorage.getItem("role") != "admin"
  ) {
    return <Navigate to="/" replace />;
  }
  function deletePost(post) {
    async function fetchDelete() {
      const resData = await fetch(
        `http://localhost:8000/api/posts/${post.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      //const response = await resData.json();
      if (resData.ok)
        setPosts((prevPosts) => prevPosts.filter((u) => u.id != post.id));
    }
    fetchDelete();
  }

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          Managing: Posts
        </h2>
        <Link
          to="/create-post"
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-medium rounded-full shadow-md hover:bg-green-700 transition duration-150"
        >
          <span>Create New</span>
        </Link>
      </div>
      {posts.length == 0 && (
        <p className="text-center py-8 text-gray-500">No posts...</p>
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
