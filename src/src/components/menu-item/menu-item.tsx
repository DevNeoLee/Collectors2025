import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import menuStyle from './menu-item.module.scss';

interface MenuItemProps {
  title: string;
  imageUrl: string;
  linkUrl: string;
  size?: string;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  title, 
  imageUrl, 
  linkUrl, 
  className 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div 
      className={`${menuStyle.menuCard} ${className || ''}`}
      onClick={() => navigate(`${location.pathname}${linkUrl}`)}
    >
      <div className={menuStyle.content}>
        <h1 className={menuStyle.title}>{title}</h1>
        <div>
          <img src={imageUrl} alt={`${title} menu`} />
        </div>
      </div>
    </div>
  );
};

export default MenuItem; 