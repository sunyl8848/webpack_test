import * as $ from "jquery";
import moment from "moment";
//import "moment/locale/zh-cn";
moment.locale("zh-cn");

console.log($);
console.log("testA");
console.log(moment().subtract(6, "days").calendar());
