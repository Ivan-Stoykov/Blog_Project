export default function Comments({ comment }) {
  return (
    <>
      <h2>Comments</h2>
      <p>{comment.author}</p>
      <p>{comment.body}</p>

    </>
  );
}
