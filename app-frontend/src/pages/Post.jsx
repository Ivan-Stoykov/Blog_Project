import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import DeleteButton from "../components/DeleteButton";

export default function Post() {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const params = useParams();
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

  function handleDelete(comment) {
    async function deletePost() {
      const response = await fetch(
        "http://localhost:8000/api/comments/" + comment.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
            "Accept": "application/json"
          },
        }
      );
      const resData = await response.json();
      console.log(resData);
      if(response.ok) setComments(prevComments => prevComments.filter(c => c.id != comment.id));
    }
    deletePost();
  }

  return (
    <>
      {!post && <p>Loading</p>}
      {post && <div>
        <h1>{post.title}</h1>
        <h3>Author: {post.author.name}</h3>
        {post.media.length > 0 && post.media.map(file=><div><img src={`http://localhost:8000/api/${file.filePath}`} width="500px" height="500px"></img></div>)}
        <span>{post.content}</span>
        <h2>Comments</h2>
              {localStorage.getItem('token') && <AddComment postId = {post.id} setComments={setComments}  />}
        {comments.length > 0 && comments.map((comment)=>(<><Comments key={comment.body} comment={comment}/>
        {(localStorage.getItem('token') && (localStorage.getItem('role') == "editor" || localStorage.getItem('admin') == "admin")) && <DeleteButton handleDelete={()=>handleDelete(comment)}/>}</>))}
        </div>}
        {comments.length == 0 && <p>No comments!</p>}
    </>
  );
}
