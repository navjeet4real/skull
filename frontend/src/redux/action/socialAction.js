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

export const dispatchGetUser = async () => {
  const res = await getDataAPI("user/refresh_token");
  // return {
  //   type: GlobalTypes.GET_USER,
  //   payload: {
  //     data: res.data,
  //   },
  // };
};
export const dispatchGetUser1 = () => async (dispatch) => {
  try {

  // const res = await getDataAPI("user/refresh_token");
  const res =  await getDataAPI("user/refresh_token").then((res) => {
    console.log(res,"response") 
    dispatch({
        type: GlobalTypes.GET_USER,
        payload: {
          data: res.data.user,
        },
      });
    });
  } catch (error) {
    dispatch(
      {
        type: GlobalTypes.GET_USER,
        payload: {
          error: error.response,
        },
      }
    );
  }

    // return {
    //   type: GlobalTypes.GET_USER,
    //   payload: {
    //     user: res.data,
    //   },
    // };
};
