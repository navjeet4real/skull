import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";


const initialState = {
  auth: {
    isLogged: false,
    user: "",
    token: "",
    email: "",
    user_id: "",
    error: false,
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.user_id = action.payload.user_id;
      state.role = action.payload.role;
      state.business_id = action.payload.business_id;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.email = "";
      state.token = "";
      state.user_id = "";
      state.user = "";
    },
    fetchUser(state, action) {
      console.log(action.payload);
      state.user = action.payload.user;
      state.business_id = action.payload.user.business_id;
    },
  },
});

export default slice.reducer;

// get user details
export function getUser() {
  return async (dispatch, getState) => {
    await axios
      .get("/auth/get-user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.fetchUser({ user: response.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


export function GoogleLoginUser(formValues) {
  console.log('hello', formValues)
  return async (dispatch, getState) => {
    // dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    try {
      const response = await axios.post(`/auth/google-login`, formValues);
      console.log(response)
      dispatch(
        slice.actions.logIn({
          isLoggedIn: true,
          token: response.data.token,
          email: response.data.email,
          user_id: response.data.user_id,
        })
      );

      window.localStorage.setItem("user_id", response.data.user_id);
      // dispatch(
      //   ShowSnackBar({ severity: "success", message: response.data.message })
      // );
    } catch (error) {
      console.log(error);

      // dispatch(ShowSnackBar({ severity: "error", message: error.message }));
      // dispatch(
      //   slice.actions.updateIsLoading({ isLoading: false, error: true })
      // );
      return;
    }

    // dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }));
    // window.location.href = "/auth/complete-profile";
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    window.localStorage.removeItem("user_id");
    // Cookies.remove('session');
    dispatch(slice.actions.signOut());
    dispatch(
      // ShowSnackBar({ severity: "success", message: "Logged out successfully!" })
    )
    .finally(() => {
      if (!getState().auth.error) {
        window.location.href = "/auth/login";
      }
    });
  };
}