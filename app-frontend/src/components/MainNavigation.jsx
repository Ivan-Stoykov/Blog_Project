import { Link } from "react-router-dom";
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
            <Link to={"/create-post"}>Create Post</Link>
          </li>
          {!userCtx.user.token && <><li>
            <Link to={"/login"}>Log In</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li></>}
          {userCtx.user.token && <li>
            <button onClick={userCtx.logout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
}
