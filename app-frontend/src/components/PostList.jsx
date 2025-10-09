import { useEffect, useState } from "react";

export default function PostList()
{
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://127.0.0.1:8000/api/posts");
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    }

    fetchPosts();
  }, [setPosts]);
  console.log(posts);
  return (
    <>
      {posts.length !== 0 && posts.map((post) => (
        <Post key={post.content} post={post} creator={post.creator} />
      ))}
      {posts.length === 0 && "No posts!"}
    </>
  );
}