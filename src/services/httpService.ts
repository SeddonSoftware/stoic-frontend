import axios from 'axios';
import { Modal } from 'antd';

const qs = require('qs');

const http = axios.create({
    baseURL: process.env.REACT_APP_REMOTE_SERVICE_BASE_URL,
    timeout: 30000,
    paramsSerializer: function (params) {
      return qs.stringify(params, {
        encode: false,
      });
    },
  });


  http.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
        Modal.error({
          title: error.response.data.error.message,
          content: error.response.data.error.details,
        });
      } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {
        Modal.error({
          title: 'LoginFailed',
          content: error.response.data.error.message,
        });
      } else if (!error.response) {
        // I'm actually not sure why the boilerplate would try to load a string from the locale off the server-side if we were to get a full-scale API error.
        Modal.error({ content: 'We had an unexpected error. Please try again or contact your administrator.' });
      }
  
      setTimeout(() => { }, 1000);
  
      return Promise.reject(error);
    }
  );

  export default http;