const myModule = (function () {
  let privateVariable = '我是私有的!';

  function privateMethod() {
    console.log(privateVariable);
  }

  return {
    publicMethod: function () {
      privateMethod();
    }
  };
})();

myModule.publicMethod(); // 输出: 我是私有的!