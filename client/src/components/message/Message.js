import React, { useContext, useRef, useEffect } from 'react'
import './styles.css'
import { AuthContext } from '../../context/Authcontext'
import { ChatContext } from '../../context/Chatcontext'
export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (<>

    {currentUser.uid !== message?.senderId ? <div className='message' ref={ref}>
      <div className='message-info'>
        <img src={data.user?.photoURL} alt={data.user?.displayName?.slice(0, 1)} />
        <p>just now</p>
      </div>
      <div className='message-content'>
        {message?.text !== "" && <p>{message?.text}</p>}
        <img src={message?.img} alt='' />
      </div>
    </div> : <div className='message owner' ref={ref}>
      <div className='message-info'>
        <img src={currentUser.photoURL} alt={currentUser.displayName[0]} />
        <p>just now</p>
      </div>
      <div className='message-content'>
        {message?.text !== "" && <p>{message?.text}</p>}
        <img src={message?.img} alt='' />
      </div>
    </div>}
  </>

  )
}
