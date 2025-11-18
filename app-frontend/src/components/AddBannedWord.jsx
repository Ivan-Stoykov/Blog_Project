export default function AddBannedWord() {
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const word = fd.get("word");

    async function createCategory() {
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
    }
    createCategory();
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="word">Banned word: </label>
        <input type="text" name="word" />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
}
