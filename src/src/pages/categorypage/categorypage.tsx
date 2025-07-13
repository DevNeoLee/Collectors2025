import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import categorypageStyle from './categorypage.module.scss';
import CategoryItem from '../../components/categoryItem/categoryItem';
import { selectCollections } from '../../redux/shop/shop-selectors';
import type { RootState } from '../../types/common';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const collections = useSelector((state: RootState) => selectCollections(state));

  useEffect(() => {
    if (category && collections[category]) {
      const categoryTitle = collections[category].title;
      document.title = `${categoryTitle} - Collectors App`;
    } else {
      document.title = 'Category - Collectors App';
    }
  }, [category, collections]);

  if (!category || !collections[category]) {
    return (
      <div className={categorypageStyle.categoryPage}>
        <h2>Category not found</h2>
      </div>
    );
  }

  const { items, title } = collections[category];

  return (
    <div className={categorypageStyle.categoryPage}>
      <h1 className={categorypageStyle.title}>{title}</h1>
      <div className={categorypageStyle.items}>
        {items.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 