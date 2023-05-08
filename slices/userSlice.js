import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userName: "",
  userEmail: "",
  userImage: "",
  roleName: "",

};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {


      const { roleName, userEmail, userImage, userName, userId } = action.payload;
      state.userId = userId;
      state.userName = userName;
      state.userEmail = userEmail;
      state.userImage = userImage;
      state.roleName = roleName;
    },
    removeUserData: (state, action) => {

      state.userId = '';
      state.userName = '';
      state.userEmail = '';
      state.userImage = '';
      state.roleName = '';
    },
  },
});

export const { actions } = userSlice;

export const selectUserData = (state) => state.user;

export default userSlice.reducer;
