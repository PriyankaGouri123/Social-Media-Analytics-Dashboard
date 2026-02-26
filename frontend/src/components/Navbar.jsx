import { useState, useEffect } from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // ✅ Correct global theme application
  useEffect(() => {
    const root = document.documentElement; // NOT body
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="bg-background text-foreground shadow-md px-6 py-4 border-b">
      <div className="flex items-center justify-between">

        {/* Brand */}
        <h1 className="text-2xl font-bold">Social Dashboard</h1>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <Link to="/instagram"><FaInstagram /></Link>
          <Link to="/twitter"><FaTwitter /></Link>
          <Link to="/youtube"><FaYoutube /></Link>
        </div>

        {/* Desktop Menu + Dark Mode */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {/* <Link to="/login">Login</Link> */}
          {/* <Link to="/signup">Signup</Link> */}

          {/* Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={dark}
              onChange={() => setDark(!dark)}
            />
            Dark
          </label>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="mt-4 md:hidden flex flex-col space-y-4 border-t pt-4">
          <Link to="/" className="text-center">Home</Link>
          <Link to="/about" className="text-center">About</Link>
          <Link to="/login" className="text-center">Login</Link>
          <Link to="/signup" className="text-center">Signup</Link>

          <label className="flex items-center justify-center gap-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={dark}
              onChange={() => setDark(!dark)}
            />
            Dark
          </label>
        </div>
      )}
    </nav>
  );
}
