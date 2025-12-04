import { useEffect, useRef, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import PostList from "../components/PostList";
import Paginator from "../components/Paginator";

export default function InquiryByTag() {
  const [getParams] = useSearchParams();
  const [tag, setTag] = useState();
  const [posts, setPosts] = useState([]);
  let field = useRef();
  let pages = useRef();
  let page = getParams.get("page");

  useEffect(() => {
    async function fetchPosts() {
      console.log(page, "page");
      const response = await fetch(
        `http://localhost:8000/api/admin/byTag/${tag}?page=${page}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      let fetchedPosts = await response.json();
      if (response.ok) {
        pages.current = fetchedPosts.last_page;
        setPosts(fetchedPosts.data);
        console.log(fetchedPosts);
      }
    }

    fetchPosts();
  }, [page, tag]);
    if(!localStorage.getItem('token') && localStorage.getItem('role') != "admin"){ return <Navigate to="/" replace/>;}
  function handleDelete(post) {
    async function deletePost() {
      console.log(post);
      const response = await fetch(
        "http://localhost:8000/api/posts/" + post.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      );
      const resData = await response.json();
      console.log(resData);
      if (response.ok)
        setPosts((prevPosts) => prevPosts.filter((p) => p.id != post.id));
    }
    deletePost();
  }
  return (
    <>
      <div>
        <label htmlFor="tag">Tag: </label>
        <input type="text" name="tag" ref={field} />
        <input
          type="submit"
          onClick={() => {
            setTag(() => field.current.value);
          }}
        />
      </div>
      <PostList posts={posts} handleDelete={handleDelete} />
      <Paginator pages={pages.current} currentPage={page} />
    </>
  );
}
