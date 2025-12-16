import { useEffect, useRef, useState } from "react";
import CategoriesList from "../components/CategoriesList";
import PostList from "../components/PostList";
import Paginator from "../components/Paginator";
import { useSearchParams } from "react-router-dom";
import SearchByTag from "../components/SearchByTag";

export default function Home() {
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
            Accept: "application/json",
          },
        }
      );
      let fetchedPosts = await response.json();
      if (response.ok) {
        pages.current = fetchedPosts.last_page;
        setPosts(fetchedPosts.data);
      }
    }

    fetchPosts();
  }, [page]);

  function handleDelete(post) {
    async function deletePost() {
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
      //const resData = await response.json();
      if (response.ok)
        setPosts((prevPosts) => prevPosts.filter((p) => p.id != post.id));
    }
    deletePost();
  }
  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-12">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-neutral-900">
            Последни публикации
          </h2>
        </div>
        <PostList posts={posts} handleDelete={handleDelete} />
        {posts && posts.length > 0 && (
          <Paginator pages={pages.current} currentPage={page} />
        )}
      </div>
      <aside className="lg:sticky lg:top-6 h-fit">
        <SearchByTag/>
        <CategoriesList />
      </aside>
    </div>
  );
}
