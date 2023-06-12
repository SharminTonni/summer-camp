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
import ClassesPage from "../Pages/Home/ClassesPage/ClassesPage";
import ManageUsers from "../Pages/Dashbord/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import AddClass from "../Pages/Dashbord/AddClass/AddClass";
import InstructorRoute from "./InstructorRoute";
import MyClasses from "../Pages/Dashbord/MyClasses/MyClasses";
import ManageClass from "../Pages/Dashbord/ManageClass/ManageClass";
import Feedback from "../Pages/Dashbord/FeedBack/Feedback";
import Payment from "../Pages/Dashbord/Payment/Payment";
import FeedBackPage from "../Pages/Dashbord/FeedBack/FeedBackPage";
import ErrorPage from "../Pages/ErrorElement/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: <ClassesPage></ClassesPage>,
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
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "addclass",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "myclass",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "feedback",
        element: (
          <InstructorRoute>
            <FeedBackPage></FeedBackPage>
          </InstructorRoute>
        ),
      },
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageclass",
        element: (
          <AdminRoute>
            <ManageClass></ManageClass>
          </AdminRoute>
        ),
      },
      {
        path: "feedback/:id",
        element: (
          <AdminRoute>
            <Feedback></Feedback>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
