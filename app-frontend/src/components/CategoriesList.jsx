import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './CategoriesList.module.css'
import { UserContext } from "../store/userContext";


export default function CategoriesList()
{
    const [categories, setCategories] = useState([]);
    const userCtx = useContext(UserContext);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://127.0.0.1:8000/api/categories", {headers:{
            Accept: "application/json"
      }});
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);
    }

    fetchPosts();
  }, []);
  return (
    <div className={styles.catDiv}>
      
    <ul className={styles.categories}>
        <h3>Категории</h3>
       {(userCtx.user.role == "editor" || userCtx.user.role == "admin") && <p><Link to="/add-category" >Add category</Link></p>} 
      {categories.length !== 0 && categories.map((category) => (
       <li key={category}> <Link className={styles.catLink} to={`/category/${category.slug}`}>{category.name}</Link></li>
      ))}
      {categories.length === 0 && "Няма категории!"}
    </ul></div>
  );
}