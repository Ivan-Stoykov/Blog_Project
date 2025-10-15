import { useEffect, useState } from "react";
import Post from "./Post";
import styles from './PostList.module.css'
export default function PostList()
{
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8000/api/posts");
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    }

    fetchPosts();
  }, []);
  return (
    <div className={styles.postDiv}>
    <ul className={styles.posts}>
      <h3>Последни публикации</h3>
      {posts.length !== 0 && posts.map((post) => (
        <Post className={styles.postLink} key={post.content} post={post} author={post.author} comments={post.comments} />
      ))}
      {posts.length === 0 && "No posts!"}
    </ul></div>
  );
}