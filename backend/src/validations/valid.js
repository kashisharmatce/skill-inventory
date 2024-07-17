const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (data) {
  return Object.keys(data).length > 0;
};

const isValidString = function (input) {
  return /^[a-zA-Z0-9\s\-\.,']+$/u.test(input);
};

const isValidEmail = function (input) {
  return /^[\w\.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,}$/.test(
    input
  );
};

const isValidMobile = function (input) {
  return /\+?\d{2}\s*\-?\d+/.test(input);
};

const isValidPassword = function (input) {
  const passwordRegex = /^[a-zA-Z0-9]{6,15}$/;
  return passwordRegex.test(input);
};

const isValidPincode = function (input) {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(input);
};

const isValidPlace = function (input) {
  const placeRegex = /^[\w\s-]+$/;
  return placeRegex.test(input);
};

const isValidImage = function (input) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(input);
};

const isValidNumber = function (input) {
  return /^\d{0,8}(\.\d{1,9})?$/.test(input);
};

const isValidstatus = function (value) {
  return ["inactive", "active", "pending", "returned"].indexOf(value) !== -1;
};

module.exports.isValid = isValid;
module.exports.isValidString = isValidString;
module.exports.isValidRequestBody = isValidRequestBody;
module.exports.isValidEmail = isValidEmail;
module.exports.isValidPassword = isValidPassword;
module.exports.isValidMobile = isValidMobile;
module.exports.isValidPlace = isValidPlace;
module.exports.isValidNumber = isValidNumber;
module.exports.isValidImage = isValidImage;
module.exports.isValidstatus = isValidstatus;





// const isValidReqBody = (value) => {
//     return Object.keys(value).length > 0
// }
// module.exports.isValidReqBody=isValidReqBody;

// function isValid (data) {
//     if(typeof data !== "string" || data.trim().length == "") return false
//     else return true
// }
// module.exports.isValid=isValid;