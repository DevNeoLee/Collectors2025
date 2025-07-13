import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import Header from './components/header/header.tsx';
import Footer from './components/footer/footer.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

import { auth, createUserProfileDocument } from './firebase/utils';
import { setCurrentUser } from './redux/user/user-slice';
import type { RootState } from './types/common';
import './App.scss';

const Homepage = lazy(() => import('./pages/homepage/homepage.tsx'));
const Loginpage = lazy(() => import('./pages/loginpage/loginpage.tsx'));
const Shoppage = lazy(() => import('./pages/shoppage/shoppage.tsx'));
const CheckoutPage = lazy(() => import('./pages/checkoutpage/checkoutpage.tsx'));
const Productpage = lazy(() => import('./pages/productpage/productpage.tsx'));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      console.log('[onAuthStateChanged] userAuth:', userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        if (userRef) {
          onSnapshot(userRef, (snapShot) => {
            const userData = snapShot.data();
            if (userData) {
              console.log('[onSnapshot] userData:', userData);
              dispatch(setCurrentUser({
                ...userAuth,
                ...userData,
                createdAt: userData.createdAt || new Date()
              }));
            }
          });
        }
      }

      dispatch(setCurrentUser(userAuth ? {
        displayName: userAuth.displayName,
        email: userAuth.email,
        uid: userAuth.uid,
        createdAt: new Date()
      } : null));
      console.log('[dispatch setCurrentUser] userAuth:', userAuth);
    });

    return () => unsubscribeFromAuth();
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Collectors App - Premium Movie & Media Collections';
  }, []);

  console.log('[App] currentUser:', currentUser);

  return (
    <ErrorBoundary>
      <Header />
      <div className="wholePage">
        <Suspense fallback={<LoadingSpinner size="large" text="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop/*" element={<Shoppage />} />
            <Route path="/product/:productId" element={<Productpage />} />
            <Route 
              path="/login" 
              element={currentUser ? <Navigate to="/" replace /> : <Loginpage />} 
            />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Suspense>
      </div>   
      <Footer />
    </ErrorBoundary>
  );
};

export default App; 