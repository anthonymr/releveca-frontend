import { Service, authorization } from '/src/services/Service'

const authenticationResource = 'auth';

const AuthenticationService = {
  login(user_name, password) {
    return Service.post(authenticationResource, {user_name, password});
  },
  
  logout(token) {
    return Service.delete(authenticationResource,  authorization(token));
  },

  getSessionInfo(token) {
    return Service.get(authenticationResource, authorization(token));
  }
}

export default AuthenticationService;