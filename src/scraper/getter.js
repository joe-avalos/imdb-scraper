const request = require("request-promise");
const fs = require("fs");

const getHtml = async (url) => {
  return await request.get(url);
};

const saveHtml = (html, path) => {
  fs.writeFileSync(path, html);
};

module.exports = {
  getHtml,
  saveHtml,
};
