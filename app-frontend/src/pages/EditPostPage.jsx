import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPostPage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState();

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://127.0.0.1:8000/api/categories");
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);
    }
    async function fetchPost() {
        const response = await fetch(`http://localhost:8000/api/post/${id}`,{
            headers:{
                "Accept":"Application/json",
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
        });
        const fetchedPost = await response.json();
        setPost(fetchedPost);
    }
    fetchCategories();
    fetchPost();
    
  }, [id]);

  console.log('categories', categories)
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const title = fd.get("title");
    // const content = fd.get("content");
    // const status = "draft";
    // const slug = title.replace(/[^a-zA-Z0-9 ]/g, '').replace(' ', '-');
     const today = new Date();
    // const categoryId = fd.get('categoryId');
     const publishedAt = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    // const image = fd.get('image');
    // const post = { title, slug, content, status, author:userCtx.user, publishedAt, categoryId, image };
    fd.append('slug', title.replace(/[^a-zA-Z0-9 ]/g, '').replace(' ', '-'));
    fd.append('publishedAt', publishedAt);
    fd.append('authorId', localStorage.getItem('id'));
    const tags = JSON.stringify(fd.get('tags').split(","));
    fd.set('tags', tags);
    console.log(fd.get('tags'))

    async function createPost() {
      const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "PATCH",
        body: fd,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token'),
          "Accept": "application/json"
        },
      });

      const resData = await response.json();
      console.log('resData', resData);
      navigate('/');
    }

    createPost();
    
  }
console.log("post", post);
  return (
    <>
    {!post && <p>Loading...</p>}
    {post && <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" required defaultValue={post.title} />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea name="content" required defaultValue={post.content}></textarea>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" name="image" multiple/>
      </div>
      <div>
        <label htmlFor="categoryId">Category</label>
        <select name="categoryId">{categories.length !== 0 && categories.map((category) => (
       <option key={category} value={category.id}>{category.name}</option>
      ))}</select>
      </div>
      <div>
        <label htmlFor="tags">Tags</label>
        <input type="text" name="tags" />
      </div>
      <div>
        <label htmlFor="status">Save as</label>
        <select name="status">
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>}
    </>
  );
}
