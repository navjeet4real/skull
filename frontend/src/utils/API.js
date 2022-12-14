import axios from "axios";

//here consuming API from backend
export const getDataAPI = async (url) => {
  const res = await axios.get(`/api/${url}`);
  return res;
};

export const postDataAPI = async (url, post) => {
  const res = await axios.post(`/api/${url}`, post);
  return res;
};

export const deleteDataAPI = async (url) => {
  const res = await axios.delete(`/api/${url}`);
  return res;
};
