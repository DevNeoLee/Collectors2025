import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import homepageStyles from './homepage.module.scss';
import Collections from '../../components/collections/collections';
import Slider from '../../components/slider/slider';

const Homepage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={homepageStyles.homepage}>
      <Slider />
      <div className={homepageStyles.collectionContainer}>
        <Collections />
      </div>
    </div>
  );
};

export default Homepage; 