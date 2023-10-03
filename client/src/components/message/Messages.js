import React, { useContext,useState,useEffect } from 'react'
import Message from './Message'
import './styles.css'
import { ChatContext } from '../../context/Chatcontext'
import { doc,onSnapshot } from 'firebase/firestore'
import { db } from '../../api/firebase'
export default function Messages() {
  const [message, setMessage] = useState([]);
  const {data} =useContext(ChatContext)
  useEffect(() => {
   const unsub=onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    doc.exists() && setMessage(doc.data().messages)
});
  console.log(message)
    return () => {
      unsub()
    }
  }, [data.chatId])
  
  return (
    <div className='messages' >
    {message?.map((message,index)=><Message message={message} key={index}/>)}

    </div>
  )
}
