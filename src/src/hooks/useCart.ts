import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { CartItem, RootState } from '../types/common';
import { 
  addProduct, 
  deleteProduct, 
  reduceQuantity, 
  toggleCartHidden 
} from '../redux/cart/cart-slice';
import { 
  selectCartProducts, 
  selectCartTotal, 
  selectCartProductsCount,
  selectCartHidden 
} from '../redux/cart/cart-selectors';

export const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = useSelector((state: RootState) => selectCartProducts(state));
  const cartTotal = useSelector((state: RootState) => selectCartTotal(state));
  const cartCount = useSelector((state: RootState) => selectCartProductsCount(state));
  const isCartHidden = useSelector((state: RootState) => selectCartHidden(state));

  const addToCart = (item: CartItem) => {
    dispatch(addProduct(item));
  };

  const removeFromCart = (item: CartItem) => {
    dispatch(deleteProduct(item));
  };

  const reduceQuantityInCart = (item: CartItem) => {
    dispatch(reduceQuantity(item));
  };

  const toggleCart = () => {
    dispatch(toggleCartHidden());
  };

  const goToCheckout = () => {
    if (cartProducts.length > 0) {
      navigate('/checkout');
      dispatch(toggleCartHidden());
    }
  };

  return {
    cartProducts,
    cartTotal,
    cartCount,
    isCartHidden,
    addToCart,
    removeFromCart,
    reduceQuantityInCart,
    toggleCart,
    goToCheckout
  };
}; 