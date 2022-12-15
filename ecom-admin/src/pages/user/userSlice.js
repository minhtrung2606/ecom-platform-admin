import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action?.payload;
    },
  },
});

const userReducer = userSlice.reducer;
const {
  setLoggedInUser,
} = userSlice.actions;

// Actions
export const userReduxActions = {
  setLoggedInUser,
};

// Reducer
export default userReducer;
