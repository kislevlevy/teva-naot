import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  likedItems: JSON.parse(localStorage.getItem('likedItems')) || [],
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

    saveLikeItems(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export default usersSlice.reducer;

export const { setCurrentUser, logoutUser, saveLikeItems } = usersSlice.actions;
