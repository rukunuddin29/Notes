import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx'; // Import RxCross1

function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className='w-80 flex items-center'>
      <input 
        type="text"
        placeholder="Search Notes"
        className='w-full text-xs bg-transparent'
        value={value}
        onChange={onChange}
      />
      {value && (
        <RxCross1 className='cursor-pointer' onClick={onClearSearch} />
      )}
      <FaMagnifyingGlass className='ml-2 cursor-pointer' onClick={handleSearch} />
    </div>
  );
}

export default SearchBar;
