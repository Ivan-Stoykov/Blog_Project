import { useRef, useState } from "react";

export default function AddComment({ postId, setComments }) {
  const txtarea = useRef();
  const [error, setError] = useState();
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const body = fd.get("body");
    const status = "published";
    const today = new Date();
    const createdAt =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const comment = {
      postId,
      body,
      status,
      authorId: localStorage.getItem("id"),
      createdAt,
    };
    console.log(comment);

    async function createPost() {
      const response = await fetch("http://localhost:8000/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      });

      const resData = await response.json();
      console.log(resData);

      if (response.ok) {
        setComments((prevComments) => [resData, ...prevComments]);
        setError(undefined);
        txtarea.current.value = "";
        txtarea.current.style.borderColor = "black";
      } else {
        setError(resData.message);
        txtarea.current.style.borderColor = "red";
      }
    }

    createPost();
  }
  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        ref={txtarea}
        rows={4}
        placeholder="Write your comment here..."
        name="body"
      ></textarea>
      <div className="flex justify-end mt-3">
        <input
          type="submit"
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition duration-150"
        />
      </div>
    </form>
  );
}
