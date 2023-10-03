import React, { useContext } from 'react'
import './styles.css'
import { AuthContext } from '../../context/Authcontext'
import { LogoutUser } from '../../api/firebase'
export default function () {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='logo'>Love Chat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt='S' />
        <span>{currentUser.displayName}</span>
        <button onClick={() => LogoutUser()}>logout</button>
      </div>
    </div>
  )
}
