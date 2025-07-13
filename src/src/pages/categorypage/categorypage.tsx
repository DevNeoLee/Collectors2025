import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  if (!category || !collections[category]) {
    return (
      <div className={categorypageStyle.categoryPage}>
        <div className={categorypageStyle.notFound}>
          <h2>Category Not Found</h2>
          <p>The requested category does not exist or may have been removed.</p>
          <div className={categorypageStyle.navigation}>
            <Link to="/" className={categorypageStyle.navButton}>
              <FaHome /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { items, title, subtitle } = collections[category];

  return (
    <div className={categorypageStyle.categoryPage}>
      <div className={categorypageStyle.header}>
        <div className={categorypageStyle.breadcrumb}>
          <Link to="/" className={categorypageStyle.breadcrumbLink}>
            <FaHome /> Home
          </Link>
          <span className={categorypageStyle.breadcrumbSeparator}>/</span>
          <span className={categorypageStyle.breadcrumbCurrent}>{title}</span>
        </div>
        
        <div className={categorypageStyle.titleSection}>
          <h1 className={categorypageStyle.title}>{title}</h1>
          {subtitle && <p className={categorypageStyle.subtitle}>{subtitle}</p>}
          <div className={categorypageStyle.productCount}>
            {items.length} {items.length === 1 ? 'item' : 'items'} available
          </div>
        </div>
      </div>

      <div className={categorypageStyle.content}>
        {items.length > 0 ? (
          <div className={categorypageStyle.productGrid}>
            {items.map((item) => (
              <CategoryItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className={categorypageStyle.emptyState}>
            <h3>No Products Available</h3>
            <p>This category is currently empty. Please check back later.</p>
            <Link to="/" className={categorypageStyle.navButton}>
              <FaHome /> Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage; 