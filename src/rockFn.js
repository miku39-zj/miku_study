/*
 * 2021-07-28 08:35:26
 * @create by: zj
 * @Description: 箭头函数
 */
// 箭头函数 不能使用arguments、super，不能用作构造函数，没有prototype
// 不能直接修改箭头函数的this指向
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const code = `
  const fnc = () => {
    let a = 10;
    let foo = () => {
      console.log(a);
    }
    return foo()
  }
`;
let ast = parser.parse(code);

traverse(ast, {
  // enter(path) {
    // console.log(path.node === 'foo',"path");
    // console.log(path.scope.dump());
  // },
  // ArrowFunctionExpression (path) {
  //   console.log(path.node,"456");
  //   console.log(path.scope.dump())
  // }
  // FunctionDeclaration (path) {
  //   console.log(path,"path");
  //   if (path.get('id.name').node === 'foo') {
  //     console.log(path.scope.dump());
  //   }
  // }
})

const fnc = () => {
  let a = 10;
  let foo = () => {
    console.log(a);
  }
  console.table(foo);
  console.log(1);
}
const func2 = fnc()