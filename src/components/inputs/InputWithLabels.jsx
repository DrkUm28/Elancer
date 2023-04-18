import React from "react";

const InputWithLabels = ({
  labelText,
  altLabel,
  inputType = "text",
  value,
  inputName,
  onChange,
  placeholder,
  readOnly = false,
}) => {
  return (
    <div className='form-control w-full'>
      <label className='label'>
        <span className='label-text font-bold'>{labelText}</span>
      </label>
      <input
        type={inputType}
        placeholder={placeholder || ""}
        name={inputName}
        value={value}
        onChange={onChange}
        className='input input-bordered w-full'
        readOnly={readOnly}
      />
      <label className='label'>
        {altLabel && <span className='label-text-alt'>{altLabel}</span>}
      </label>
    </div>
  );
};

export default InputWithLabels;
