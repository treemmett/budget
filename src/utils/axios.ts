import Axios from 'axios';

const axios = Axios.create({
  baseURL: '/api'
});

axios.interceptors.request.use(config => {
  const sessionJson = localStorage.getItem('session');

  if (!sessionJson) {
    return config;
  }

  let session: { accessToken: string };

  try {
    session = JSON.parse(sessionJson);
  } catch (e) {
    return config;
  }

  if (!session.accessToken) {
    return config;
  }

  config.headers.Authorization = `Bearer ${session.accessToken}`;

  return config;
});

export default axios;
