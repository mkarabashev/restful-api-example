
// this produces the whoami part of the json response
module.exports = data => {
  const os = data.os;
  const languages = data.language.split(';')[0];
  const ipaddress = (data.proxy || data.remoteAddress).split(',')[0];
  return { whoami: { ipaddress, languages, os } };
};
