import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
};

const usersSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      return { ...state, ...action.payload };
    },

    logoutUser(state) {
      return initialState; // Reset to initial state when the user logs out
    },
  },
});

export default usersSlice.reducer;

export const { setCurrentUser, logoutUser } = usersSlice.actions;
