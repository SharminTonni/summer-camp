import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Classes from "../Pages/Home/Classes/Classes";
import Instructors from "../Pages/Home/Instructor/Instructors";
import Dashboard from "../Pages/Dashbord/Dashbord/Dashboard";
import PrivateRoute from "./PrivateRoute";
import MyCart from "../Pages/Dashbord/MyCart/MyCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "class",
        element: <Classes></Classes>,
      },
      {
        path: "instructor",
        element: <Instructors></Instructors>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "mycart",
        element: <MyCart></MyCart>,
      },
    ],
  },
]);

export default router;
