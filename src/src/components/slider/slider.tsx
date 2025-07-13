import React, { useState, useEffect } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import sliderStyle from './slider.module.scss';
import SliderImage from '../slider-image/slider-image';
import Movie from '../../slider-pics-small/movie.png';
import Animation from '../../slider-pics-small/animation.png';
import TVSeries from '../../slider-pics-small/tv-series.png';
import SportMusic from '../../slider-pics-small/sports-music.png';
import RareMovie from '../../slider-pics-small/rare-movie.png';

const Slider: React.FC = () => {
  const SLIDER = [
    <SliderImage key={1} src={Movie} index={1} text={"Timeless Movies in DVD/Blu-ray"} />,
    <SliderImage key={2} src={Animation} index={2} text={"Animations in Highest Quality"} />,
    <SliderImage key={3} src={TVSeries} index={3} text={"Own Acclaimed TV-Series"} />,
    <SliderImage key={4} src={SportMusic} index={4} text={"Feel the Excitement"} />,
    <SliderImage key={5} src={RareMovie} index={5} text={"Collect Rare Films on DVD"} />
  ];

  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? 
      setX((SLIDER.length - 1) * -100)
      :
      setX(x + 100);
  };

  const goRight = () => {
    x === (SLIDER.length - 1) * -100 ?
      setX(0)
      :
      setX(x - 100);
  };  
    
  useEffect(() => {
    const id = setTimeout(() => goRight(), 3000);
    return () => clearTimeout(id);
  }, [x]);

  return (
    <div className={sliderStyle.slider}>
      {SLIDER.map((item, idx) => {
        return (
          <div key={idx} className={sliderStyle.slide} style={{ transform: `translateX(${x}%)` }}>
            {item}
          </div>
        );
      })}
      <button id={sliderStyle.goLeft} onClick={() => goLeft()}>
        <FaChevronCircleLeft className={sliderStyle.i} size={48} />
      </button>
      <button id={sliderStyle.goRight} onClick={() => goRight()}>
        <FaChevronCircleRight className={sliderStyle.i} size={48} />
      </button>
    </div>
  );
};

export default Slider; 