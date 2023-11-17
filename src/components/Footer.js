import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between items-center w-full py-6 px-1 lg:px-[6rem] border border-x-0 border-b-0 max-sm:flex-col-reverse max-sm:gap-4 footer">
      <div className="text-[0.9rem] lg:text-[1.1rem] font-medium text-gray-600 mt-2 lg:mt-0">
        © 2023 Front End Task by{" "}
        <span className="gradient-text"> Atharv Vani</span> for{" "}
        <span className="gradient-text">
          {" "}
          <a href="https://flipr.ai/" target="__blank">
            Flipr.ai
          </a>
        </span>
      </div>
      <div className="flex justify-between items-center gap-5">
        <a
          target="_blank"
          href="https://github.com/Atharv-110"
          className="footer-icon"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/atharv-vani110/"
          className="footer-icon"
          rel="noreferrer"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a
          target="_blank"
          href="https://twitter.com/atharv_110"
          className="footer-icon"
          rel="noreferrer"
        >
          <i className="fa-brands fa-twitter"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
