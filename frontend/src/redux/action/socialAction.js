import GlobalTypes from "./GlobalTypes";
import axios from "axios";
import { getDataAPI } from "../../utils/API";

export const dispatchLogin = (authResponse) => {
  return {
    type: GlobalTypes.LOGIN,
    payload: {
      data: authResponse,
    },
  };
};

export const fetchUser = async (token) => {
  const res = await axios.get("/user/infor", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetUser = async (dispatch) => {
  try {
    await getDataAPI("user/refresh_token").then((res) => {
      dispatch({
        type: GlobalTypes.GET_USER,
        payload: {
          user: res.data.user,
        },
      });
    });
  } catch (error) {
    return {
      type: GlobalTypes.GET_USER,
      payload: {
        error: error.response,
      },
    };
  }

  //   return {
  //     type: GlobalTypes.GET_USER,
  //     payload: {
  //       user: res.data,
  //     },
  //   };
};
