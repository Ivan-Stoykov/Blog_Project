import { useContext, useRef } from "react";
import { UserContext } from "../store/userContext";

export default function AddComment({postId, setComments}){
    const userCtx = useContext(UserContext);
    const txtarea = useRef();
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const body = fd.get("body");
    const status = "published";
    const today = new Date();
    const createdAt = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const comment = { postId, body, status, authorId:userCtx.user.id, createdAt };
    console.log(comment);

    async function createPost() {
      const response = await fetch("http://localhost:8000/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userCtx.user.token,
          "Accept": "application/json"
        },
      });

      const resData = await response.json();
      console.log(resData);

      if(response.ok)
      {
        setComments(prevComments => [resData, ...prevComments])
      }

      txtarea.current.value = '';
    }

    createPost();
  }
    return <form onSubmit={handleSubmit}>
    <textarea ref={txtarea} name="body"></textarea>
    <input type="submit" />
    </form>
}
