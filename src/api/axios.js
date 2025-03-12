import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // 환경 변수 활용
  headers: {
    'Content-Type': 'application/json',
    // "Authorization" : `Bearer ${access_token}`
  }
});

instance.get('/counter')

export default instance