import { createSlice } from "@reduxjs/toolkit";
const initiateValue = {
  id: "",
  name: "",
  email: "",
  role: "",
  isAuthenticated: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initiateValue,
  reducers: {
    loginAdmin: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    updateAdmin: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logoutAdmin: (state, action) => {
      state = initiateValue;
    },
  },
});

export const { loginAdmin, logoutAdmin, updateAdmin } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
