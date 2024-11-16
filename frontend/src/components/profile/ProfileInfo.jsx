import React from 'react';
import { getInitials } from '../../utils/helper';

function ProfileInfo({ onLogout }) {
  return (
    <div className="flex items-center">
      <div className="text-2xl font-bold">{getInitials("john williams")}</div>
      <div className="ml-4">
        <p className="text-sm font-medium">William</p>
        <button className="text-blue-500 hover:underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
