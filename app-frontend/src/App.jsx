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
import EditUserPage from "./pages/EditUserPage";
import AddBannedWord from "./pages/AddBannedWordsPage";
import InquiryByAuthor from "./pages/InquiryByAuthor";
import InquiryByTag from "./pages/InquiryByTag";
import InquiryByPeriod from "./pages/InquiryByPeriod";
import InquiryByCategory from "./pages/InquiryByCategory";
import DraftsPage from "./pages/DraftsPage";
import EditPostPage from "./pages/EditPostPage";
import AdminPage from "./pages/AdminPage";
import TagsEditPage from "./pages/TagsEditPage";
import EditCategory from "./pages/EditCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "create-post", element: <CreatePost /> },
      { path: "post/:slug", element: <Post /> },
      { path: "category/:slug", element: <CategoryPage /> },
      { path: "drafts", element: <DraftsPage /> },
      { path: "edit-post/:id", element: <EditPostPage /> },
      {
        path: "admin",
        children: [
          { path: "", element: <AdminPage /> },
          { path: "users/:id", element: <EditUserPage /> },
          { path: "categories/:id", element: <EditCategory /> },
          { path: "posts/:id", element: <EditPostPage /> },
          { path: "tags/:id", element: <TagsEditPage /> },
          { path: "create-category", element: <AddCategory /> },
          { path: "create-bannedWord", element: <AddBannedWord /> },
          { path: "inquiryByAuthor", element: <InquiryByAuthor /> },
          { path: "inquiryByCategory", element: <InquiryByCategory/> },
          { path: "inquiryByTag", element: <InquiryByTag /> },
          { path: "inquiryByPeriod", element: <InquiryByPeriod /> },
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
