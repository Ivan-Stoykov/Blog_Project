import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function EditUserPage(){

    const params = useParams();
    const [user, setUser] = useState();

    useEffect(()=>{
        async function fetchUser() {
            const resData = await fetch(`http://localhost:8000/api/users/${params.id}`);
            const user = await resData.json();
            setUser(user);
        }
        fetchUser();
    }, [params.id])

    return <>
    {!user && <p>Fetching user...</p>}
    {user && <form action="">
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