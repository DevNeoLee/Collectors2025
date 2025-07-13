import { createSelector } from 'reselect';
import type { RootState } from '../../types/common';

const selectShop = (state: RootState) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForCategory = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCategory = (urlParam: string) => createSelector(
  [selectCollections],
  (collections) => collections[urlParam]
); 