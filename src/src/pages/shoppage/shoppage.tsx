import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import shoppageStyle from './shoppage.module.scss';
import Productpage from '../productpage/productpage';

const Collections = lazy(() => import('../../components/collections/collections'));
const Categorypage = lazy(() => import('../categorypage/categorypage'));

const Shoppage: React.FC = () => {
  return (
    <div className={shoppageStyle.container}>
      <Suspense fallback={<div>...loading</div>}>
        <Routes>
          <Route path="/" element={<Collections />} />   
          <Route path="/:categoryId" element={<Categorypage />} />  
        </Routes>
      </Suspense>
    </div>
  );
};

export default Shoppage; 