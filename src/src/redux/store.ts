import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user-slice';
import cartReducer from './cart/cart-slice';
import directoryReducer from './directory/directory-slice';
import shopReducer from './shop/shop-slice';
import type { RootState } from '../types/common';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: persistedCartReducer,
    directory: directoryReducer,
    shop: shopReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);

export type { RootState };
export type AppDispatch = typeof store.dispatch; 