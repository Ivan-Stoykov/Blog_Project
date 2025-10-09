export default function Login() {
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
            "Content-Type":"application/json"
        }
      });

      const resData = await response.json();
      console.log(resData);
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
