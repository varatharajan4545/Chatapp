import React from 'react'
import Attach from '../../img/attach.png'
import './styles.css'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/Authcontext'
import { ChatContext } from '../../context/Chatcontext'
import { HandleSend } from '../../api/firebase'
import Img from '../../img/img.png'
export default function Input() {

  const [img, setImg] = useState(null)
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend=()=>{
   HandleSend(img,text,setText,setImg,data,currentUser)
   console.log(data,currentUser)
  }
  return (
    <div className='input'>
    <input onChange={(e) => setText(e.target.value)}
        value={text} type='text' placeholder='Typing something...'/>
    <div className='send'>
    <img src={Img} alt=''/>
    <input type='file' id="file"
          onChange={(e) => setImg(e.target.files[0])} style={{display:'none'}}/>
    <label htmlFor='file'>
        <img src={Attach} alt=''/>
    </label>
    <button onClick={handleSend}>Send</button>

    </div>
    </div>
  )
}
