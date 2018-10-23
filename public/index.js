/* URL SEARCH STRING in JS
let obj = {
  name: "Gregor",
  text: "mojtext"
}
Object.keys(obj).map(key => `${key}=${obj[key]}`);
  rezultat: name=Gregor&text=mojtext
*/
/* DECODING location.search TO STRING
function decodeSearchStringToObject() {
  var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;
  for (i in pairs) {
    if (pairs[i] === "") continue;
    pair = pairs[i].split("=");
    obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return obj;
}
*/
