import { useEffect, useRef, useState } from "react";
import CategoriesList from "../components/CategoriesList";
import Category from "../components/Category";
import { useParams, useSearchParams } from "react-router-dom";
import Paginator from "../components/Paginator";

export default function CategoryPage() {
    const [posts, setPosts] = useState([]);
    const params = useParams();
    const [getParams] = useSearchParams();
    let pages = useRef();
    let page = getParams.get("page");

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(`http://localhost:8000/api/categories/${params.slug}?page=${page}`, {
                headers: {
                    "Accept": "application/json"
                }
            });
            let fetchedPosts = await response.json();
            if (response.ok) {
                pages.current = fetchedPosts.last_page;
                setPosts(fetchedPosts.data);
                console.log(fetchedPosts);
            }

        }

        fetchPosts();
    }, [params.slug, page]);

    function handleDelete(post) {
        async function deletePost() {
            const response = await fetch(
                "http://localhost:8000/api/posts/" + post.id,
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
            if (response.ok)
                setPosts((prevPosts) => prevPosts.filter((p) => p.id != post.id));
        }
        deletePost();
    }
    return <div>
        <CategoriesList />
        <Category posts={posts} handleDelete={handleDelete} />
        <Paginator pages={pages.current} currentPage={page} />
    </div>
}