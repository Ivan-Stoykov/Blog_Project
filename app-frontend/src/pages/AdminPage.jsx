import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function AdminPage(){
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        async function fetchUsers() {
            const resData = await fetch('http://localhost:8000/api/users', {
                headers:
                {
                    "Content-Type":"application/json",
                    "Accept": "application/json"
                }
            });

            const users = await resData.json();
            setUsers(users);

        }
        fetchUsers();
    }, []);

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
            const usersLeft = await resData.json();
            setUsers(usersLeft);
        }
        fetchDelete();
    }

    return <>
    {users.length == 0 && <p>Fetching users...</p>}
    {users.length > 0 && <table>
        <thead><tr><th>Id</th><th>Name</th><th>email</th><th>role</th><th>Edit</th></tr></thead>
        <tbody>{users.map(user=><tr key={user.id}><td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
        <td><Link to={`http://localhost:3000/users/${user.id}`}>Edit</Link></td><td><button onClick={()=>deleteUser(user)}>Delete</button></td></tr>)}</tbody>
    </table>}
        </>
}