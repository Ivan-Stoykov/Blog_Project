import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import DeleteButton from "../components/DeleteButton";

export default function Post() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function fetchPost() {
      let response = await fetch(
        `http://localhost:8000/api/posts/${params.slug}`
      );

      const post = await response.json();

      setPost(post);
      response = await fetch(`http://localhost:8000/api/comments/${post.id}`);

      const comments = await response.json();

      setComments(comments);
      console.log(post);
    }
    fetchPost();
  }, [params.slug]);

  function handleDelete(comment) {
    async function deletePost() {
      const response = await fetch(
        "http://localhost:8000/api/comments/" + comment.id,
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
        setComments((prevComments) =>
          prevComments.filter((c) => c.id != comment.id)
        );
    }
    deletePost();
  }

  return (
    <>
      {!post && <p>Loading</p>}
      {post && (
        <main className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 md:p-12 shadow-xl rounded-xl">
            <img
              src={
                post.media.length > 0
                  ? `http://localhost:8000/api/${post.media[0].filePath}`
                  : "http://localhost:8000/api/image/default_img.png"
              }
              className="w-full h-auto object-cover rounded-lg mb-8 shadow-md"
            ></img>
            <span className="inline-block px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full mb-2">
              {post.post_categories.category.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-md text-gray-500 mb-8">
              By
              <span className="font-semibold text-gray-700">
                {post.author.name}
              </span>
              on {post.publishedAt}
            </p>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              {post.content}
            </div>
          </div>

          <div className="mt-12 bg-white p-6 md:p-10 shadow-xl rounded-xl">
            {localStorage.getItem("token") && (
              <>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Leave a comment!</h3>
              <AddComment postId={post.id} setComments={setComments} />
              </>
            )}
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Comments</h3>
            {comments.length > 0 &&
              comments.map((comment) => (
                <div className="space-y-4">
                  <Comments key={comment.id} comment={comment} />
                  {localStorage.getItem("token") &&
                    (localStorage.getItem("role") == "editor" ||
                      localStorage.getItem("admin") == "admin") && (
                      <DeleteButton
                        handleDelete={() => handleDelete(comment)}
                      />
                    )}
                </div>
              ))}
          </div>
        </main>
      )}
      {comments.length == 0 && <p>No comments!</p>}
    </>
  );
}
