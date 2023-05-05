function add() {
  let count = 0
  function a() {
    count++
    console.log(count);
  }
  return a
}
var res = add()
res() //1 
res() //2
res() //3