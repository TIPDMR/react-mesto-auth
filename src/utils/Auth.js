export const BASE_URL = 'https://auth.nomoreparties.co';

const resValidation = (response) => {
  if (!response.ok) {
    return response
      .json()
      .then((data) => ({
        data: data,
      }))
      .then((res) => {
        return Promise.reject(`Ошибка: ${res.data.error || res.data.message}`);
      });
  }
  return response.json();
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => resValidation(res));
};
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => resValidation(res));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => resValidation(res))
    .then((data) => data);
};
