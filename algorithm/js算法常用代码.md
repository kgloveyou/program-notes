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

## 4、正无穷大的数值

```js
let dp = Array(amount + 1).fill(Infinity);
```

