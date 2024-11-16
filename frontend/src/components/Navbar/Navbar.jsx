import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileInfo from '../profile/ProfileInfo'
import SearchBar from '../searchbar/SeachBar'

function Navbar() {
    const navigate= useNavigate;

    const [searchQuery,setSearchQuery]=useState("")
    
    const handleSearch=()=>{

    }

    const onClearSearch=()=>
    {
        setSearchQuery('')
    }
    
    const onLogout=()=>{
        navigate("/login")
    };

  return (
    <div className='w-full h-16 border-b px-10 flex items-center justify-between'>
      <div className='italic'>Logo</div>
      {/* <ul className='flex space-x-4'>
        <li>
          <Link to='/dashboard'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul> */}

      <SearchBar
      value={searchQuery}
      onChange={({target})=>{
        setSearchQuery(target.value)
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
      ></SearchBar>
      <ProfileInfo onLogout={onLogout}></ProfileInfo>
    </div>
  )
}

export default Navbar
