import React from "react";
import Navigation from "./navigation";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <main className='flex flex-col h-screen'>
      <Navigation />
      <div className='flex-1 overflow-y-auto p-5'>{props.children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
