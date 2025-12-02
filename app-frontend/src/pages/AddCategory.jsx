import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddCategory(){

  const [errors, setErrors] = useState();
    const navigate = useNavigate();
      if(!localStorage.getItem('token') && (localStorage.getItem('role') != "admin" || localStorage.getItem('role') != "editor")){ return <Navigate to="/" replace/>;}
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
          "Authorization": "Bearer " + localStorage.getItem('token'),
          "Accept": "application/json"
        },
      });

      const resData = await response.json();
      console.log(resData);
      if(response.ok)navigate('/');
      else {setErrors(Object.values(resData.ValidationError))
        console.log(errors);
      };
    }

    createCategory();
    

    }

    return <>
    {errors && errors.map(e => <p key={e} style={{color: 'red'}}>{e}</p>)}
    <form onSubmit={handleSubmit}>
        <label htmlFor="category">Категория</label>
        <input type="text" name="category" />
        <input type="submit" />
    </form></>
}