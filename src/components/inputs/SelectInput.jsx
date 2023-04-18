import React from "react";

const SelectInput = ({ labelText, value, inputName, onChange, options }) => {
  return (
    <div className='form-control w-full'>
      <label className='label'>
        <span className='label-text font-bold'>{labelText}</span>
      </label>
      <select
        className='select select-bordered'
        value={value}
        name={inputName}
        onChange={onChange}
      >
        <option value={0}>Select an option</option>
        {options?.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
