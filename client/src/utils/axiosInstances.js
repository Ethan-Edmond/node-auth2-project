import axios from 'axios';

const pubApi = axios.create({
  baseURL: 'http://localhost:5000/api/auth'
});

const privApi = (token) => axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    Authorization: token
  }
});

export { pubApi, privApi  };
