import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

export default function Post({ post, author, handleDelete }) {
  return (
    <li>
      <p><Link to={`/post/${post.slug}`}>{post.title} - {author.name}</Link></p>
      {localStorage.getItem('token') &&
                (localStorage.getItem('role') == "editor" ||
                  localStorage.getItem('role') == "admin") && (
                  <><Link to={`/edit-post/${post.id}`}>Edit</Link><DeleteButton
                    handleDelete={() => {
                      handleDelete(post);
                    }}
                  /></>
                )}
    </li>
    
  );
}
