import { NavLink, Outlet } from "react-router-dom";
import MyCart from "../MyCart/MyCart";
import {
  FaHome,
  FaShoppingCart,
  FaUser,
  FaUserAlt,
  FaUserAltSlash,
  FaUserShield,
  FaWallet,
} from "react-icons/fa";
import { useCart } from "../../../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  //   Todo make admin by server
  const isAdmin = true;
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col mx-12 mt-12">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side bg-amber-500">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-slate-300 text-black">
          {/* Sidebar content here */}

          {isAdmin && (
            <li>
              <NavLink to="/dashboard/manageusers">
                Manage Users <FaUser></FaUser>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/dashboard/mycart">
              My Cart
              <FaShoppingCart></FaShoppingCart>
              <span className="badge">{cart?.length} </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/history">
              Payment History<FaWallet></FaWallet>
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              Home <FaHome></FaHome>
            </NavLink>
          </li>
          <li>
            <NavLink to="/class">
              Classes <FaUserShield></FaUserShield>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
