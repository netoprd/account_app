import superagentPromise from 'superagent-promise';
import _superagent, { search } from 'superagent';
import { notifyError } from './toast';

const superagent = superagentPromise(_superagent, global.Promise);

export const API_ROOT = "http://localhost:5050/api/";

let token = null;
const responseBody = res => res.body;

const getAuthToken = () => {
  const auth = JSON.parse(window.localStorage.getItem('auth'));
  const token = auth ? auth.token : null;
  return token;
}

export const tokenPlugin = req => {
  req.set('Accept', 'application/json');
  token = getAuthToken();

  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }

  req.on('error', (error) => {
    if (error.status === undefined) {
      //
    }

  });

  req.on('response', function (res) {
    if (res.status === 401) {
      // redirect to login page here
      window.location.href = `${window.location.origin}/`;
    }
    if (res.body.error) {
      notifyError(res.body.errorMessage);
    }

    if (res.body?.message && Array.isArray(res.body.message) && res.body.message.length > 0) {
      notifyError(res.body.message.join(", "));
    }
  });

}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  patch: (url, body) =>
    superagent.patch(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  logError: (data) =>
    requests.post('log/error', { data }),
  isAuth: () => {
    const token = getAuthToken();
    return !!token;
  },
  saveAuthData: (_user) => {
    window.localStorage.setItem('auth', JSON.stringify(_user));
    token = _user.token;
  },

  logout: () => {
    window.localStorage.removeItem('auth')
    token = null
  },

  currentUser: () => JSON.parse(window.localStorage.getItem('auth')),

  isAdmin: () => {
    const user = Auth.currentUser();
    return user.isAdmin === true
  },
  verification: () =>
    requests.get('auth/getanyuser'),
  login: (email, password) =>
    requests.post('auth/login', { email, password }),
  register: (data) =>
    requests.post('auth/signup', data),
  verifyEmailToken: token =>
    requests.get(`auth/verify-email/${token}`),
  verifyPasswordToken: token =>
    requests.get(`auth/valid-password-token/${token}`),
  forgotPassword: (email) =>
    requests.get(`auth/forgot-password/${email}`),
  changePassword: (data) =>
    requests.post(`auth/changepassword/new`, data),
  resetPassword: (data) =>
    requests.post(`auth/resetpassword`, data),
  sendResetToken: (email) =>
    requests.post(`auth/password/email`, { email })
}

const StockBalances = {
  load: (page, limit, search) =>
    requests.get(`stockBalance/?page=${page}&limit=${limit}&search=${search}`)
}

// const User = {
//   save: (data) =>
//     requests.post('auth/create/new/user', data),
//   load: (page, limit, search) =>
//     requests.get(`auth/get/alluser/?page=${page}&limit=${limit}&search=${search}`),
// }
// const Product = {
//   save: (data) =>
//     requests.post(`product`, data),
//   getAllProduct: (page, limit, search) =>
//     requests.get(`product/?page=${page}&limit=${limit}&search=${search}`),
//   view: (id) =>
//     requests.get(`product/${id}`),
//     del:(id)=>
//     requests.del(`product/${id}`),
//     update:(id,data)=>
//     requests.patch(`product/${id}`, data)

// }

// const productMeasure={
//   save:(data)=>
//   requests.post(`productmeasure`,data),
//   getbyId:(id)=>
//   requests.get(`productmeasure/${id}`),
//   load:(page,limit)=>
//   requests.get(`productmeasure?page=${page}&limit=${limit}`)
// }

// const productFunctionalCategory={
//   save:(data)=>
//   requests.post(`productFunctionalcategory`,data),
//   load:(page,limit,search)=>
//   requests.get(`productFunctionalCategory?page=${page}&limit=${limit}&search=${search}`),
//   getById:(id)=>
//     requests.get(`productFunctionalCategory/${id}`),
//     edit:(id,data)=>
//     requests.put(`productFunctionalCategory/${id}`,data),
//     delete:(id)=>
//     requests.del(`productFunctionalCategory/${id}`)
  
  
// }

// const StockReceipt = {
//   save: (data) =>
//     requests.post(`stockreceive`, data),
//   // load: (page, limit, search, locationId) =>
//   //   requests.get(`stockreceive?page=${page}&limit=${limit}&search=${search}&locationId=${locationId}`),
//   load: (page, limit, search, trantype) =>
//     requests.get(`stockreceive/${trantype}?page=${page}&limit=${limit}&search=${search}`),
//   view: (id) =>
//     requests.get(`stockreceive/get/${id}`),
//   edit: (id, data) =>
//     requests.patch(`stockreceive/${id}`, data),
//   approve: (id) =>
//     requests.patch(`stockreceive/approve/${id}`),
//   delete: (id) =>
//     requests.del(`stockreceive/${id}`),
//   loadProduct: (page, limit, search) =>
//     requests.get(`product?page=${page}&limit=${limit}&search=${search}`),
// }

// const StockSales = {
//   save: (data) =>
//     requests.post(`stocksales`, data),
//   load: (page, limit, search) =>
//     requests.get(`stocksales/?page=${page}&limit=${limit}&search=${search}`),
//   view: (id) =>
//     requests.get(`stocksales/${id}`),
//   approve: (id) =>
//     requests.patch(`stocksales/approve/${id}`),
//   delete: (id) =>
//     requests.del(`stocksales/${id}`),
// }

// const StockBalance = {
//   load: (page, limit, search) =>
//     requests.get(`stockbalance?page=${page}&limit=${limit}&search=${search}`),
// }

// const StockAdjustment = {
//   save: (transactionType, data) =>
//     requests.post(`stockadjustment/${transactionType}`, data),
//   load: (page, limit, search, transactionType) =>
//     requests.get(`stockadjustment/getall/${transactionType}?page=${page}&limit=${limit}&search=${search}`),
//   view: (id) =>
//     requests.get(`stockadjustment/${id}`),
//   edit: (id, data) =>
//     requests.patch(`stockadjustment/${id}`, data),
//   delete: (id) =>
//     requests.del(`stockadjustment/${id}`),
//   approve: (id) =>
//     requests.patch(`stockadjustment/approve/${id}`),

// }

// const StockIssue = {
//   save: (data) =>
//     requests.post(`stockissuenote`, data),
//   load: (page, limit, search) =>
//     requests.get(`stockissuenote/?page=${page}&limit=${limit}&search=${search}`),
//   view: (id) =>
//     requests.get(`stockissuenote/${id}`),
//   approve: (id) =>
//     requests.patch(`stockissuenote/approve/${id}`),
//   delete: (id) =>
//     requests.del(`stockissuenote/${id}`),
// }

// const PriceManagement = {
//   save: (data) =>
//     requests.post(`pricemanagement`, data),
//   load: (page, limit, search) =>
//     requests.get(`pricemanagement?page=${page}&limit=${limit}&search=${search}`),
//   view: (id) =>
//     requests.get(`pricemanagement/${id}`),
//   edit: (id, data) =>
//     requests.patch(`pricemanagement/${id}`, data),
//   approve: (id) =>
//     requests.patch(`pricemanagement/approve/${id}`),
//   delete: (id) =>
//     requests.del(`pricemanagement/${id}`),
//   loadProduct: (page, limit, search) =>
//     requests.get(`product?page=${page}&limit=${limit}&search=${search}`),
// }

const api = {
  Auth,
//   StockBalances,
//   User,
//   Product,
//   productMeasure,
//   productFunctionalCategory,
//   StockReceipt,
//   StockSales,
//   StockBalance,
//   StockAdjustment,
//   StockIssue,
//   PriceManagement
}

export default api;
