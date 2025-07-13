import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import shoppageStyle from './shoppage.module.scss';
import CategoryPage from '../categorypage/categorypage';

const ShopPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Shop - Collectors App';
  }, []);

  return (
    <div className={shoppageStyle.shopPage}>
      <Routes>
        <Route path=":category" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default ShopPage; 