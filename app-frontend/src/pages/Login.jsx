import { useContext } from "react";
import { UserContext } from "../store/userContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const email = fd.get("email");
    const password = fd.get("password");

    async function login() {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers:{
            "Content-Type":"application/json",
            "Accept": "application/json"
        }
      });

      const user = await response.json();
      if(user.token){userCtx.login(user);
      return navigate('/');}
    }

    login();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><label htmlFor="email">Email:</label><input type="email" name="email" required /></div>
      <div><label htmlFor="password">Password:</label><input type="password" name="password" required /></div>
      <div><input type="submit" /></div>
    </form>
  );
}
