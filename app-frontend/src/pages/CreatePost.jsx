import { useContext } from "react";
import { UserContext } from "../store/userContext";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const title = fd.get("title");
    const content = fd.get("content");
    const status = "draft";
    const slug = title.replace(/[^a-zA-Z0-9 ]/g, '').replace(' ', '-');
    const today = new Date();
    const publishedAt = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const post = { title, slug, content, status, author:userCtx.user, publishedAt };
    console.log(post);

    async function createPost() {
      const response = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userCtx.user.token
        },
      });

      const resData = await response.json();
      console.log(resData);
    }

    createPost();
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" required />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea name="content" required></textarea>
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
}
