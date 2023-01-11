// W3C Eamil Regex(https://www.w3.org/TR/2012/WD-html-markup-20120329/input.email.html)
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 8;
};

export default {
  validateEmail,
  validatePassword,
};
