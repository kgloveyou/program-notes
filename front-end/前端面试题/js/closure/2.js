function a() {
  function b() {
    var bb = 888
    console.log(aa);  //输出：666
  }
  var aa = 666
  return b
}
var demo = a()
demo()