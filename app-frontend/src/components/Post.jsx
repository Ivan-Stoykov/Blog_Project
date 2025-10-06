export default function Post({ post, creator }) {
  return (
    <div>
      <p>{creator.name}
        <p>@{creator.username}</p>
      </p>
      <span>{post.content}</span>
    </div>
  );
}
