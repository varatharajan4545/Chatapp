import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/firebase'
import { useState } from 'react'
export default function Login() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()
  const login = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    loginUser(email, password, setErr, navigate)

  }
  return (
    <div className='form-container'>
      <div className='form-wraper'>
        <span className='logo'>Love Chat</span>
        <span className='logo'>Login</span>
        <form onSubmit={login}>
          <input name='email' type='email' placeholder='Email' />
          <input name='password' type='password' placeholder='Password' />

          <button>Log In</button>
          {err && <p>Email or password wrong</p>}
        </form>
        <p>You don't  have Account ? <Link to={'/register'}>Signup</Link></p>
      </div>

    </div>
  )
}
