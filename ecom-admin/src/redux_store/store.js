import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../pages/user';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
