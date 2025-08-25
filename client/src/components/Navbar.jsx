import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLogin, isAdmin } = useAuth();
  const [navBg, setNavBg] = useState(false);
  const location = useLocation().pathname;

  const [theme, setTheme] = useState(
    sessionStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  const NavBarDesign = () => {
    location === "/" || location === "/login" || location === "/register"
      ? setNavBg(false)
      : setNavBg(true);
  };

  const handleClick = () => {
    isAdmin ? navigate("/adminpanel") : navigate("/CustomerDashboard");
  };

  useEffect(() => {
    NavBarDesign();
  }, [location]);

  return (
    <nav className={` bg-gradient-to-tl from-primary to-accent shadow-lg w-full fixed top-0 z-50`}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 transform hover:scale-105 transition duration-300">
              <FaHeart className="text-3xl text-primary animate-pulse" />
              <div className="text-center">
                <h1 className="text-xl font-bold text-primary-content font-serif">Two Souls</h1>
                <p className="text-sm text-primary-content/80 font-serif">One Promise</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-8">
              <li>
                <Link
                  to="/about"
                  className={`${navBg ? "text-base-content" : "text-primary-content"} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition duration-300`}
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  to="/stories"
                  className={`${navBg ? "text-base-content" : "text-primary-content"} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition duration-300`}
                >
                  LOVE STORIES
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className={`${navBg ? "text-base-content" : "text-primary-content"} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition duration-300`}
                >
                  OUR SERVICES
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className={`${navBg ? "text-base-content" : "text-primary-content"} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition duration-300`}
                >
                  MEMORIES
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`${navBg ? "text-base-content" : "text-primary-content"} hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition duration-300`}
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>

          <div className="ml-4 flex items-center md:ml-6 space-x-4">
            {isLogin ? (
              <button
                onClick={handleClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-primary-content px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-1000"
              >
                <img
                  src={user?.photo}
                  alt="User Dp"
                  className="h-10 w-10 border rounded-full object-cover border-primary-content/30"
                />
                <span className="text-primary-content">{user?.firstname}</span>
              </button>
            ) : (
              <button
                className="px-6 py-2 rounded-md text-primary-content bg-error hover:bg-error/90 transition duration-300"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
            
            <div>
              <select
                name="theme"
                id="theme"
                value={theme}
                className="bg-base-100 border-2 border-primary/20 rounded-xl shadow-lg text-base-content font-medium cursor-pointer px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 hover:border-primary/40 w-40"
                onChange={(e) => {
                  setTheme(e.target.value);
                  document.documentElement.setAttribute("data-theme", e.target.value);
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="claude">Claude</option>
                <option value="corporate">Corporate</option>
                <option value="ghibli">Ghibli</option>
                <option value="gourmet">Gourmet</option>
                <option value="luxury">Luxury</option>
                <option value="pastel">Pastel</option>
                <option value="slack">Slack</option>
                <option value="soft">Soft</option>
                <option value="spotify">Spotify</option>
                <option value="valorant">Valorant</option>
                <option value="vscode">VS Code</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;