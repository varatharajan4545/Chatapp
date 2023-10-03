import React, { useContext } from 'react'
import Videocam from '../../img/cam.png'
import Add from '../../img/add.png'
import More from '../../img/more.png'
import Messages from '../message/Messages'
import Input from '../input/Input'
import './styles.css'
import { ChatContext } from '../../context/Chatcontext'
export default function Chat() {
    const { data } = useContext(ChatContext)

    return (
        <>
            <div className='chat-info'>
                <span>{data.user.displayName}</span>
                <div className='chat-icons'>
                    <img src={Videocam} />
                    <img src={Add} />
                    <img src={More} />
                </div>
            </div>
            <Messages />
            <Input />

        </>
    )
}
