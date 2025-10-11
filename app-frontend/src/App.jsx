import "./App.css";
import PostList from "./components/PostList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContextProvider from "./store/userContext";
import CreatePost from "./pages/CreatePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <PostList /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/create-post", element: <CreatePost /> },
    ],
  },
]);

function App() {
  return <UserContextProvider><RouterProvider router={router} /></UserContextProvider>;
}

export default App;
