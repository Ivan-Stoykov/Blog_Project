import { useEffect, useRef, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function InquiryNumberPosts({
  cardClasses,
  tableHeaderClasses,
  tableCellClasses,
}) {
  const [getParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  let pages = useRef();
  let page = getParams.get("page");

  useEffect(() => {
    async function fetchPosts() {
      console.log(page, "page");
      const response = await fetch(
        `http://localhost:8000/api/admin/authorPosts?page=${page}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      let fetchedPosts = await response.json();
      if (response.ok) {
        pages.current = fetchedPosts.last_page;
        setPosts(fetchedPosts.data);
        console.log(fetchedPosts.data);
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
  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          Справка брой постове по автори
        </h2>
      </div>
      {posts.length == 0 && (
        <p className="text-center py-8 text-gray-500">No posts!</p>
      )}
      {posts.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>Id</th>
                  <th className={tableHeaderClasses}>Author</th>
                  <th className={tableHeaderClasses}>Email</th>
                  <th className={tableHeaderClasses}>Post Count</th>
                  <th className={tableHeaderClasses}>Published Count</th>
                  <th className={tableHeaderClasses}>Draft Count</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className={tableCellClasses}>{post.id}</td>
                    <td className={tableCellClasses}>{post.name}</td>
                    <td className={tableCellClasses}>{post.email}</td>
                    <td className={tableCellClasses}>{post.posts_count}</td>
                    <td className={tableCellClasses}>{post.published_posts_count}</td>
                    <td className={tableCellClasses}>{post.draft_posts_count}</td>
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
