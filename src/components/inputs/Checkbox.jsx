import React from "react";

const Checkbox = ({ labelText, inputName, isChecked, onChange }) => {
  return (
    <div className='form-control flex flex-row pt-3'>
      <label className='label cursor-pointer'>
        <span className='label-text font-bold'>{labelText}</span>
      </label>
      <input
        type='checkbox'
        checked={isChecked}
        value={isChecked}
        className='checkbox checkbox-accent mt-1.5'
        name={inputName}
        onChange={onChange}
      />
    </div>
  );
};

export default Checkbox;
