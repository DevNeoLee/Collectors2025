import React from 'react';
import { Link } from 'react-router-dom';
import productStyle from './product.module.scss';
import type { ShopItem } from '../../types/common';

interface ProductProps {
  item: ShopItem;
}

const Product: React.FC<ProductProps> = ({ item }) => {
  return (
    <div className={productStyle.container}>
      <div className={productStyle.product}>      
        <Link to={`/product/${item.id}`}>
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className={productStyle.image}
          />
        </Link>
        <div className={productStyle.details}>
          <h3 className={productStyle.name}>{item.name}</h3>
          <p className={productStyle.price}>${item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Product; 