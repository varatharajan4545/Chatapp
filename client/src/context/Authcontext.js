import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState,useEffect } from "react";
import { auth } from "../api/firebase";

export const AuthContext =createContext()



export const AuthContextProvider=({children})=>{
const [currentUser, setCurrentUser] = useState(null)
useEffect(() => {
  const unsub=onAuthStateChanged(auth,(user)=>{
setCurrentUser(user)
console.log(user)
  })

  return ()=>{
    unsub()
  }
}, [])

return <AuthContext.Provider value={{currentUser}}>
    {children}
</AuthContext.Provider>

}