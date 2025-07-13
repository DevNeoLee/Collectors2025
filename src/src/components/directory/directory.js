
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory-selectors';

import MenuItem from '../menu-item/menu-item';
import directoryStyle from './directory.module.scss'


const Directory = ({ sections }) => {
      return (
            <div className={directoryStyle.directory}>
                 {sections.map(({ id, ...otherSectionProps }) => (
                    <MenuItem key={id} {...otherSectionProps} className={directoryStyle.menuCard}/>
                ))}
            </div>
        )
}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
