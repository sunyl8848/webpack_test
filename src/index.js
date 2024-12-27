// import fail from "./assert/image/fail.png";
import "./index.css";
// import "./index.less";
// import "./index.scss";

// console.log(fail);

console.log("new text xxxxxxxxxxxxxxxxx");

class TestCls {
  name = "test_name";
  age = 12;
  constructor() {
    this.sex = "male";
  }
}

let testCls = new TestCls();
testCls.name = "test2_name";
console.log(testCls.name);

let promise = Promise.resolve(3);
promise.then((rst) => console.log(rst));
