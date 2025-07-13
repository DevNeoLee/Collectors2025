import { createSlice } from '@reduxjs/toolkit';
import SHOP_DATA from './shop.data';
import type { ShopState } from '../../types/common';

const initialState: ShopState = {
  collections: SHOP_DATA
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {}
});

export default shopSlice.reducer; 