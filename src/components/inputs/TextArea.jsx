import React from "react";

const TextArea = ({
  labelText,
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
      <textarea
        placeholder={placeholder || ""}
        name={inputName}
        value={value}
        onChange={onChange}
        className='textarea textarea-bordered w-full'
        readOnly={readOnly}
      />
    </div>
  );
};

export default TextArea;
