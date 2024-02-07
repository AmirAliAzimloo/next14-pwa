let moment = require("moment-jalaali");

function dateJalali(value : string, format = "HH:mm:ss - jYYYY/jM/jD") {
  if (!value) return "";
  return moment(value).format(format);
}


function dateMilady(value : string) {
  if (!value) return "";
  return moment(value, "jYYYY/jM/jD").format("YYYY-M-D");
}
export { dateJalali,  dateMilady };
