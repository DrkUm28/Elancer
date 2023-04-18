import React from "react";

const DynamicToolbar = ({ labelText, options }) => {
  return (
    <div className='navbar bg-base-100 mb-4 mt-4 rounded-xl'>
      <div className='navbar-start'>
        <label className='ml-3 normal-case text-xl'>{labelText}</label>
      </div>
      <div className='navbar-end'>{options}</div>
    </div>
  );
};

export default DynamicToolbar;
