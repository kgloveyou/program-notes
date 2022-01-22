# js算法常用代码

1. 定义长度为n，值为0的数组

```js
const left = new Array(n).fill(0);
```

2、数字转字符串、字符转数字

```js
n = n.toString()
n = n.split('').map(item => {
    return +item
})

n = n.join('')
return +n
```

