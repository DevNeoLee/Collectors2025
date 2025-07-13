import React from 'react';
import { Link } from 'react-router-dom';
import sliderStyle from './slider-image.module.scss';

interface SliderImageProps {
  src: string;
  index: number;
  text: string;
}

const SliderImage: React.FC<SliderImageProps> = ({ src, index, text }) => {
  const MAP_LINK: { [key: number]: string } = {
    1: "movie",
    2: "animation",
    3: "tvseries",
    4: "sportsart",
    5: "rarecollection"
  };

  return (
    <div className={sliderStyle.sliderItem}>
      <img src={src} alt="slide-img" className={sliderStyle.image} />
      <div className={sliderStyle.overlay}></div>
      <span className={sliderStyle.text}>{text}</span>
    </div>
  );
};

export default SliderImage; 