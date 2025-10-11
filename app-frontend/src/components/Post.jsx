import AddComment from "./AddComment";
import Comments from "./Comments"

export default function Post({ post, author, comments }) {
  return (
    <div>
      <p>{author.name}
      </p>
      <span>{post.content}</span>
      {comments.map((comment)=>(<Comments comment={comment}/>))}
      <AddComment/>
    </div>
    
  );
}
