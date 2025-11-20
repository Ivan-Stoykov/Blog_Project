import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../store/userContext";
import { useContext } from "react";
import styles from "./MainNavigation.module.css";
export default function MainNavigation() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {localStorage.getItem('token') && (
            <>
              <li>
                <Link to={"/create-post"}>Create Post</Link>
              </li>
              <li>
                <button onClick={()=>{
                  userCtx.logout();
                  navigate('/');
                  }}>Logout</button>
              </li>
            </>
          )}
          {!localStorage.getItem('token') && (
            <>
              <li>
                <Link to={"/login"}>Log In</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          )}
          {localStorage.getItem('role') == 'admin' && <div className={styles.dropdown}>
            <li><Link to={"/admin"}>Admin</Link></li>
            <div className={styles.dropdownContent}>
              <Link to={"/admin/bannedWords"}>Banned Words</Link>
              <Link to={"/admin/inquiryByAuthor"}>Spravka Avtor</Link>
              <Link to={"/admin/inquiryByCategory"}>Spravka Kategoriq</Link>
              <Link to={"/admin/inquiryByTag"}>Spravka Tag</Link>
              <Link to={"/admin/inquiryByPeriod"}>Spravka Period</Link>
            </div>
            </div>}
          <li>
            <audio controls /*autoPlay*/>
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
