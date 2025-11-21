import { useEffect, useRef, useState } from "react";
import PostList from "../components/PostList";
import { useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function InquiryByAuthor() {
  const [getParams] = useSearchParams();
  const [author, setAuthor] = useState();
  const [posts, setPosts] = useState([]);
  let field = useRef();
  let pages = useRef();
  let page = getParams.get("page");

  useEffect(() => {
    async function fetchPosts() {
      console.log(page, "page");
      console.log(author, "author");
      const response = await fetch(
        `http://localhost:8000/api/admin/byAuthor/${author}?page=${page}`,
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
  }, [page, author]);
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
        <label htmlFor="author">Author: </label>
        <input type="text" name="author" ref={field} />
        <input
          type="submit"
          onClick={() => {
            setAuthor(() => field.current.value);
          }}
        />
      </div>

      <PostList posts={posts} handleDelete={handleDelete} />
      <Paginator pages={pages.current} />
    </>
  );
}
