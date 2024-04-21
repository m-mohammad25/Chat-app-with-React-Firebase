import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABg33FKrbUnibFrBaxJ-cwjtQAe-tWP40",
  authDomain: "reactchatapp-84e87.firebaseapp.com",
  projectId: "reactchatapp-84e87",
  storageBucket: "reactchatapp-84e87.appspot.com",
  messagingSenderId: "539765058575",
  appId: "1:539765058575:web:81e1d91128cfc9f3e4c77a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
