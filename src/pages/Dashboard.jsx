import React, {useState, useEffect} from 'react'
import {getAuth, signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom'

export default function Dashboard ()
{
  
  // membuat state
  const [ user, setUser ] = useState()
  
  // deklarasi usenavigate
  const navigate = useNavigate()

  // component lifecycle
  useEffect( () =>
  {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [] )
  
  // membuat logout function
  const handleLogout = () =>
  {
    const auth = getAuth()
    signOut( auth )
      .then( result =>
      {
        // menghapus data user dilocal storage karena menyimpan data user, oleh karena itu harus kita hapus
        localStorage.clear()

        // untuk perpindahan page ke page login, kita gunakan navigate/useNavigate
        navigate("/")
        
    })
      .catch( (err) =>
      {
      console.error(err)
    })
  }

  return (
      <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-red-800 to-red-500 max-w-[500px] mx-auto p-10'>
          <div className="w-full bg-white p-6 shadow-lg flex flex-col gap-4 rounded-lg items-center">
              <h1 className='text-4xl text-red-500 '>Welcome</h1>
            {/*untuk mengambil image dari akun google, maka akan mengambil data dari photoURL dari local storage  */}
        <img src={ user?.photoURL } alt="" className="w-[100px] h-[100px] rounded-full object-cover" />
        
            {/*untuk mengambil data email dari akun google, maka akan mengambil data email dari local storage  */}
        <h3>{ user?.email }</h3>
          
        <button
          className='h-10 bg-black text-white rounded-lg w-full'
          type='button'
          onClick={handleLogout}
        >
          Logout
        </button>
          </div>
    </main>
  )
}
