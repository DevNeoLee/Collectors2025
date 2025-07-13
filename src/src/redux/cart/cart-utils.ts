import type { CartItem } from '../../types/common';

export const addProductToCart = (cartProducts: CartItem[], clickedProduct: CartItem): CartItem[] => {
  const alreadyAdded = cartProducts.find(product => 
    product.id === clickedProduct.id
  );

  if (alreadyAdded) {
    return cartProducts.map(product =>
      (product.id === clickedProduct.id) ? 
        { ...product, quantity: (product.quantity || 0) + 1 } 
        : product
    );        
  } else {
    return [...cartProducts, { ...clickedProduct, quantity: 1 }];
  }
};

export const reduceQuantity = (cartProducts: CartItem[], payload: CartItem): CartItem[] => {
  const targetProduct = cartProducts.find(product => 
    product.id === payload.id
  );

  if (!targetProduct || targetProduct.quantity === 1) {
    return cartProducts;
  } else {
    return cartProducts.map(product => 
      product.id === payload.id ? 
        { ...product, quantity: (product.quantity || 0) - 1 } 
        : product
    );
  }
}; 