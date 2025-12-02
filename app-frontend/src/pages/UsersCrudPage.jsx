import { useEffect, useRef, useState } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function UsersCrudPage(){
    const [getParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    let pages = useRef();
    let page = getParams.get("page");
    useEffect(()=>{
        async function fetchUsers() {
            const response = await fetch(`http://localhost:8000/api/users?page=${page}`, {
                headers:
                {
                    "Content-Type":"application/json",
                    "Accept": "application/json"
                }
            });

            const users = await response.json();
            if(response.ok)
                {
                    pages.current = users.last_page;
                    setUsers(users.data);
                }
            

        }
        fetchUsers();
    }, [page]);
  if(!localStorage.getItem('token') && localStorage.getItem('role') != "admin"){ return <Navigate to="/" replace/>;}
    function deleteUser(user)
    {
        async function fetchDelete() {
            const resData = await fetch(`http://localhost:8000/api/users/${user.id}`,
                {
                    method:"DELETE",
                    headers:
                    {
                        "Accept":"application/json",
                        Authorization: "Bearer " + localStorage.getItem('token'),
                    }
                }
            );
            const response = await resData.json();
            console.log(response);
        if (resData.ok)
            setUsers((prevUsers) => prevUsers.filter((u) => u.id != user.id));

        }
        fetchDelete();
    }

    return <>
    {users.length == 0 && <p>Fetching users...</p>}
    {users.length > 0 && <table>
        <thead><tr><th>Id</th><th>Name</th><th>email</th><th>role</th><th>Edit</th></tr></thead>
        <tbody>{users.map(user=><tr key={user.id}><td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
        <td><Link to={`http://localhost:3000/admin/users/${user.id}`}>Edit</Link></td><td><button onClick={()=>deleteUser(user)}>Delete</button></td></tr>)}</tbody>
    </table>}
    <Paginator pages={pages.current}/>
        </>
}