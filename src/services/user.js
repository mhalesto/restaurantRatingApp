import { API_URL } from '../config';

export function loginService(userObj){
  return  fetch(
    `${API_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(userObj)
  })
  .then((response) => response.json())
  .then((responseJson) => {

  return responseJson;

  })
  .catch((error) =>{
    console.error(error);
  });
}

export function registerService(userObj){
  return  fetch(
    `${API_URL}/registerUser`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(userObj)
  })
  .then((response) => response.json())
  .then((responseJson) => {

  return responseJson;

  })
  .catch((error) =>{
    console.error(error);
  });
}

export const logoutService = function() {
  // remove user from local storage to log user out
  localStorage.removeItem('loginState');
}