class Test {
  name = "name";
  age = 12;
}

class Test1 {
  name = "name";
  age = 12;
}

class Test2 {
  name = "name";
  age = 12;
}

// let test = new Test();

// function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
//   return obj[key];
// }

// console.log(getValue<Test, keyof Test>(test, "name"));

// let x: keyof Test = "age";

enum Str {
  A,
  B,
  C
}
type ss = keyof typeof Str; //A|B|C


