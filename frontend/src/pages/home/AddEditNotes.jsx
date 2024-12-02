import React, { useState } from 'react';
import TagInput from '../../components/input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';

function AddEditNotes({ noteData, getAllNote,type, onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    // Your logic to add a new note
    try {
      const response=await axiosInstance.post("/add-note",{
        title,
        content,
        tags,
      })
      if (response.data && response.data.note){
        getAllNote()
        onClose()
      }
    } catch (error) {
      if (
        error.response && 
        error.response.data &&
        error.response.data.message
      ){
        setError(error.response.data.message)
      }
    }
  };

  const editNote = async () => {
    // Your logic to edit an existing note
  };

  const handleAddNote = () => {
    if (!title) {
      setError('Please enter the title');
      return;
    }
    if (!content) {
      setError('Please enter the content');
      return;
    }
    setError('');

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className='relative'>
      <button onClick={onClose}>
        <MdClose className='text-xl text-slate-500' />
      </button>

      <div className='flex flex-col gap-2'>
        <label>TITLE</label>
        <input
          type='text'
          className='text-2xl text-slate-950 outline-none'
          placeholder='Go to Gym at 5'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
          type='text'
          className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
          placeholder='content'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />

        <div className='mt-3'>
          <label className='input-label'>TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className='text-red-500 text-xs pt-4 '>{error}</p>}

        <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
          ADD
        </button>
      </div>
    </div>
  );
}

export default AddEditNotes;
