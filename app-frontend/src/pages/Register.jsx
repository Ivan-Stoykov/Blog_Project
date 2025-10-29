import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const name = fd.get("name");
    const email = fd.get("email");
    const password = fd.get("password");
    const role = "editor";

    async function register() {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
        headers:{
            "Content-Type":"application/json",
            "Accept": "application/json"
        }
      });

      const resData = await response.json();
      console.log(resData);
      if(response.ok)
        navigate('/login');
    }

    register();
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><label htmlFor="name">Name:</label><input type="text" name="name" required /></div>
      <div><label htmlFor="email">Email:</label><input type="email" name="email" required /></div>
      <div><label htmlFor="password">Password:</label><input type="password" name="password" required /></div>
      <div><input type="submit" /></div>
    </form>
  );
}
