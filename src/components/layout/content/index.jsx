import React from "react";
import NavToolbar from "../navigation/NavToolbar";

const Content = ({ children }) => {
  return (
    <div className='flex flex-col justify-between'>
      <NavToolbar />
      <div>{children}</div>
    </div>
  );
};

export default Content;
