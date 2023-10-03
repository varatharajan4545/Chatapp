import React, { useContext } from 'react'
import './styles.css'
import { AuthContext } from '../../context/Authcontext'
import { LogoutUser } from '../../api/firebase'
import { ChatContext } from '../../context/Chatcontext'
export default function () {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  return (
    <div className='navbar'>
      <span className='logo'>Love Chat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt='S' />
        <span>{currentUser.displayName}</span>
        <button onClick={() => { LogoutUser(); dispatch({ type: 'CHANGE_USER', payload: null }) }}>logout</button>
      </div>
    </div>
  )
}
