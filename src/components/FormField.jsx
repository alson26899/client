import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  isSurpriseMe,
  handleChange,
  handleSurpriseMe,
}) => {
  const renderInput = () => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        id={name}
        required
        onChange={handleChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-[#4649ff] focus:ring-[#4649ff] outline-none block w-full p-3'
      />
    );
  };

  const renderSurpriseButton = () => {
    return (
      isSurpriseMe && (
        <button
          className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'
          onClick={handleSurpriseMe}
        >
          Surprise Me
        </button>
      )
    );
  };

  const renderInputLabel = () => {
    return (
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-900'
      >
        {labelName}
      </label>
    );
  };

  return (
    <>
      <div className='flex items-center gap-2 mb-2'>
        {renderInputLabel()}
        {renderSurpriseButton()}
      </div>
      {renderInput()}
    </>
  );
};

export default FormField;
