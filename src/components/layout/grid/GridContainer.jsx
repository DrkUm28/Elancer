import React from "react";

const GridContainer = ({ children }) => {
  return (
    <div className='flex flex-col w-full grid-flow-row grid-cols-12 gap-4 overflow-y-auto px-8 pt-1 pb-10 xl:grid xl:px-4'>
      {children}
    </div>
  );
};

export default GridContainer;
