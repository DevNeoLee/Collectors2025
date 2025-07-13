import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { addProductToCart, reduceQuantity as reduceQuantityUtil } from './cart-utils';
import type { CartItem, CartState } from '../../types/common';

const initialState: CartState = {
  hidden: true,
  cartProducts: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartHidden: (state) => {
      state.hidden = !state.hidden;
    },
    addProduct: (state, action: PayloadAction<CartItem>) => {
      state.cartProducts = addProductToCart(state.cartProducts, action.payload);
    },
    deleteProduct: (state, action: PayloadAction<CartItem>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload.id
      );
    },
    reduceQuantity: (state, action: PayloadAction<CartItem>) => {
      state.cartProducts = reduceQuantityUtil(state.cartProducts, action.payload);
    },
    removeLastProduct: (state, action: PayloadAction<CartItem>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload.id
      );
    }
  }
});

export const { 
  toggleCartHidden, 
  addProduct, 
  deleteProduct, 
  reduceQuantity, 
  removeLastProduct 
} = cartSlice.actions;

export default cartSlice.reducer; 