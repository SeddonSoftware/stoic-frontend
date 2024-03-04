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

  http.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token');
    // Initialize headers object if it doesn't exist
    config.headers = config.headers || {};
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
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
        Modal.error({ content: 'We had an unexpected error. Please try again or contact your administrator.' });
      }
  
      setTimeout(() => { }, 1000);
  
      return Promise.reject(error);
    }
  );

  export default http;