import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory-selectors';
import type { DirectoryItem } from '../../types/common';

import MenuItem from '../menu-item/menu-item';
import directoryStyle from './directory.module.scss';

interface DirectoryProps {
  sections: DirectoryItem[];
}

const Directory: React.FC<DirectoryProps> = ({ sections }) => {
  return (
    <div className={directoryStyle.directory}>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} className={directoryStyle.menuCard} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory); 