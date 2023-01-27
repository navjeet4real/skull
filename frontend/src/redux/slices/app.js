import { createSlice } from "@reduxjs/toolkit";

import { dispatch } from "../store";

const initialState = {
  auth: {
    isLogged: false,
    user: {},
    type: 'LOGIN'
  },
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
       
    }
})

export default slice.reducer;