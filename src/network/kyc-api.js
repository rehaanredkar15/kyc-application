import axios from 'axios';

const KycAPI = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL});

const getAccessToken = async () => {
    const user = JSON.parse(localStorage.getItem('user')) || [];

    const authBody = {
      email: user.email,
    };
    return KycAPI.post('/auth/refresh-token', authBody).then(response => {
      localStorage.setItem("token", JSON.stringify(response.data.token));
    });
};

KycAPI.interceptors.request.use(async (req) => {
    if (localStorage.getItem('token')) {
      const token  = localStorage.getItem('token');
      if (token) {
          req.headers.Authorization = `${token}`;
      }
    }
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);

KycAPI.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response && error.response.status === 401 ||error.response.status === 403 ) {
         return getAccessToken().then(() => {
             const config = error.config;
             const token = JSON.parse(localStorage.getItem('token'));    
             config.headers['Authorization'] = `${token}`;
             return axios.request(config);
            });
    }
    return Promise.reject(error);
  });

export const login = (logindetails) => KycAPI.post(`/auth/login`, logindetails);

export const register = (userDetails) => KycAPI.post(`/auth/register`, userDetails);

export const uploadkyc = (userDetails) => KycAPI.post(`/users/upload-kyc`, userDetails);

export const updateKyc = (userId,userDetails) => KycAPI.put(`admin/update-kyc/${userId}`, userDetails);

export const getAllUsers = () => KycAPI.get(`/admin/users`);
