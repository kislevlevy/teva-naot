import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username:'',
  
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    currentUser(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export default usersSlice.reducer;

export const { currentUser } = usersSlice.actions;
