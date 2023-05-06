function foo() {
  var myName = '张三'
  let test1 = 1
  const test2 = 2
  var innerBar = {
    getName: function () {
      console.log(test1);
      return myName
    },
    setName: function (newName) {
      myName = newName
    }
  }
  return innerBar
}
var bar = foo()
console.log(bar.getName()); //输出：1 张三
bar.setName('李四')
console.log(bar.getName()); //输出：1 李四