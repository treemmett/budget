import Axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { refreshSession } from '../redux/actions/authentication';
import store from '../redux/store';

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

axios.interceptors.response.use(
  r => r,
  async r => {
    try {
      if (
        r.response.data.error === 'invalid_token' &&
        r.config.url !== '/api/auth'
      ) {
        await store.dispatch<any>(refreshSession());

        return await axios.request({ ...r.config, baseURL: '' });
      }

      throw r;
    } catch (e) {
      throw r;
    }
  }
);

export default axios;

// @ts-ignore
window.foo = () => store.dispatch<any>(refreshSession());
