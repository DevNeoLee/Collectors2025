import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot, DocumentReference, DocumentSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDutTigCG75anVmxIfCvJCb4G-U5OWh5uU",
  authDomain: "redux-ecommerce-movie.firebaseapp.com",
  projectId: "redux-ecommerce-movie",
  storageBucket: "redux-ecommerce-movie.appspot.com",
  messagingSenderId: "883542075191",
  appId: "1:883542075191:web:bb8d76f2aba2a1adb25cb2",
  measurementId: "G-WWHBJ4XTLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export interface UserData {
  displayName: string | null;
  email: string | null;
  createdAt: Date;
  [key: string]: any;
}

export const createUserProfileDocument = async (
  userAuth: User | null, 
  additionalData?: any
): Promise<DocumentReference | undefined> => {
  if (!userAuth) return;

  const userRef = doc(firestore, 'users', userAuth.uid);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error);
    }
  }

  return userRef;
};

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app; 