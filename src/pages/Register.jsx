import React from 'react'
import { Link} from "react-router-dom"
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth"

export default function Register ()
{
    // membuat fungtion register agar  function register dengan akun google kita
    const handleGoogleLogin = () =>
    {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        signInWithPopup( auth, provider )
            .then( ( result ) =>
            {
            console.info(result.user)
             })
            .catch( ( err ) =>
            {
            console.error(err)
             })
    
    }

    // membuat function register dengan email dan password
    const handleGoogleRegister = ( e ) =>
    {
        // mereload page kita
        e.preventDefault()

        // menangkatp form input yang ada diform kita
        const email = e.target.email.value
        const password = e.target.password.value
        const password2 = e.target.password2.value

        // membuat validasi sederhana
        // jika tidak ada email /password/password2, maka tampilkan alert ini
        if ( !email || !password || !password2 )
        {
            return (
                alert("Silakan lengkapi data!")
            )
        }

        // jika password tidak sama dengan password2, maka tampilkan alert ini
        if ( password !== password2 )
        {
            return (
                alert("Password harus sama!")
            )
        }

        // password harus lebih dari 6 angka jika kurang tampilkan alert ini
        if ( password.length < 6 )
        {
            return (
                alert("Password harus lebih dari 6 karakter!")
            )
        }

        // buat variabel
        const auth = getAuth()
        createUserWithEmailAndPassword( auth, email, password )
            .then( (result) =>
            {
                // console.info(result.user )
                // menambahkan local storage agar data user masuk/tersimpan di local storage
                localStorage.setItem("user", JSON.stringify(result.user))
            } )
            .catch( (err) =>
            {
            console.error(err)
            })

    }


  return (
      <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-orange-800 to-orange-500 max-w-[500px] mx-auto p-10'>
        
          {/* tambahkan pada form onSubmit={handleGoogleRegister} */ }
          <form
              className='w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6'
              autoComplete='off'
              onSubmit={handleGoogleRegister}
          >
              <h1 className='text-4xl text-orange-500 text-center'>Register</h1>
              <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
              </div>
            
              {/* password 1 */ }
              <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
              </div>
            
              {/* password 2 */ }
              <div className="flex flex-col gap-2">
                  <label htmlFor="password2">Ulangi Password</label>
                  <input type="password" id="password2" className='h-10 px-3 rounded-md border-[1px] border-gray-300' />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                  
                  {/* kasih type buttonnya menjadi submit */}
                  <button className='h-10 w-full bg-blue-500 text-white rounded-lg' type='submit'>Register</button>
                  <button
                      className='h-10 w-full bg-yellow-500 text-white rounded-lg'
                      type='button'
                      onClick={handleGoogleLogin}
                  >
                      with Google Account
                  </button>
                  <Link to={"/"} className='h-10 w-full bg-slate-500 text-white rounded-lg flex justify-center items-center'>Login</Link>
              </div>
              
          </form>
    </main>
  )
}
