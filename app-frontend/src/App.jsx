import "./App.css";
import Post from "./components/Post";

function App() {
  const users = [
    { username: "Pesho04", name: "Pesho" },
    { username: "TheGOAT", name: "Ivan" },
  ];
  const posts = [
    { creator: users[0], content: "I am the goat!" },
    { creator: users[1], content: "No i am!" }
  ];
  return (
    <>
      {posts.map(post=><Post key={post.content} post={post} creator={post.creator}/>)}
    </>
  );
}

export default App;
