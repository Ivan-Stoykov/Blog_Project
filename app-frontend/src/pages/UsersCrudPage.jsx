import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function UsersCrudPage({
  cardClasses,
  tableHeaderClasses,
  tableCellClasses,
  actionButtonClasses,
}) {
  const [getParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  let pages = useRef();
  let page = getParams.get("page");
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        `http://localhost:8000/api/users?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const users = await response.json();
      if (response.ok) {
        pages.current = users.last_page;
        setUsers(users.data);
      }
    }
    fetchUsers();
  }, [page]);
  if (
    !localStorage.getItem("token") &&
    localStorage.getItem("role") != "admin"
  ) {
    return <Navigate to="/" replace />;
  }
  function deleteUser(user) {
    async function fetchDelete() {
      const resData = await fetch(
        `http://localhost:8000/api/users/${user.id}`,
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
        setUsers((prevUsers) => prevUsers.filter((u) => u.id != user.id));
    }
    fetchDelete();
  }

  return (
      <div className={cardClasses}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-gray-800">
            Managing: Users
          </h2>
        </div>
        {users.length == 0 && (
          <p className="text-center py-8 text-gray-500">Fetching users...</p>
        )}
        {users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className={tableHeaderClasses}>Id</th>
                  <th className={tableHeaderClasses}>Name</th>
                  <th className={tableHeaderClasses}>email</th>
                  <th className={tableHeaderClasses}>role</th>
                  <th className={tableHeaderClasses}>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className={tableCellClasses}>{user.id}</td>
                    <td className={tableCellClasses}>{user.name}</td>
                    <td className={tableCellClasses}>{user.email}</td>
                    <td className={tableCellClasses}>
                      <span
                        className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : user.role === "editor"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className={`${tableCellClasses} flex space-x-2`}>
                      <Link
                        to={`http://localhost:3000/admin/users/${user.id}`}
                        className={`${actionButtonClasses} bg-blue-500 text-white hover:bg-blue-600`}
                      >
                        Edit
                      </Link>
                      <button
                        className={`${actionButtonClasses} bg-red-500 text-white hover:bg-red-600`}
                        onClick={() => deleteUser(user)}
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
