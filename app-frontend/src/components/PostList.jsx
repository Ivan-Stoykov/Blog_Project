import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import styles from "./PostList.module.css";
import { UserContext } from "../store/userContext";
import DeleteButton from "./DeleteButton";
import { useSearchParams } from "react-router-dom";
export default function PostList() {
  const userCtx = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams(); // useSearchParams
  let cat = 0;
  console.log(searchParams.get("category"), "cat");
  if (searchParams.get("category")) cat = searchParams.get("category");

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8000/api/posts");
      let fetchedPosts = await response.json();
      if ( cat !== '0' && cat !== null) {
        fetchedPosts = fetchedPosts.filter(
          (p) => p.post_categories.categoryId == cat
        );
      }
      setPosts(fetchedPosts);
      console.log(fetchedPosts);
    }

    fetchPosts();
  }, [cat]);

  function handleDelete(post) {
    async function deletePost() {
      const response = await fetch(
        "http://localhost:8000/api/posts/" + post.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userCtx.user.token,
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
    <div className={styles.postDiv}>
      <ul className={styles.posts}>
        <h3>Последни публикации</h3>
        {posts.length !== 0 &&
          posts.map((post) => (
            <>
              <Post
                className={styles.postLink}
                key={post.content}
                post={post}
                author={post.author}
                comments={post.comments}
              />
              {userCtx.user.token &&
                (userCtx.user.role == "editor" ||
                  userCtx.user.role == "admin") && (
                  <DeleteButton
                    handleDelete={() => {
                      handleDelete(post.post);
                    }}
                  />
                )}
            </>
          ))}
        {posts.length === 0 && "No posts!"}
      </ul>
    </div>
  );
}
