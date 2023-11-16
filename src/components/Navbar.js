import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between fixed top-0 z-20 px-[5rem] py-3 w-full max-sm:px-2 nav_glass">
      <h1 className="text-lg lg:text-2xl">
        Nobel Prize App{" "}
        <span className="gradient-after w-[150px] left-2 right-0 lg:left-[5rem] lg:w-[200px] top-[55%]"></span>
      </h1>
      <div></div>
    </nav>
  );
};

export default Navbar;
