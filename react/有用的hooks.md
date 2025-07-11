# useDeepCompareEffect

https://ahooks.js.org/zh-CN/hooks/use-deep-compare-effect

`useDeepCompareEffect` 是一个自定义 React Hook（通常来自第三方库如 `use-deep-compare-effect`），用于在依赖项对象发生深层变化时执行副作用。它通过深度比较依赖项来避免不必要的重复渲染，常用于依赖项为**对象或数组**的场景。 

功能简述如下： 

- 替代 `useEffect` 中对复杂对象/数组的浅比较 
- 仅当依赖项内容真正改变时才触发 effect 
- 避免因引用地址变化而误触发 effect

##  注意事项

1. **性能问题**：深度比较比引用比较更耗性能，尤其是对大型对象或数组。因此应仅在必要时使用。
2. **第三方库依赖**：上面的例子用了 `lodash/isEqual` 做深度比较，也可以自己实现简易版本或使用其他库如 `fast-deep-equal`。
3. **不能完全代替 `useEffect`**：对于原始值（string、number、boolean 等）仍推荐使用原生 `useEffect`，因为它更快更简单。

## 总结

| 特性           | `useEffect`  | `useDeepCompareEffect`                |
| -------------- | ------------ | ------------------------------------- |
| 默认比较方式   | 浅比较       | 深度比较                              |
| 适合场景       | 原始类型依赖 | 对象/数组依赖                         |
| 性能           | 快速         | 相对慢                                |
| 是否需额外依赖 | 否           | 是（如 lodash 或其他 deepEqual 工具） |

# useDebounceEffect

https://ahooks.js.org/zh-CN/hooks/use-debounce-effect

为 `useEffect` 增加防抖的能力。

