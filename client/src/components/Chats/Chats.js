import React, { useContext } from 'react'
import { useState ,useEffect} from 'react'
import { AuthContext } from '../../context/Authcontext'
import { db } from '../../api/firebase'
import { doc ,onSnapshot} from 'firebase/firestore'
import { ChatContext } from '../../context/Chatcontext'
export default function Chats({user}) {
  const [chats, setChats] = useState(null)
  const{currentUser}=useContext(AuthContext)
  const{dispatch} =useContext(ChatContext)

  useEffect(() => {
    const getChats=()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data()))
    });
    
    return () => {
     unsub()
    }}
    currentUser.uid && getChats()
  }, [currentUser.uid])


  const handleSelect=(u)=>{
        dispatch({type:'CHANGE_USER',payload:u})
  }
  
  return (
    <div>
    {chats?.sort((a,b)=>b[1].date - a[1].date).map((chat,index)=>
    <div key={index} className='search-chat' onClick={()=>handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt='' />
                <div className='search-userinfor'>
                    <span>{chat[1].userInfo.displayName}</span>
                    <p style={{margin:'0px'}}>{chat[1].lastMessage?.text}</p>
                </div>
            </div>)}
    
    </div>
  )
}
