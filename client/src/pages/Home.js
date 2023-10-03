import React from 'react'
import Chat from '../components/chatbox/Chatbox'
import Sidebar from '../components/Sidebar'
export default function Home() {

  return (
    <div className='home'>
      <div className='home-container'>
        <div className='contact-container'>
          <Sidebar />
        </div>
        <div className='chat-container'>
          <Chat />
        </div>



      </div>
    </div>
  )
}
