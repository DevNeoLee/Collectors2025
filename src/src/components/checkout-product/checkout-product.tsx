import React from 'react';
import { useDispatch } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa';

import checkoutProductStyle from './checkout-product.module.scss';
import { deleteProduct, addProduct, reduceQuantity } from '../../redux/cart/cart-slice';
import type { CartItem } from '../../types/common';

interface CheckoutProductProps {
  product: CartItem;
}

const CheckoutProduct: React.FC<CheckoutProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) {
    return null;
  }

  const handleAddProduct = () => {
    dispatch(addProduct(product));
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(product));
  };

  const handleReduceQuantity = () => {
    dispatch(reduceQuantity(product));
  };

  return (
    <div className={checkoutProductStyle.container}>
      <div className={checkoutProductStyle.checkoutProduct}>
        <div className={checkoutProductStyle.imageContainer}>
          <img className={checkoutProductStyle.image} src={product.imageUrl} alt={product.name} />
        </div>
        <div className={checkoutProductStyle.detail}>
          <div className={checkoutProductStyle.titlePrice}>
            <h2>{product.name}</h2>
            <div className={checkoutProductStyle.price}>${product.price}</div>
          </div>
          <div className={checkoutProductStyle.description}>
            <p>Premium collector's item with high-quality materials</p>
          </div>
          <div className={checkoutProductStyle.quantityDelete}>
            <div className={checkoutProductStyle.quantityText}>
              Quantity: 
              <div onClick={handleReduceQuantity}>
                <FaMinus className={checkoutProductStyle.icon} size={16} />
              </div>
              <div className={checkoutProductStyle.quantity}>
                {product.quantity || 0}
              </div>
              <div onClick={handleAddProduct}>
                <FaPlus className={checkoutProductStyle.icon} size={16} />
              </div>
            </div>
            <div className={checkoutProductStyle.delete}>
              Delete: 
              <p onClick={handleDeleteProduct} className={checkoutProductStyle.x}>
                &#10005;
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CheckoutProduct; 