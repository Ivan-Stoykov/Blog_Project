import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import UserContextProvider from "./store/userContext";
import CreatePost from "./pages/CreatePost";
import AddCategory from "./pages/AddCategory";
import CategoryPage from "./pages/CategoryPage";
import AdminPage from "./pages/AdminPage";
import EditUserPage from "./pages/EditUserPage";
import AddBannedWord from "./components/AddBannedWord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/post/:slug", element: <Post /> },
      { path: "/add-category", element: <AddCategory /> },
      { path: "/category/:slug", element: <CategoryPage /> },
      { path: "/users/:id", element: <EditUserPage /> },
      {
        path: "admin",
        children: [
          { path: "", element: <AdminPage /> },
          { path: "bannedWords", element: <AddBannedWord /> },
        ],
      },
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
