export default function Comments({ comment }) {
  return (
    <>
      <p>{comment.author.name} - {comment.createdAt}</p>
      <p>{comment.body}</p>

    </>
  );
}
