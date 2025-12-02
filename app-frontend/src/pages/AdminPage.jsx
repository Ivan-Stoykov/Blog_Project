import { useState } from "react";
import UsersCrudPage from "./UsersCrudPage";
import PostsCrudPage from "./PostsCrudPage";
import TagsCrudPage from "./TagsCrudPage";
import { Navigate } from "react-router-dom";

export default function AdminPage()
{
    const [content, setContent] = useState(<p>Choose menu</p>);
      if(!localStorage.getItem('token') && localStorage.getItem('role') != "admin"){ return <Navigate to="/" replace/>;}
    return <>
    <div>
        <ul>
            <li><button onClick={()=>{ setContent(<UsersCrudPage/>) }}>Users</button></li>
            <li><button onClick={()=>{ setContent(<PostsCrudPage/>) }}>Posts</button></li>
            <li><button onClick={()=>{ setContent(<TagsCrudPage/>) }}>Tags</button></li>
        </ul>
    </div>
    <div>{content}</div>
    </>
}