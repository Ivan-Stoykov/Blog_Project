import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import styles from "./PostList.module.css";
import { UserContext } from "../store/userContext";
import DeleteButton from "./DeleteButton";
import { useParams } from "react-router-dom";
export default function PostList() {
  const userCtx = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const params = useParams(); // useSearchParams

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8000/api/categories/"+ params.slug);
      let fetchedPosts = await response.json();
      setPosts(fetchedPosts);
      console.log(fetchedPosts);
    }

    fetchPosts();
  }, [params.slug]);

  function handleDelete(post) {
    async function deletePost() {
      const response = await fetch(
        "http://localhost:8000/api/posts/" + post.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userCtx.user.token,
            "Accept": "application/json"
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
                key={post.post.content}
                post={post.post}
                author={post.post.author}
                comments={post.post.comments}
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
