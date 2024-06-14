import axios from 'axios';

export const BASE_URL = 'https://fakestoreapi.com/'

export const END_POINTS = {
  products: 'products',
  carts: 'carts'
}

export const APIManager = {
  get: (endPoint, callback) => {
      axios.get(BASE_URL + endPoint)
    .then(function (response) {
      // handle success
      callback({
        status: response?.status,
        response: response?.data,
      })
    })
    .catch(function (error) {
      // handle error
      callback({
        status: response?.status,
        error: error,
      })
    })
  },

  post: (endPoint, params) => {
    return axios.post(BASE_URL + endPoint, params)
  },

  delete: (endPoint, id) => {
    return axios.delete(BASE_URL + endPoint + '/' + id)
  }
}

handleResponse = () => {
  
}