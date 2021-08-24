/*
 * 2021-08-23 17:28:51
 * @create by: zj
 * @Description: 
 */
const EOF = Symbol("EOF") // End Of File

function data(c) {
  if (c === "<") {
    return tagOpen
  } else if (c == EOF) {
    return
  }else {
    return data
  }
}
module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
  console.log(html);
}