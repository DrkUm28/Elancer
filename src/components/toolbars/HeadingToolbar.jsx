import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const HeadingToolbar = ({ labelText, onAdd }) => {
  return (
    <div className='navbar bg-base-100 mb-4 mt-4 rounded-xl'>
      <div className='navbar-start'>
        <label className='ml-3 normal-case text-xl'>{labelText}</label>
      </div>
      <div className='navbar-end'>
        <button className='btn btn-sm btn-outline btn-success' onClick={onAdd}>
          <label className='mr-2'>Add</label>
          <FontAwesomeIcon icon={faPlus} size='lg' />
        </button>
      </div>
    </div>
  );
};

export default HeadingToolbar;
