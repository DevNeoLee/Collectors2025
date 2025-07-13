import React from 'react';
import { Link } from 'react-router-dom';

import CategoryItem from '../categoryItem/categoryItem';
import categoryStyle from './category.module.scss';
import type { CategoryProps } from '../../types/common';

const Category: React.FC<CategoryProps> = React.memo(({ items, title, routeName, subtitle }) => {
  return (
    <div className={categoryStyle.categoryContainer}>
      <Link to={`/shop/${routeName}`}>
        <div className={categoryStyle.titleContainer}>
          <h1 className={categoryStyle.title}>{title}</h1>
          <h3 className={categoryStyle.subtitle}>{subtitle}</h3>                
        </div> 
      </Link>
      <div className={categoryStyle.productContainer}>
        <div className={categoryStyle.category}>
          {items
            .filter((_, idx) => idx < 4)
            .map((item) => (
              <CategoryItem key={item.id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
});

Category.displayName = 'Category';

export default Category; 