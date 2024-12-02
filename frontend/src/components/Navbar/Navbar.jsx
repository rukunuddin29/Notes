import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../profile/ProfileInfo'
import SearchBar from '../searchbar/SeachBar'

function Navbar({ userInfo }) {
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Implement search logic here
  };

  const onClearSearch = () => {
    setSearchQuery('');
  };

  const onLogout = () => {
    localStorage.clear(); // Clear local storage when logging out
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className='w-full h-16 border-b px-10 flex items-center justify-between'>
      <div className='italic'>Logo</div>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
    </div>
  );
}

export default Navbar;
