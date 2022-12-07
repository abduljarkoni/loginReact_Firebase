import React, {useState,useEffect} from 'react'
import {Routes, Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import "./firebase"
// untuk mengecek user yang sudah login
import {getAuth, onAuthStateChanged} from "firebase/auth"

export default function App ()
{

  // cara agar tidak dapat mengakses dashboard dari url yang diganti dengan /dashboard
  // menggunakan usestate dan useseffect
  
  // membuat state
  const [ isLogin, setIsLogin ] = useState( false )
  const [ loading, setLoading ] = useState( true )
  
  // membuat useEffect atu component lifecycle
  useEffect( () =>
  {
    const auth = getAuth()
    onAuthStateChanged( auth, ( result ) =>
    {
      // tes data yang ditampilkan oleh result
      // dengan cara seperti ini akan menampilkan result data user yang sudah login yaitu dengan data user, namun jika belum login, maka result akan menampil "null"
      // dengan cara seperti ini maka kita dapat menggunakan cara conditional rendering dengan memanfaat data result "null"
      // >> console.info( "result : ", result )
      
      if ( result )
      {
        setIsLogin( true )
        setLoading(false)
        return 
      }

      setIsLogin( false )
      setLoading(false)
    } )

  }, [] )
  
  // membuat conditional rendering
  if(loading){
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">Loading..</div>
    )
  }

  
  return (
    // membuat logik apakah user sudah login atau belum dengan kondisional rendering
    // jika isLogin bernilai true maka jalankan fungsi didalam ini "()" : jika tidak atau bernilai false maka jalankan fungsi yang ada didalam ini "()"
    <>
      { isLogin ? (
        // kondisi jika sudah login / "true" hanya boleh akses page dashboard
      <Routes>
          <Route path="/dashboard" element={ <Dashboard /> } />
         
          {/* path="*" maksudnya apa pun yang url yang dimasukan oleh user, maka akan menampilkan halaman dashboard */ }
          <Route path="*" element={ <Dashboard /> } />
      </Routes>
      ) : (
          // jika belum login, maka arahkan user ke halmaan login dan tidak boleh mengkases halaman dashboard atau bernilai "false"
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={ <Register /> } />
            
        {/* path="*" apa pun yang dimasukan user di url, maka akan menampilkan page register, karena belum login/register */}
        <Route path="*" element={ <Register /> } />
      </Routes>
    )}
    </>
  )
}
