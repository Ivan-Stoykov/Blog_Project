import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Paginator from "./Paginator";

export default function AddBannedWord() {
  const [getParams] = useSearchParams();
  const [words, setWords] = useState();
  let pages = useRef();
  let page = getParams.get("page");

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const word = fd.get("word");

    async function createWord() {
      const response = await fetch("http://localhost:8000/api/bannedWords", {
        method: "POST",
        body: JSON.stringify({ word }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
          "Accept": "application/json",
        },
      });

      const resData = await response.json();
      console.log(resData);
      if (response.ok) {
        setWords(prevWords => [...prevWords, resData])

      }
    }
    createWord();
  }

  useEffect(() => {
    async function fetchWords() {

      const response = await fetch(`http://localhost:8000/api/bannedWords?page=${page}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
      });
      let fetchedWords = await response.json();
      if (response.ok) {
        pages.current = fetchedWords.last_page;
        setWords(fetchedWords.data);
        console.log(fetchedWords)

      }
    }

    fetchWords();
  }, [page]);

  function handleDelete(word) {
    async function deletePost() {
      const response = await fetch(
        "http://localhost:8000/api/bannedWords/" + word.id,
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
        setWords((prevWords) => prevWords.filter((w) => w.id != word.id));
    }
    deletePost();
  }

  return (
    <div><form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="word">Banned word: </label>
        <input type="text" name="word" />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
      {!words && <p>No banned words!</p>}
      {words && <><ul>{words.map(word => <li key={word.id}>{word.word}  <button onClick={()=>handleDelete(word)}>Delete</button></li>)}</ul>
      <Paginator pages={pages.current} />
      </>
      }
    </div>
  );
}
