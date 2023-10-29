import { Service, authorization } from '/src/services/Service'

const resource = 'countries'

const CountryService = {
  getCountries(token) {
    return Service.get(resource, authorization(token));
  }
}

export default CountryService;