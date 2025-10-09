import "./App.css";
import PostList from "./components/PostList";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import RootLayout from "./pages/Root";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {path:'/', element:<RootLayout/>, children:[{path:'', element:<PostList/>}, {path:'/login', element:<Login/>}]}
  
])


function App() {


  return <RouterProvider router={router}/>
}

export default App;
