import React from 'react'
import Search from './search/Search'
import Navbar from './navbar/Navbar'
import Chats from './Chats/Chats'

export default function Sidebar() {
  return (
    <>
      <Navbar />
      <Search />
      <Chats />
    </>
  )
}
