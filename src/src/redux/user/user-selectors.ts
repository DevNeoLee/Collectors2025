import { createSelector } from 'reselect';
import type { RootState } from '../../types/common';

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
); 