import axios from 'axios'

const port =  '3000';

let be = window.location.origin;
be = be.replace(/:\d+$/, '');
const backEndURL = `${be}:${port}/`;

// const backEndURL = 'http://localhost:3000/';
// const backEndURL = 'http://179.0.104.124:3000/';
// const backEndURL = 'http://192.168.0.237:3000/';

const baseURL = `${backEndURL}api/v1/`;

const Service = axios.create({ baseURL });

function authorization(token){
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  }
}

export { authorization, Service, backEndURL }
