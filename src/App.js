import Home from "./pages/Home/Home";
import EditTask from './pages/edit-task/Edit-task';
import './Components/main.css';
import About from "./pages/About";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/Error404";
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//levl2 
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit-task/:id",
    element: <EditTask/>,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
