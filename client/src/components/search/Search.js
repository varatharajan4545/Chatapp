import React from 'react'
import './styles.css'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { HandleSearch, HandleSelect } from '../../api/firebase';
export default function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);



    const handleKey = (e) => {
        e.code === "Enter" && HandleSearch(username, setUser, setErr);
    };

    const handleSelect = () => {
        HandleSelect(user, currentUser, setUser, setUsername)
    }
    return (
        <div className='search'>
            <div className='search-form'>
                <input onKeyDown={handleKey} value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='find the person' />
            </div>
            {err && <span>User not found!</span>}
            {user && <div className='search-chat' onClick={handleSelect}>
                <img src={user.photoURL} alt='' />
                <div className='search-userinfor'>
                    <span>{user.displayName}</span>
                </div>
            </div>}


        </div>
    )
}
