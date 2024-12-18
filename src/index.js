// import fail from "./assert/image/fail.png";
import "./index.css";
import txt from "./test.txt";
// import "./index.less";
// import "./index.scss";

// console.log(fail);

console.log(txt);

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
