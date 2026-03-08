import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAor0pEA4u7hq_98y7kUQOZUQy6KCw63PU",
  authDomain: "quiz-app-d5b40.firebaseapp.com",
  projectId: "quiz-app-d5b40",
  storageBucket: "quiz-app-d5b40.firebasestorage.app",
  messagingSenderId: "703238669173",
  appId: "1:703238669173:web:bbcff7268950f61f4c893c"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
