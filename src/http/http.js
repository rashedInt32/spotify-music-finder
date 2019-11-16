import axios from 'axios';

import { config } from '../config/config';

const accessToken = config.access_token;

const http = axios.create({
  baseURL: config.baseUrl,
  timeout: 1000,
  headers: { "Content-Type": "application/json" }
});

http.interceptors.request.use(
  function(config) {
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Authorization"] = "Bearer " + accessToken;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);


export { http };
