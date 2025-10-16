import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import { UserContext } from "../store/userContext";

export default function Post() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const params = useParams();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    async function fetchPost() {
      let response = await fetch(
        `http://localhost:8000/api/posts/${params.slug}`
      );

      const post = await response.json();

      setPost(post);
      response = await fetch(
        `http://localhost:8000/api/comments/${post.id}`
      );

      const comments = await response.json();

      setComments(comments);
      console.log(post);
      
    }
    fetchPost();
    
  }, [params.slug]);

  return (
    <>
      {!post && <p>Loading</p>}
      {post && <div>
        <h1>{post.title}</h1>
        <h3>Author: {post.author.name}</h3>
        <span>{post.content}</span>
        <h2>Comments</h2>
        {comments.length > 0 && comments.map((comment)=>(<Comments key={comment.body} comment={comment}/>))}
              {userCtx.user.token && <AddComment postId = {post.id} setComments={setComments}  />}
        </div>}
        {comments.length == 0 && <p>No comments!</p>}
    </>
  );
}
