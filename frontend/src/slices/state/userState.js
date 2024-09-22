import { createSlice } from '@reduxjs/toolkit';
import { apiUsers } from '../api/apiUsersSlices';

const initialState = {
  user: undefined,
  likedItems: JSON.parse(localStorage.getItem('likedItems')) || [],
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
      },
    );
    builder.addMatcher(
      apiUsers.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
      },
    );
    builder.addMatcher(
      apiUsers.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
      },
    );
    builder.addMatcher(
      apiUsers.endpoints.updateMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
      },
    );
    builder.addMatcher(apiUsers.endpoints.logoutUser.matchFulfilled, (state) => {
      state.user = initialState.user;
    });
  },
});

export default userState.reducer;
export const { setCurrentUser, clearCurrentUser, saveLikeItems } = userState.actions;
