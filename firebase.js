
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyC1EoHW8jRvPrVAIOi3KU7Pl45kGfitkxM",
  authDomain: "vedsetu-70a6b.firebaseapp.com",
  projectId: "vedsetu-70a6b",
  storageBucket: "vedsetu-70a6b.firebasestorage.app",
  messagingSenderId: "428645528682",
  appId: "1:428645528682:web:ad33cf873a070e8e908613"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
