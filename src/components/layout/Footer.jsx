import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="container px-5 py-10 mx-auto flex items-center sm:flex-row flex-col h-10">
      <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <span className="ml-3 text-xl text-white"><img
                src={logo}
                width="120"
                height="auto"
                className="d-inline-block align-top"
                alt="logo"
              ></img></span>
      </div>
      <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        © 2022 ULACIT - Desarrollo Web
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start"></span>
    </footer>
  );
};

export default Footer;
