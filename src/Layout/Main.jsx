import { Outlet } from "react-router-dom";
import Navigation from "../Shared/Navigation";
import Footer from "../Shared/Footer";
import { useEffect, useState } from "react";

const Main = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="dark:bg-black">
      <button
        onClick={handleTheme}
        className="btn text-center dark:text-black mb-5 lg:ml-40 mt-10 text-white btn-ghost h-10 dark:bg-white bg-black "
      >
        Switch to Dark Mode
      </button>
      <Navigation></Navigation>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
