// upper-loader.js
module.exports = function (source) {
  // 转换源代码为大写
  const upperCaseContent = source.toUpperCase();
  let obj = { content: upperCaseContent };
  return `export default ${JSON.stringify(obj)}`;
};
