import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function PostsCrudPage() {
  const [getParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  let pages = useRef();
  let page = getParams.get("page");
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        `http://localhost:8000/api/posts?page=${page}`,
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
        setPosts(resData.data);
      }
    }
    fetchPosts();
  }, [page]);
  console.log(posts);
  function deletePost(post) {
    async function fetchDelete() {
      const resData = await fetch(
        `http://localhost:8000/api/posts/${post.id}`,
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
        setPosts((prevPosts) => prevPosts.filter((u) => u.id != post.id));
    }
    fetchDelete();
  }

  return (
    <>
      {posts.length == 0 && <p>Fetching posts...</p>}
      {posts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Content</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Author</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.slug}</td>
                <td>{post.status}</td>
                <td>{post.author.name}</td>
                <td>
                  <Link to={`http://localhost:3000/admin/posts/${post.id}`}>
                    Edit
                  </Link>
                </td>
                <td>
                  <button onClick={() => deletePost(post)}>Delete</button>
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
