import { useEffect, useRef, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import PostList from "../components/PostList";
import Paginator from "../components/Paginator";

export default function InquiryByPeriod() {
  const [getParams] = useSearchParams();
  const [period, setPeriod] = useState("|");
  const [posts, setPosts] = useState([]);
  let field1 = useRef();
  let field2 = useRef();
  let pages = useRef();
  let page = getParams.get("page");

  useEffect(() => {
    async function fetchPosts() {
      console.log(page, "page");
      console.log(period, "period");
      const response = await fetch(
        `http://localhost:8000/api/admin/byPeriod/${period}?page=${page||1}`,
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
        console.log(fetchedPosts.data);
      }
    }

    fetchPosts();
  }, [page, period]);
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
        <label htmlFor="period">Period: </label>
        <input type="date" name="period" ref={field1}/>
        <input type="date" name="period" ref={field2}/>
        <input type="submit"onClick={()=>{setPeriod(field1.current.value + "|" + field2.current.value)}} />
      </div>
      <PostList posts={posts} handleDelete={handleDelete} />
      <Paginator pages={pages.current} />
    </>
  );
}
