import { createSlice } from '@reduxjs/toolkit';
import { apiUsers } from '../api/apiUsersSlices';

const initialState = {
  user: undefined,
  likedItems: JSON.parse(localStorage.getItem('likedItems')) || [],
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const userState = createSlice({
  name: 'currentUser',
  initialState,

  reducers: {
    saveLikeItems(state, action) {
      return { ...state, ...action.payload };
    },

    setCurrentUser(state, action) {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      apiUsers.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
      }
    );
    builder.addMatcher(
      apiUsers.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
      }
    );
    builder.addMatcher(
      apiUsers.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
      }
    );
    builder.addMatcher(
      apiUsers.endpoints.updateMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
      }
    );
    builder.addMatcher(apiUsers.endpoints.logoutUser.matchFulfilled, (state) => {
      state.user = undefined;
      state.likedItems = [];
      state.cart = { caches: [], cart: [] };

      localStorage.removeItem('likedItems');
      localStorage.removeItem('cart');
    });
    builder.addMatcher(apiUsers.endpoints.disableMe.matchFulfilled, (state) => {
      state.user = undefined;
      state.likedItems = [];
      state.cart = { caches: [], cart: [] };

      localStorage.removeItem('likedItems');
      localStorage.removeItem('cart');
    });
  },
});

export default userState.reducer;
export const { setCurrentUser, clearCurrentUser, saveLikeItems } = userState.actions;
