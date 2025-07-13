
import React from 'react'
import menuStyle from './menu-item.module.scss'
import { withRouter } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, history, linkUrl, match }) => {
  return(
  <div className={menuStyle.menuCard}
    onClick={()=> history.push(`${match.url}${linkUrl}`)}
  >
    <div className={menuStyle.content}>
      <h1 className={menuStyle.title}>{title}</h1>
      <div><img src="imageUrl" alt="menuImage"/></div>
    </div>
  </div>
)};

export default withRouter(MenuItem);
