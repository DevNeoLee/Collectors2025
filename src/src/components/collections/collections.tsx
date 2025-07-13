import React from 'react';
import { useSelector } from 'react-redux';

import Category from '../category/category';
import { selectCollectionsForCategory } from '../../redux/shop/shop-selectors';
import type { RootState, CategoryProps } from '../../types/common';

import collectionsStyle from './collections.module.scss';

const Collections: React.FC = () => {
  const collections = useSelector((state: RootState) => selectCollectionsForCategory(state));

  return (
    <div className={collectionsStyle.main}>
      {collections.map((collection: CategoryProps) => (
        <Category key={collection.id} {...collection} />
      ))}
    </div>
  );
};

export default Collections; 