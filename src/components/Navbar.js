import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between fixed top-0 z-20 px-[6rem] py-4 w-full max-sm:px-4 nav_glass">
      <h1 className="text-lg lg:text-2xl">
        Nobel App{" "}
        <span className="gradient-after w-[110px] left-4 right-0 lg:left-[6rem] lg:w-[140px] top-[45%]"></span>
      </h1>
      <a
        href="https://github.com/Atharv-110/flipr-frontend-nobel-prize-app"
        target="__blank"
        className="btn gradient-btn flex items-center"
      >
        <i className="fa-brands fa-github text-[1.3rem] mr-2"></i> GitHub
        <span className="hidden lg:block">&nbsp;Repository</span>
      </a>
    </nav>
  );
};

export default Navbar;
