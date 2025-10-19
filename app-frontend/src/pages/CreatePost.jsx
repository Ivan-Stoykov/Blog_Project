import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/userContext";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://127.0.0.1:8000/api/categories");
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);
    }

    fetchCategories();
  }, []);

  console.log(categories)
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const title = fd.get("title");
    const content = fd.get("content");
    const status = "draft";
    const slug = title.replace(/[^a-zA-Z0-9 ]/g, '').replace(' ', '-');
    const today = new Date();
    const categoryId = fd.get('categoryId');
    const publishedAt = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const image = fd.get('image');
    const post = { title, slug, content, status, author:userCtx.user, publishedAt, categoryId, image };
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
      navigate('/');
    }

    createPost();
    
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
        <label htmlFor="image">Image:</label>
        <input type="file" name="image" />
      </div>
      <div>
        <label htmlFor="categoryId">Category</label>
        <select name="categoryId">{categories.length !== 0 && categories.map((category) => (
       <option key={category} value={category.id}>{category.name}</option>
      ))}</select>
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
}
