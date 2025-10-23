import { Link } from "react-router-dom";
import { UserContext } from "../store/userContext";
import { useContext } from "react";
// eslint-disable-next-line no-unused-vars
import styles from "./MainNavigation.module.css";
export default function MainNavigation() {
  const userCtx = useContext(UserContext);
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={"/?category=0"}>Home</Link>
          </li>
          <li>
            <Link>Categories</Link>
          </li>
          {userCtx.user.token && (
            <>
              <li>
                <Link to={"/create-post"}>Create Post</Link>
              </li>
              <li>
                <button onClick={userCtx.logout}>Logout</button>
              </li>
            </>
          )}
          {!userCtx.user.token && (
            <>
              <li>
                <Link to={"/login"}>Log In</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          )}
          <li>
            <audio controls autoPlay>
              <source
                src="https://play.global.audio/veronika128"
                type="audio/ogg"
              />
            </audio>
          </li>
        </ul>
      </nav>
    </header>
  );
}
