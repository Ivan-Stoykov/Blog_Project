import { Link } from "react-router-dom";

export default function MainNavigation(){
    return <header>
        <nav>
            <ul><li><Link>Home</Link></li><li><Link>Categories</Link></li><li><Link to={"/login"}>Log In</Link></li></ul>
        </nav>
    </header>
}