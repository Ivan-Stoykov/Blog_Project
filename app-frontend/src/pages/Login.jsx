import { useContext, useState } from "react";
import { UserContext } from "../store/userContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const userCtx = useContext(UserContext);
  const [errors, setErrors] = useState();
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const resData = await response.json();
      if (response.ok && resData.token) {
        userCtx.login(resData);
        return navigate("/");
      } else {
        setErrors(Object.values(resData.ValidationError));
        console.log(errors);
      }
    }

    login();
  }

  return (
    <div className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md bg-white p-8 shadow-xl rounded-xl">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 border-b pb-4 text-center">
        Sign In
      </h1>
      {errors &&
        errors.map((e) => (
          <p key={e} style={{ color: "red" }}>
            {e}
          </p>
        ))}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input type="email" name="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 mt-1" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input type="password" name="password" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 mt-1" />
        </div>
        <div>
          <input type="submit" value="Log in" className="w-full flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-150" />
        </div>
      </form>
    </div>
    </div>
  );
}
