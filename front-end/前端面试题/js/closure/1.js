function outerFunction() {
  let outerVariable = '我在outer函数里!';

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

const innerFunc = outerFunction();
innerFunc(); // 输出: 我在outer函数里!