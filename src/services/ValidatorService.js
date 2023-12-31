const ValidatorService = {
  validateCode(code) {
    if(code.includes(' ')) return false;
    return code.length >= 3;      
  },
  validateName(name) {
    if(name.includes(' ')) return false;
    return name.length >= 5;      
  },
  validateString(string) {
    return string.length >= 5;      
  },
  validateEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  },
  validateAmount(amount) {
    if(isNaN(amount)) return false;
    return amount > 0;
  },
  validateNumber(number) {
    return !isNaN(number);
  },
  validateItemList(list,item,prop) {
    return list.filter((el) => el[prop] === item[prop]).length !== 0;
  },
  validatePhone(phone) {
    if(isNaN(phone)) return false;
    return phone.length >= 10;
  },
  validateAddress(address) {
    return address.length >= 10;
  },
  validateRif(rif) {
    const rifRegex = /^[V|E|J|P][0-9]{5,9}$/;
    return rifRegex.test(rif);
  }
}

export default ValidatorService;