import React from 'react';
import { getInitials } from '../../utils/helper';

function ProfileInfo({ userInfo, onLogout }) {


  return (
    <div className="flex items-center">
      <div className="text-2xl font-bold">{getInitials(userInfo?.fullName || "Guest")}</div>
      <div className="ml-4">
        <p className="text-sm font-medium">{userInfo?.fullName || "Guest"}</p>
        <button className="text-blue-500 hover:underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
