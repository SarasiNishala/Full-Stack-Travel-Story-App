import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'

const Navbar = ({userInfo}) => {

  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        <h3 className='text-cyan-800 font-bold text-[26px]'>Travel<span className=' text-cyan-600 text-[23px]'>Story</span></h3>

        { isToken && <ProfileInfo userInfo={userInfo} onLogOut={onLogOut}/>}
    </div>
  )
}

export default Navbar