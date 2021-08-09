function MyPromise(executor){
  let self = this; //这个 this 指的是 new 出来的 promise 实例
  this.status = 'pending'; // 实例中的 pending 状态

  function resolve(value){ // 你不可以直接在这个函数里使用 this，请思考这个函数里的 this 是谁？函数的作用域里面有专属于自己的 this，它的值取决于函数在哪里执行。
      if(self.status==='pending'){
          console.log(this,'resolve')
          self.value=value;
          self.status='resolved';
      }
  }
  function reject(reason){
      if(self.status==='pending'){
          console.log('reject')
          self.value=reason;
          self.status = 'rejected';
      }
  }
  executor(resolve,reject);
}

MyPromise.prototype.then = function(onFulfilled,onRejected){
  let self = this
  if(self.status==='resolved'){
      onFulfilled(self.value)
  }
  if(self.status==='rejected'){
      onRejected(self.reason)
  }
}

var p = new MyPromise(function(resolve,reject){
  setTimeout(()=>resolve(5),1000);
}).then(value=>{
  console.log('then',value);
})