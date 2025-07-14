import { createSelector } from 'reselect';
import type { RootState } from '../../types/common';

const selectDirectory = (state: RootState) => state.directory;

export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
); 