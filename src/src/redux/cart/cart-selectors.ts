import { createSelector } from 'reselect';
import type { RootState } from '../../types/common';

const selectCart = (state: RootState) => state.cart;

export const selectCartProducts = createSelector(
  [selectCart],
  (cart) => cart.cartProducts
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden 
);

export const selectCartProductsCount = createSelector(
  [selectCartProducts],
  (cartProducts) => 
    cartProducts.reduce(
      (accQuantity, cartProduct) => 
        accQuantity + (cartProduct.quantity || 0), 0
    )
);

export const selectCartTotal = createSelector(
  [selectCartProducts],
  (cartProducts) => 
    cartProducts.reduce(
      (accTotal, cartProduct) => 
        accTotal + (cartProduct.quantity || 0) * cartProduct.price, 0
    )
); 