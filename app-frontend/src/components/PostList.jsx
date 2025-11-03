import { useEffect, useState } from "react";
import Post from "./Post";
import styles from "./PostList.module.css";
import DeleteButton from "./DeleteButton";
export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8000/api/posts" ,{headers:{
            "Accept": "application/json"
      }});
      let fetchedPosts = await response.json();
      setPosts(fetchedPosts);
      console.log(fetchedPosts);
    }

    fetchPosts();
  }, []);

  function handleDelete(post) {
    async function deletePost() {
      console.log(post);
      const response = await fetch(
        "http://localhost:8000/api/posts/" + post.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
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
                key={post.content}
                post={post}
                author={post.author}
                comments={post.comments}
              />
              {localStorage.getItem('token') &&
                (localStorage.getItem('role') == "editor" ||
                  localStorage.getItem('role') == "admin") && (
                  <DeleteButton
                    handleDelete={() => {
                      handleDelete(post);
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
