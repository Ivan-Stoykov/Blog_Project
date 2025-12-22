import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function CommentsCrudPage({
  cardClasses,
  tableHeaderClasses,
  tableCellClasses,
  actionButtonClasses,
}) {
  const [getParams] = useSearchParams();
  const [comments, setComments] = useState([]);
  let pages = useRef();
  let page = getParams.get("page");
  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(
        `http://localhost:8000/api/comments?page=${page}`,
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
        setComments(resData.data);
      }
    }
    fetchComments();
  }, [page]);
  if (
    !localStorage.getItem("token") &&
    localStorage.getItem("role") != "admin"
  ) {
    return <Navigate to="/" replace />;
  }
  function deleteComments(comment) {
    async function fetchDelete() {
      const resData = await fetch(
        `http://localhost:8000/api/comments/${comment.id}`,
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
        setComments((prevPosts) => prevPosts.filter((u) => u.id != comment.id));
    }
    fetchDelete();
  }

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          Managing: Comments
        </h2>
      </div>
      {comments.length == 0 && (
        <p className="text-center py-8 text-gray-500">No comments...</p>
      )}
      {comments.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>Id</th>
                  <th className={tableHeaderClasses}>Comment</th>
                  <th className={tableHeaderClasses}>Created At</th>
                  <th className={tableHeaderClasses}>Post</th>
                  <th className={tableHeaderClasses}>Status</th>
                  <th className={tableHeaderClasses}>Author</th>
                  <th className={tableHeaderClasses}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comments.map((comment) => (
                  <tr key={comment.id} className="hover:bg-gray-50">
                    <td className={tableCellClasses}>{comment.id}</td>
                    <td className={tableCellClasses}>
                      {comment.body.length > 8
                        ? comment.body.slice(0, 8).trim() + "..."
                        : comment.body}
                    </td>
                    <td className={tableCellClasses}>{comment.createdAt}</td>
                    <td className={tableCellClasses}>{comment.post.title.length > 25
                        ? comment.post.title.slice(0, 25).trim() + "..."
                        : comment.post.title}</td>
                    <td className={tableCellClasses}>{comment.status}</td>
                    <td className={tableCellClasses}>{comment.author.name}</td>
                    <td className={`${tableCellClasses} flex space-x-2`}>
                      <button
                        onClick={() => deleteComments(comment)}
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
