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
  if(!localStorage.getItem('token') && localStorage.getItem('role') != "admin"){ return <Navigate to="/" replace/>;}
  function handleEditUser(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const name = fd.get("name");
    const email = fd.get("email");
    const role = fd.get("role");
    console.log({ name, email, role });

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
      console.log(resData);
      if (response.ok) navigate("/admin");
      else {setErrors(Object.values(resData.ValidationError))
        console.log(errors);
      };
    }

    editUser();
  }

  return (
    <>
      {!user && <p>Fetching user...</p>}
      {user && (
        <>
        {errors && errors.map(e => <p key={e} style={{color: 'red'}}>{e}</p>)}
        <form onSubmit={handleEditUser}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" defaultValue={user.name} />
          </div>
          <div>
            <label htmlFor="name">Email</label>
            <input type="email" name="email" defaultValue={user.email} />
          </div>
          <div>
            <label htmlFor="name">Role</label>
            <select name="role" defaultValue={user.role}>
              <option value="author">author</option>
              <option value="editor">editor</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div>
            <input type="submit" value={"Edit"} />
          </div>
        </form>
        </>
      )}
    </>
  );
}
