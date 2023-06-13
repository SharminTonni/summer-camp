import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../hooks/useCart";
import { useAdmin } from "../hooks/useAdmin";
import { useIsInstructor } from "../hooks/useIsInstructor";

const Navigation = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [isInstructorData] = useIsInstructor();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .then((err) => console.log(err));
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/class">Classes</Link>
      </li>
      <li>
        <Link to="/instructor">Instructors</Link>
      </li>

      {user ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          {!isAdmin && !isInstructorData && (
            <li className="">
              <Link to="/dashboard/mycart">
                <button className="flex items-center">
                  <FaShoppingCart></FaShoppingCart>
                  <div className="badge">+{cart?.length || 0}</div>
                </button>
              </Link>
            </li>
          )}

          <img src={user?.photoURL} className="w-12 h-12 rounded-full" alt="" />
          <li>
            <button onClick={handleLogOut} className="btn btn-ghost">
              LogOut
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar py-4 bg-red-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm flex flex-col items-center font-semibold text-sm dropdown-content mt-3 p-2 bg-red-200 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link to="/" className="btn normal-case text-xl">
          <img
            className="h-12 w-12"
            src="https://logowik.com/content/uploads/images/935_music.jpg"
            alt=""
          />
          Summer Music School
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      {/* <div className="navbar-end">
        <a className="btn">Button</a>
      </div> */}
    </div>
  );
};

export default Navigation;
