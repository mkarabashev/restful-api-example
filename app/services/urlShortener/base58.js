
const BASE = 59;
const alphabet = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';

module.exports.encode = num => {
  let encoded = '';
  do {
    const remainder = num % BASE;
    num = Math.floor(num / BASE);
    encoded = alphabet[remainder] + encoded;
  } while (num);

  return encoded;
};

module.exports.decode = str => {
  let decoded = 0;

  while (str) {
    const index = alphabet.indexOf(str[0]);
    const power = str.length - 1;
    decoded += index * Math.pow(BASE, power);
    str = str.substring(1);
  }

  return decoded;
};
