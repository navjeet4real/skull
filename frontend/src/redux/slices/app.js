import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
// import { updateIsLoading } from "../slices/auth";

const initialState = {
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  memes: [],
  memeByUserId: [],
  memeTemplates: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    fetchMemes(state, action) {
      state.memes = action.payload.memes;
    },
    fetchMemesByUSerId(state, action) {
      state.memeByUserId = action.payload.memeByUserId;
    },
    fetchMemeTemplates(state, action){
      state.memeTemplates = action.payload.memeTemplates
    }
  },
});

export default slice.reducer;

export const ShowSnackBar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );
    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };

export const CloseSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};

export function GetMemes() {
  return async (dispatch, getState) => {
    await axios
      .get("meme/get-all-meme", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response, "response getMemes");
        dispatch(slice.actions.fetchMemes({ memes: response.data }));
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}
export function GetMemesByUserId(id) {
  return async (dispatch, getState) => {
    await axios
      .get(`meme/get-meme/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response, "response getMemes");
        dispatch(slice.actions.fetchMemesByUSerId({ memeByUserId: response.data }));
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}
