import React from 'react';
import { Link } from 'react-router-dom';

import categoryItemStyle from './categoryItem.module.scss';
import FormButton from '../form-button/form-button';
import { useCart } from '../../hooks/useCart';
import type { ProductProps } from '../../types/common';

const CategoryItem: React.FC<ProductProps> = React.memo(({ item }) => { 
  const { addToCart } = useCart();
  const { name, price, imageUrl, id } = item;

  const handleAddProduct = () => {
    addToCart(item);
  };

  return (
    <div className={categoryItemStyle.card}>
      <Link to={`/product/${id}`} className={categoryItemStyle.productLink}>
        <div className={categoryItemStyle.imageContainer}>
          <img src={imageUrl} alt={name} />
        </div>
        <div className={categoryItemStyle.title}>
          <h3>{name}</h3>
        </div>
        <p className={categoryItemStyle.price}>$ {price}</p>
      </Link>
      <FormButton onClick={handleAddProduct} isProduct>
        Add to Cart
      </FormButton>
    </div>
  );
});

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem; 