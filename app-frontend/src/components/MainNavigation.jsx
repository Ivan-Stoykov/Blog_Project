import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import { UserContext } from "../store/userContext";
import { useContext } from "react";
export default function MainNavigation() {
    const userCtx = useContext(UserContext);
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>Categories</Link>
          </li>
          <li>
            <Link to={"/login"}>Log In</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          <li>
            <Link to={"/create-post"}>Create Post</Link>
          </li>
          <li>
            <LogOutButton logout={userCtx.logout}/>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}
