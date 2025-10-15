import { Link } from "react-router-dom";

export default function Post({ post, author }) {
  return (
    <li>
      <p><Link to={`/posts/${post.slug}`}>{post.title} - {author.name}</Link></p>
    </li>
    
  );
}
