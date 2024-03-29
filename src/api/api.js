import axios from "axios";

let baseURL = "";

export const requestLogin = params => {
  return axios
    .get(`${baseURL}/account/login`, { params: params })
    .then(res => res.data);
};

export const requestRegister = params => {
  return axios
    .get(`${baseURL}/account/register`, { params: params })
    .then(res => res.data);
};

export const createMerchants = params => {
  return axios
    .post(`${baseURL}/openApi/edu_merchants_create`, params)
    .then(res => res.data);
};

export const checkMerchantState = params => {
  return axios.get(`${baseURL}/openApi/merchants_view`, { params: params });
};

export const reSubmitMerchant = params => {
  return axios.post(`${baseURL}/openApi/merchants_update`, params);
};

export const getMerchantsInfo = params => {
  return axios
    .get(`${baseURL}/openApi/getMerchantsInfo`, { params: params })
    .then(res => res.data);
};
//创建店铺
export const shopCreate = params => {
  return axios
    .post(`${baseURL}/openApi/shop_create`, params)
    .then(res => res.data);
};

export const shopUpdate = params => {
  return axios
    .post(`${baseURL}/openApi/shop_update`, params)
    .then(res => res.data);
};
//查看店铺list
export const checkShopState = params => {
  return axios
    .post(`${baseURL}/openApi/shop_id_list`, params)
    .then(res => res.data);
};
//短信验证码
export const phoneCode = params => {
  return axios
    .get(`${baseURL}/sms/sendMessage`, { params: params })
    .then(res => res.data);
};
//创建图片物件 type:10007 10005 10006 30001 30002
export const createPart = params => {
  return axios.post(`${baseURL}/openApi/material_add`, params);
};
export const removeUser = params => {
  return axios.get(`${baseURL}/user/remove`, { params: params });
};

export const batchRemoveUser = params => {
  return axios.get(`${baseURL}/user/batchremove`, { params: params });
};

export const editUser = params => {
  return axios.get(`${baseURL}/user/edit`, { params: params });
};

export const addUser = params => {
  return axios.get(`${baseURL}/user/add`, { params: params });
};

export const queryMaterial = params => {
  return axios
    .post(`${baseURL}/openApi/material_get`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => res.data);
};

export const deleteMaterial = params => {
  return axios
    .post(`${baseURL}/openApi/material_delete`, params)
    .then(res => res.data);
};

export const unpublishMaterial = params => {
  return axios
    .post(`${baseURL}/openApi/material_unpublish`, params)
    .then(res => res.data);
};
