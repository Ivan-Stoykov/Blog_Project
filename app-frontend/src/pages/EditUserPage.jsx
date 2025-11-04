import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";

export default function EditUserPage(){

    const params = useParams();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchUser() {
            const resData = await fetch(`http://localhost:8000/api/users/${params.id}`);
            const user = await resData.json();
            setUser(user);
        }
        fetchUser();
    }, [params.id]);

    function handleEditUser(event)
    {
        event.preventDefault();

    const fd = new FormData(event.target);
    const name = fd.get("name");
    const email = fd.get("email");
    const role = fd.get("role");
    console.log({name, email, role})

    async function editUser() {
      const response = await fetch(`http://localhost:8000/api/users/${user.id}`, {
        method: "POST",
        body: JSON.stringify({ name, email, role }),
        headers:{
            "Content-Type":"application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
      });

      const resData = await response.json();
      console.log(resData);
      if (response.ok) navigate('/admin');
      
    }

    editUser();
    }

    return <>
    {!user && <p>Fetching user...</p>}
    {user && <form onSubmit={handleEditUser}>
        <div><label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={user.name}/></div>
        <div><label htmlFor="name">Email</label>
        <input type="email" name="email" defaultValue={user.email} /></div>
        <div><label htmlFor="name">Role</label>
        <select name="role">
            <option value="author" selected={user.role == 'author'}>author</option>
            <option value="editor" selected={user.role == 'editor'}>editor</option>
            <option value="admin" selected={user.role == 'admin'}>admin</option>
            </select></div>
        <div><input type="submit" value={"Edit"}/></div>
    </form>}
    </>
}