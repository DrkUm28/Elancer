import React from "react";

const DatePicker = ({ labelText, value, inputName, onChange }) => {
  return (
    <div className='form-control w-full'>
      <label className='label'>
        <span className='label-text font-bold'>{labelText}</span>
      </label>
      <input
        type='date'
        value={value}
        name={inputName}
        onChange={onChange}
        className=' sm:text-sm input input-bordered w-full'
      />
    </div>
  );
};

export default DatePicker;
