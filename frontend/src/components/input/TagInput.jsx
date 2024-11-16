import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addNewTag();
    }
  };

 const handleremoveTag=(tagToRemove)=>{
  setTags(tags.filter((tag)=> tag !== tagToRemove))
 }

  return (
    <div>
      {tags.length > 0 && (
        <div>
          {tags.map((tag, index) => (
            <span key={index} className=''>
            #{tag}
              <button onClick={() => handleremoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className='flex items-center gap-4 mt-3'>
        <input
          type='text'
          className=''
          placeholder='Add Tags'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className='' onClick={addNewTag}>
          <MdAdd className='text-2xl text-blue-700 hover:text-white' />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
