export const BASE_URL = process.env.DEV
  ? "http://127.0.0.1:8080"
  : "https://master-thesis-eval.herokuapp.com";
export const uploadFile = BASE_URL + "/files/upload";
export const processPublication = BASE_URL + "/publications/process";
export const uploadFileHeaders = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
