import PostList from "../components/PostList";
import Paginator from "../components/Paginator";
import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function InquiryByCategory() {
  const [getParams] = useSearchParams();
  const [category, setCategory] = useState();
  const [posts, setPosts] = useState([]);
  let field = useRef();
  let pages = useRef();
  let page = getParams.get("page");

  useEffect(() => {
    async function fetchPosts() {
      console.log(page, "page");
      const response = await fetch(
        `http://localhost:8000/api/admin/byCategory/${category}?page=${page}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      let fetchedPosts = await response.json();
      if (response.ok) {
        pages.current = fetchedPosts.last_page;
        setPosts(fetchedPosts.data.map(post=>post.post));
        console.log(fetchedPosts.data);
      }
    }

    fetchPosts();
  }, [page, category]);
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
        <label htmlFor="category">Category: </label>
        <input type="text" name="category" ref={field} />
        <input
          type="submit"
          onClick={() => {
            setCategory(() => field.current.value);
          }}
        />
      </div>

      <PostList posts={posts} handleDelete={handleDelete} />
      <Paginator pages={pages.current} currentPage={page} />
    </>
  );
}
