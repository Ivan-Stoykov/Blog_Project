import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function CategoriesList()
{
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://127.0.0.1:8000/api/categories", {headers:{
            "Accept": "application/json"
      }});
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);
    }

    fetchPosts();
  }, []);
  return (
    <div className="bg-neutral-50 rounded-lg p-6">
      
        <h3 className="text-lg font-serif font-bold text-neutral-900 mb-4">Категории</h3>
    <div className="space-y-2">
       {(localStorage.getItem('role') == "editor" || localStorage.getItem('role') == "admin") && <Link to="/add-category" className={`w-full text-left px-4 py-2.5 rounded-md transition-colors`}><span className="font-medium">Add category</span></Link>} 
      <div className="flex items-center justify-between">{categories.length !== 0 && categories.map((category) => (
        <Link key={category.id} className={`w-full text-left px-4 py-2.5 rounded-md transition-colors`} to={`/category/${category.slug}`}><span className="font-medium">{category.name}</span></Link>
      ))}</div>
      {categories.length === 0 && <span className="flex items-center justify-between font-medium">Няма категории!</span>}
    </div></div>
  );
}