import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import UserContextProvider from "./store/userContext";
import CreatePost from "./pages/CreatePost";
import AddCategory from "./pages/AddCategory"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/posts/:slug", element:<Post/> },
      { path: "/add-category", element:<AddCategory/> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
