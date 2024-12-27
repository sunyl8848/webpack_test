function fn() {}

console.log(Object.getOwnPropertyDescriptors(fn.__proto__.__proto__.__proto__));
