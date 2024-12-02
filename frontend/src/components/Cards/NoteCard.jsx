import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment'; // Ensure you import moment if you're using it for date formatting.

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
    <div className="m-10 my-10 border p-4 rounded-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-semibold">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format('MMM DD, YYYY')}
          </span>
        </div>
        <MdOutlinePushPin
          className={`cursor-pointer text-2xl ${
            isPinned ? 'text-primary' : 'text-slate-300'
          }`}
          onClick={onPinNote}
        />
      </div>

      {/* Content Section */}
      <p className="text-sm text-gray-700 mb-2">{content?.slice(0, 60)}...</p>

      {/* Footer Section with Tags and Action Icons */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-xs text-slate-500">
          {tags.map((item, index) => (
            <span key={index} className="mr-1">#{item}</span>
          ))}
        </div>
        <div className="flex space-x-3">
          <MdCreate
            onClick={onEdit}
            className="text-gray-600 cursor-pointer icon-btn hover:text-green-600"
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
