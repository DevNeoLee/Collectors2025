import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import categorypageStyle from './categorypage.module.scss';
import Product from '../../components/product/product';
import { selectCategory } from '../../redux/shop/shop-selectors';
import type { RootState } from '../../types/common';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = useSelector((state: RootState) => 
    selectCategory(categoryId || '')(state)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return (
      <div className={categorypageStyle.categorypage}>
        <div className={categorypageStyle.empty}>
          Category not found
        </div>
      </div>
    );
  }

  return (
    <div className={categorypageStyle.categorypage}>
      <div className={categorypageStyle.titleContainer}>
        <h1 className={categorypageStyle.title}>{category.title}</h1>
        <p className={categorypageStyle.subtitle}>{category.title} Collection</p>
      </div>
      <div className={categorypageStyle.productContainer}>
        {category.items.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 