import React from 'react'
import Add from '../img/addImage.png'
import { register } from '../api/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function Register() {
  const navigation = useNavigate()
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    const displayName = e.target[0].value
    const password = e.target[1].value
    const email = e.target[2].value
    const file = e.target[3].files[0]
    register(email, password, file, displayName, navigation, setErr, setLoading)

  }
  return (
    <div className='form-container'>
      <div className='form-wraper'>
        <span className='logo'>Love Chat</span>
        <span className='logo'>Register</span>
        <form onSubmit={handleSubmit}>
          <input name='displayName' type='text' placeholder='Display Name' />
          <input name='password' type='password' placeholder='Password' />
          <input name='email' type='email' placeholder='Email' />
          <input id='file' name='file' style={{ display: 'none' }} type='file' placeholder='' />
          <label htmlFor='file'>
            <img src={Add} />
            <span>Add an avatar</span>
          </label>
          <button type='submit'>Sign Up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p> do you  have Account ? <Link to="/login">Login</Link></p>
      </div>

    </div>
  )
}
