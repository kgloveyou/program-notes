# React

## 1、React router 的两种模式，怎么动态获取路由上的 id

（天眼查）

[说说React Router有几种模式？实现原理？](https://vue3js.cn/interview/React/React%20Router%20model.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

- hash 模式：在url后面加上#，如http://127.0.0.1:5500/home/#/page1
- history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录

```tsx
const id = +own.match.params.id;
```

其中：`own: Props`

