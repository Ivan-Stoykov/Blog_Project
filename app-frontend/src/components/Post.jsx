import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

export default function Post({ post, author, handleDelete }) {
  return (
    <article className="group cursor-pointer">
      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
        <Link to={`/post/${post.slug}`}>
        <img
          src={post.media.length > 0 ? `http://localhost:8000/api/${post.media[0].filePath}` : "http://localhost:8000/api/image/default_img.png"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        /></Link>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <span
            className="px-2.5 py-0.5 rounded-full text-white text-xs font-medium bg-violet-600"
          >{post.category}  </span>
        </div>
        <Link to={`/post/${post.slug}`} className="text-xl font-serif font-bold text-neutral-900 leading-tight group-hover:text-neutral-700 transition-colors">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 pt-1">
          <div className="text-sm">
            <p className="font-medium text-neutral-900">{author.name}</p>
            <p className="text-neutral-500">{formatDate(post.publishedAt)}</p>
          </div>
        </div>
      </div>
      {localStorage.getItem("token") &&
        (localStorage.getItem("role") == "editor" ||
          localStorage.getItem("role") == "admin") && (
          <>
            <Link to={`/edit-post/${post.id}`}>Edit</Link>
            <DeleteButton
              handleDelete={() => {
                handleDelete(post);
              }}
            />
          </>
        )}
    </article>
  );
}
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
