import queryString from 'query-string';
import { isEmpty } from "lodash";
import { config } from '../config/config';

const getToken = () => {
  let hashParams = queryString.parse(window.location.hash.substring(1));

  if (isEmpty(hashParams)) {
    return window.location.href = config.authUrl;
  } else {
    return hashParams.access_token;
  }
};

export { getToken };
