import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div className=" m-10 my-10  border p-4 rounded-lg ">
      
      <div className=" flex items-center justify-between ">
        <div>
          <h6 className="text-lg font-semibold">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin 
          className={`cursor-pointer text-2xl ${
            isPinned ? 'text-primary' : 'text-slate-300'
          }`}
          onClick={onPinNote} 
        />
      </div>

      {/* Content Section */}
      <p className="text-sm text-gray-700 mb-2">{content?.slice(0, 60)}</p>

      {/* Footer Section with Tags and Action Icons */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-xs text-slate-500">{tags}</div>
        <div className="flex space-x-3">
          <MdCreate 
            onClick={onEdit} 
            className="text-gray-600 cursor-pointer icon-btn  hover:text-green-600"
          />
          <MdDelete 
            onClick={onDelete} 
            className="text-gray-600 cursor-pointer icon-btn hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
