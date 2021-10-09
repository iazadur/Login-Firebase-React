import React, { useState } from 'react';
import './App.css';
import { LockClosedIcon } from '@heroicons/react/solid'
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification,sendPasswordResetEmail,updateProfile  } from "firebase/auth";
import firebaseInitializeApp from './Firebase/initializeFirebaseApp';


firebaseInitializeApp()

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();


const handleGoogle = () => {

  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })

}
const handleGithub = () => {
  signInWithPopup(auth, twitterProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })

}
const handleFacebook = () => {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
}


function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLogin, setIsLogin] = useState(false)



  const toggleLoggin = e => {
    setIsLogin(e.target.checked)
  }

  const handleEmail = e => {
    setEmail(e.target.value)
  }
  const handleName = e => {
    setName(e.target.value)
  }
  const handlePassword = e => {
    setPassword(e.target.value)
  }
  const handleRegistration = e => {
    e.preventDefault()
    if (password.length < 6) {
      return setError("Password Must be 6 charecter")
    }
    if (!/(?=(.*[a-z]){1,})/.test(password)) {
      return setError("Password Must be 1 uppercase charecter")
    }
    if (!/(?=(.*[A-Z]){1,})/.test(password)) {
      return setError("Password Must be 1 Lowercase charecter")
    }
    // if (!/(?=(.*[0-9]){2,}) /.test(password)) {
    //   return setError("Password Must be 2 numbers")
    // }
    isLogin ? processLogin(email, password) : createNewUser(email, password)
  }
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user
        console.log('Login User', user)
        setError('')
      })
      .catch(error => {
        setError(error.message)
      })
  }
  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user
        console.log(user)
        setError('')
        verifyEmail()
        setUserName()
      })
      .catch(error => {
        setError(error.message)
      })
  }

  const setUserName=() => {
    updateProfile(auth.currentUser, {displayName: name})
    .then((result) => {
      console.log(result);
    })
  }
  const verifyEmail= () => {
    sendEmailVerification(auth.currentUser)
    .then(result=>{
      console.log(result);
    })
  }
  const handleResetPassword=() => {
    sendPasswordResetEmail(auth, email)
  }
  return (
    <div className="">

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{isLogin ? 'Sign in' : 'Sign up'} to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegistration}>

            <div className="rounded-md shadow-sm -space-y-px">
              
              {!isLogin && <div>
                <div className="my-3">
                  <label htmlFor="name" className="font-medium text-gray-600">
                    Name
                  </label>
                </div>
                <input
                  onBlur={handleName}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>}
              <div>
                <div className="my-3">
                  <label htmlFor="email-address" className="font-medium text-gray-600">
                    Email
                  </label>
                </div>
                <input
                  onBlur={handleEmail}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <div className="my-3">
                  <label htmlFor="password" className="font-medium text-gray-600">
                    Password
                  </label>
                </div>
                <input
                  onBlur={handlePassword}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  onChange={toggleLoggin}
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a onClick={handleResetPassword} href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="text-red-500 font-bold">{error}</div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {isLogin ? 'Sign in' : 'Registration'}
              </button>
            </div>
          </form>
          <div className="text-blue-500 font-normal text-center">{isLogin ? "Don't" : 'Already'} Have an Account? <button className="font-semibold" onClick={() => isLogin ? setIsLogin(false) : setIsLogin(true)}>{isLogin ? 'Register' : 'Login'}</button> </div>
          <hr />
          <div className="flex flex-wrap gap-3">
            <i onClick={handleFacebook} className="fab fa-facebook px-14 py-4 text-xl border-2 text-blue-600 hover:text-white hover:bg-blue-400 rounded-md"></i>
            <i onClick={handleGithub} className="fab fa-github px-14 py-4 text-xl border-2 text-blue-600 hover:text-white hover:bg-blue-400 rounded-md"></i>
            <i onClick={handleGoogle} className="fab fa-google px-14 py-4 text-xl border-2 text-blue-600 hover:text-white hover:bg-blue-400 rounded-md"></i>
          </div>
        </div>
      </div>








    </div>
  );
}

export default App;