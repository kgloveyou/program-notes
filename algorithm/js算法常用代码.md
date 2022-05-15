# js算法常用代码

## 1、定义长度为n，值为0的数组

```js
const left = new Array(n).fill(0);
```

## 2、数字转字符串、字符转数字

```js
n = n.toString()
n = n.split('').map(item => {
    return +item
})

n = n.join('')
return +n
```

## 3、创建二维数组并初始化为0

```js
a = Array(5).fill(0).map(x => Array(10).fill(0))
```

以上代码创建5*10列，值为0的数组。



https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/fen-ge-deng-he-zi-ji-by-leetcode-solution/

```js
const dp = new Array(n).fill(0).map(v => new Array(target + 1, false));
```

## 4、正无穷大的数组

```js
let dp = Array(amount + 1).fill(Infinity);
```

## 5、substr与substring的区别

```js
"hello".substr(1,3)	//第2个参数为子串长度
'ell'
"hello".substring(1,3)	//第2个参数为子串结尾索引+1
'el'
```

## 6、最大/小整数

```js
Number.MAX_SAFE_INTEGER
Number.MIN_SAFE_INTEGER
```

## 7、整除 parseInt

`Math.floor`不行：当`n > 0`时正确，`n < 0` 时错误。

```js
  let loop = Math.floor(n / 2);	
  let mid = Math.floor(n / 2);
```

## 8、字符的ASCII码值

```js
"a".charCodeAt()	//97
```

## 9、数组排序 sort()

sort() 方法用于对数组的元素进行排序。



默认排序顺序为按字母升序。如：

```js
[11,2,22,1].sort()	//[1, 11, 2, 22]
```



使用数字排序，你必须通过一个函数作为参数来调用。函数指定数字是按照升序还是降序排列。

**数字升序：**

```js
[11,2,22,1].sort((a, b) => a - b)	//[1, 2, 11, 22]
```

## 10、String 对象 split() 方法

省略分割参数：

```js
var str="How are you doing today?";
var n=str.split();
```

*n* 输出数组值得结果:

```js
How are you doing today?
```

分割每个字符，包括空格:

```js
var str="How are you doing today?";
var n=str.split("");
```

*n* 输出数组值得结果:

```js
H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?
```

## 11、交换赋值

```js
[a, b] = [b, a];
```

## 12、数组的方法（push, shift,pop）

用途：使用数组（push, shift）模拟队列。

- shift

shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。

**注意：** 此方法改变数组的长度！

**提示:** 移除数组末尾的元素可以使用 [pop()](https://www.runoob.com/jsref/jsref-pop.html) 方法。

**实例**

从数组中移除元素:

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.shift()
```

*fruits*结果输出:

```js
Orange,Apple,Mango
```

- pop

pop() 方法用于删除数组的最后一个元素并返回删除的元素。

**注意：**此方法改变数组的长度！

**提示：** 移除数组第一个元素，请使用 [shift()](https://www.runoob.com/jsref/jsref-shift.html) 方法。



移除最后一个数组元素：

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"]; 
fruits.pop();
```

*fruits* 结果输出：

```js
Banana,Orange,Apple
```

## 13、Map数据结构

https://es6.ruanyifeng.com/#docs/set-map#Map

**（1）Map 转为数组**

前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（`...`）。

```js
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

347. `前 K 个高频元素`，巧用该特性实现排序，

     https://leetcode-cn.com/problems/top-k-frequent-elements/solution/-by-uniquelee-711h/

**（2）数组 转为 Map**

将数组传入 Map 构造函数，就可以转为 Map。

```js
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```



