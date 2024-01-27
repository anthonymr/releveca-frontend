import axios from 'axios'

const baseURL = 'http://192.168.0.237/:3000/api/v1/';

const Service = axios.create({ baseURL });

function authorization(token){
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  }
}

export { authorization, Service }