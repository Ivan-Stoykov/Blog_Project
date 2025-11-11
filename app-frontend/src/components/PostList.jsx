import Post from "./Post";
import styles from "./PostList.module.css";
export default function PostList({posts, handleDelete}) {
  
  return (
    <div className={styles.postDiv}>
      <ul className={styles.posts}>
        <h3>Последни публикации</h3>
        {posts.length !== 0 &&
          posts.map((post) => (
              <Post
                className={styles.postLink}
                key={post.id}
                post={post}
                author={post.author}
                comments={post.comments}
                handleDelete={handleDelete}
              />
          ))}
        {posts.length === 0 && "No posts!"}
      </ul>
    </div>
  );
}
