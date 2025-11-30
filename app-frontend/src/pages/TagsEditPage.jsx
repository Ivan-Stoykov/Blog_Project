import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TagsEditPage() {
  const params = useParams();
  const [tag, setTag] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTag() {
      const response = await fetch(
        `http://localhost:8000/api/tags/${params.id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const resData = await response.json();
      console.log(resData, 'fetch');
      setTag(resData);
    }
    fetchTag();
  }, [params.id]);

  function handleEditTag(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const name = fd.get("name");
    const slug = fd.get("slug");
    console.log({ tag });

    async function editTag() {
      const response = await fetch(`http://localhost:8000/api/tags/${tag.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, slug }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const resData = await response.json();

      if (response.ok) {
        console.log(resData);
        navigate("/admin");
      }
    }

    editTag();
  }

  return (
    <>
      {!tag && <p>Fetching tag...</p>}
      {tag && (
        <form onSubmit={handleEditTag}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" defaultValue={tag.name} />
          </div>
          <div>
            <label htmlFor="slug">Slug</label>
            <input type="text" name="slug" defaultValue={tag.slug} />
          </div>
          <div>
            <input type="submit" value={"Edit"} />
          </div>
        </form>
      )}
    </>
  );
}
