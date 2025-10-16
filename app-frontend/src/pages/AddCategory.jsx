import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/userContext";

export default function AddCategory(){

    const navigate = useNavigate();
    const userCtx = useContext(UserContext);
    function handleSubmit(event)
    {
        event.preventDefault();

        const fd = new FormData(event.target);
        const category = fd.get('category');
        const slug = category.replace(" ", "-");

        async function createCategory() {
        const response = await fetch("http://localhost:8000/api/categories", {
        method: "POST",
        body: JSON.stringify({name:category, slug}),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userCtx.user.token
        },
      });

      const resData = await response.json();
      console.log(resData);
      navigate('/');
    }

    createCategory();
    

    }

    return <form onSubmit={handleSubmit}>
        <label htmlFor="category">Категория</label>
        <input type="text" name="category" />
        <input type="submit" />
    </form>
}