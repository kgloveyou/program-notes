var start = new Date();
setTimeout(function cb() {
  console.log("时间间隔：", new Date() - start + 'ms');
}, 500);
while (new Date() - start < 1000) { };
