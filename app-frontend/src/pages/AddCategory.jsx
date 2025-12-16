import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  if (
    !localStorage.getItem("token") ||
    (localStorage.getItem("role") != "admin" &&
      localStorage.getItem("role") != "editor")
  ) {
    return <Navigate to="/" replace />;
  }
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const category = fd.get("category");
    const slug = category.replace(" ", "-");

    async function createCategory() {
      const response = await fetch("http://localhost:8000/api/categories", {
        method: "POST",
        body: JSON.stringify({ name: category, slug }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      });

      const resData = await response.json();
      if (response.ok) navigate("/admin");
      else {
        setErrors(Object.values(resData.ValidationError));
      }
    }

    createCategory();
  }

  return (
    <div className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 shadow-xl rounded-xl">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 border-b pb-4 text-center">
          Add Category
        </h1>
        {errors &&
          errors.map((e) => (
            <p key={e} style={{ color: "red" }}>
              {e}
            </p>
          ))}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Категория:
            </label>
            <input
              type="text"
              name="category"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 mt-1"
            />
          </div>
          <div>
            <input
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-150"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
