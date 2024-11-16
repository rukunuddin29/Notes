import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

function Password({ value, onChange, placeholder }) {
  const [togglePass, setTogglePass] = useState(false);

  function viewPassword() {
    setTogglePass(!togglePass);
  }

  return (
    <div className="flex items-center">
      <input
        type={togglePass ? 'text' : 'password'}
        placeholder={placeholder || 'Password'}
        value={value}
        onChange={onChange}
        className="input-box"
      />
      {togglePass ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer ml-2"
          onClick={viewPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer ml-2"
          onClick={viewPassword}
        />
      )}
    </div>
  );
}

export default Password;
