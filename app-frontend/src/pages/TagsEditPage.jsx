import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

export default function TagsEditPage() {
  const params = useParams();
  const [tag, setTag] = useState();
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTag() {
      const response = await fetch(
        `http://localhost:8000/api/tags/${params.id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const resData = await response.json();
      setTag(resData);
    }
    fetchTag();
  }, [params.id]);
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("role") != "admin"
  ) {
    return <Navigate to="/" replace />;
  }
  function handleEditTag(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const name = fd.get("name");
    const slug = fd.get("slug").replace(/ /g, "-");
    console.log({ tag });

    async function editTag() {
      const response = await fetch(`http://localhost:8000/api/tags/${tag.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, slug }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const resData = await response.json();

      if (response.ok) {
        navigate("/admin");
      } else {
        setErrors(Object.values(resData.ValidationError));
      }
    }

    editTag();
  }
  const labelClasses = "block text-sm font-medium text-gray-700";
  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 mt-1";
  return (
    <>
      {!tag && <p>Fetching tag...</p>}
      {tag && (
        <div className="bg-white p-6 md:p-10 shadow-xl rounded-xl">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 border-b pb-4">
            Edit Tag
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
          <form onSubmit={handleEditTag} className="space-y-6">
            <div>
              <label htmlFor="name" className={labelClasses}>
                Name:
              </label>
              <input
                type="text"
                name="name"
                defaultValue={tag.name}
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="slug" className={labelClasses}>
                Slug:
              </label>
              <input
                type="text"
                name="slug"
                defaultValue={tag.slug}
                className={inputClasses}
              />
            </div>
            <div>
              <input
                type="submit"
                value={"Edit"}
                className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-150"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
