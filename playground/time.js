const moment = require("moment");

let date1 = new Date();
console.log(date1.getMonth());

let date = moment();
console.log(date.format());
console.log(
  date.format("MMM. YYYY"),
  date
    .add(100, "months")
    .subtract(10, "years")
    .add(2, "days")
    .format("DD.MM.YYYY h:mm")
);

console.log(date.format("h:mm a"));

var createdAt = 1539628389720;

date = moment(createdAt);
console.log(date.format("D.M.Y h:mm a"));

let now = moment().valueOf();
console.log(now);
