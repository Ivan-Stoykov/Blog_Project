import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

export default function EditUserPage() {
  const params = useParams();
  const [user, setUser] = useState();
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const resData = await fetch(
        `http://localhost:8000/api/users/${params.id}`
      );
      const user = await resData.json();
      setUser(user);
    }
    fetchUser();
  }, [params.id]);
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("role") != "admin"
  ) {
    return <Navigate to="/" replace />;
  }
  function handleEditUser(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const name = fd.get("name");
    const email = fd.get("email");
    const role = fd.get("role");

    async function editUser() {
      const response = await fetch(
        `http://localhost:8000/api/users/${user.id}`,
        {
          method: "POST",
          body: JSON.stringify({ name, email, role }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const resData = await response.json();
      if (response.ok) navigate("/admin");
      else {
        setErrors(Object.values(resData.ValidationError));
      }
    }

    editUser();
  }
  const labelClasses = "block text-sm font-medium text-gray-700";
  const inputClasses =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 mt-1";
  return (
    <div className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 shadow-xl rounded-xl">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 border-b pb-4 text-center">
          Edit Account
        </h1>
        {!user && <p>Fetching user...</p>}
        {user && (
          <>
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
            <form onSubmit={handleEditUser} className="space-y-6">
              <div>
                <label htmlFor="name" className={labelClasses}>Name:</label>
                <input type="text" name="name" defaultValue={user.name} className={inputClasses} />
              </div>
              <div>
                <label htmlFor="name" className={labelClasses}>Email:</label>
                <input type="email" name="email" defaultValue={user.email} className={inputClasses} />
              </div>
              <div>
                <label htmlFor="name" className={labelClasses}>Role:</label>
                <select name="role" defaultValue={user.role} className={inputClasses}>
                  <option value="author">author</option>
                  <option value="editor">editor</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div>
                <input type="submit" value={"Edit"} className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-150" />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
