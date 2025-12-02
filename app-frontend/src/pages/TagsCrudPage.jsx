import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function TagsCrudPage() {
  const [getParams] = useSearchParams();
  const [tags, setTags] = useState([]);
  let pages = useRef();
  let page = getParams.get("page");
  useEffect(() => {
    async function fetchTags() {
      const response = await fetch(
        `http://localhost:8000/api/tags?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const resData = await response.json();
      if (response.ok) {
        pages.current = resData.last_page;
        setTags(resData.data);
      }
    }
    fetchTags();
  }, [page]);
    if(!localStorage.getItem('token') && localStorage.getItem('role') != "admin"){ return <Navigate to="/" replace/>;}
  console.log(tags);
  function deleteTag(tag) {
    async function fetchDelete() {
      const resData = await fetch(
        `http://localhost:8000/api/tags/${tag.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const response = await resData.json();
      console.log(response);
      if (resData.ok)
        setTags((prevTags) => prevTags.filter((u) => u.id != tag.id));
    }
    fetchDelete();
  }

  return (
    <>
      {tags.length == 0 && <p>Fetching tags...</p>}
      {tags.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.id}</td>
                <td>{tag.name}</td>
                <td>{tag.slug}</td>
                <td>
                  <Link to={`http://localhost:3000/admin/tags/${tag.id}`}>
                    Edit
                  </Link>
                </td>
                <td>
                  <button onClick={() => deleteTag(tag)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Paginator pages={pages.current} />
    </>
  );
}
