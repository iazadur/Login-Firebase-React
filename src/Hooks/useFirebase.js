import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth"
import { useState } from "react"
import firebaseInitialize from "../Firebase/Firebase.init"
firebaseInitialize()
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState({})
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()
    const signInUsingGoogle =() => {
        signInWithPopup(auth,googleProvider)
        .then(result=>{
            setUser(result.user)
        })
        .catch=e=>{
            setError(e.message)
        }
    }
    return{
        user,
        error,
        signInUsingGoogle
    }
}
export default useFirebase

