import { Service, authorization } from '/src/services/Service'

const resource = 'auth';

const AuthenticationService = {
  login(user_name, password) {
    return Service.post(resource, {user_name, password});
  },
  
  logout(token) {
    return Service.delete(resource,  authorization(token));
  },

  getSessionInfo(token) {
    return Service.get(resource, authorization(token));
  }
}

export default AuthenticationService;