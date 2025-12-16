import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

export default function EditPostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState();
  const [errors, setErrors] = useState();

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://127.0.0.1:8000/api/categories");
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);
    }
    async function fetchPost() {
      const response = await fetch(`http://localhost:8000/api/post/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const fetchedPost = await response.json();
      setPost(fetchedPost);
    }
    fetchCategories();
    fetchPost();
  }, [id]);
  if (
    !localStorage.getItem("token") &&
    (localStorage.getItem("role") != "admin" || localStorage.getItem("role") != "editor")
  ) {
    return <Navigate to="/" replace />;
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const title = fd.get("title");
    const today = new Date();
    const publishedAt =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    fd.append("slug", title.replace(/[^a-zA-Z0-9 ]/g, "").replace(" ", "-"));
    fd.append("publishedAt", publishedAt);
    fd.append("authorId", localStorage.getItem("id"));
    const tags = JSON.stringify(fd.get("tags").split(", "));
    fd.set("tags", tags);
    fd.append("_method", "PATCH");
    async function createPost() {
      const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "POST",

        body: fd,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      });

      const resData = await response.json();
      if (response.ok) navigate("/");
      else {
        setErrors(Object.values(resData.errors));
      }
    }

    createPost();
  }

  function kick() {
    if (
      localStorage.getItem("role") == "author" &&
      localStorage.getItem("id") != post.authorId
    )
      navigate("/");
  }
  const labelClasses = "block text-sm font-medium text-gray-700";
  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 mt-1";
  return (
    <>
      {!post && <p>Loading...</p>}
      {post && (
        <div className="bg-white p-6 md:p-10 shadow-xl rounded-xl">
          {kick()}
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 border-b pb-4">
            Edit Blog Post
          </h1>

          {errors && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg shadow-sm">
              <p className="font-semibold text-red-700 mb-2">
                Please correct the following errors:
              </p>
              <ul className="list-disc list-inside text-red-600 space-y-1">
                {errors.map((e) => (
                  <li key={e} className="text-sm">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className={labelClasses}>
                Title:
              </label>
              <input
                type="text"
                name="title"
                required
                className={inputClasses}
                placeholder="Enter the post title"
                defaultValue={post.title}
              />
            </div>
            <div>
              <label htmlFor="content" className={labelClasses}>
                Content:
              </label>
              <textarea
                name="content"
                required
                rows="10"
                className={`${inputClasses} resize-y`}
                defaultValue={post.content}
              ></textarea>
            </div>
            <div>
              <label htmlFor="image" className={labelClasses}>
                Image:
              </label>
              <input
                type="file"
                name="image"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-2"
              />
            </div>
            <div>
              <label htmlFor="categoryId" className={labelClasses}>
                Category:
              </label>
              <select
                name="categoryId"
                className={inputClasses}
                defaultValue={post.post_categories.category}
              >
                {categories.length !== 0 &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor="tags" className={labelClasses}>
                Tags (comma separated):
              </label>
              <input
                type="text"
                name="tags"
                className={inputClasses}
                defaultValue={
                  post.post_tags.length > 0
                    ? post.post_tags.length > 1
                      ? post.post_tags.map((tag) => tag.tag.name).join(", ")
                      : post.post_tags[0].tag.name
                    : ""
                }
              />
            </div>
            <div>
              <label htmlFor="status" className={labelClasses}>
                Save as:
              </label>
              <select
                name="status"
                className={inputClasses}
                defaultValue={post.status}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div>
              <input
                type="submit"
                value="Update Post"
                className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-150"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
