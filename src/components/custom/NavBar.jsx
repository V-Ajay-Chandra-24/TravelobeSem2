import React from "react";

function NavBar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
      {/* Logo Section */}
      <div className="flex items-center">
        {/* Replace this text with your logo image */}
        {/* Example: <img src="/your-logo.png" alt="Logo" className="h-10" /> */}
        <h1 className="text-2xl font-bold">Trippy</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-8 text-lg font-medium">
        <li className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
          <span className="material-icons">home</span>
          <span>Home</span>
        </li>
        <li className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
          <span className="material-icons">info</span>
          <span>About</span>
        </li>
        <li className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
          <span className="material-icons">business_center</span>
          <span>Service</span>
        </li>
        <li className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
          <span className="material-icons">contact_page</span>
          <span>Contact</span>
        </li>
        <li>
          <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Sign Up
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;