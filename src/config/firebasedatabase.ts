
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

export const firebasedatabase = {
  apiKey: "AIzaSyCeZG5HWtOtdab5qykanA8M_TqAGejAn2M",
  authDomain: "clinic360-backend.firebaseapp.com",
  databaseURL: "https://clinic360-backend-default-rtdb.firebaseio.com",
  projectId: "clinic360-backend",
  storageBucket: "clinic360-backend.appspot.com",
  messagingSenderId: "936305667020",
  appId: "1:936305667020:web:142263e6a8cb9f9d858b69",
  measurementId: "G-R097P8QLY8",
}

const app = initializeApp(firebasedatabase)
const auth = getAuth(app)

export { auth }