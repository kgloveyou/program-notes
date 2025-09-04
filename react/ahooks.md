# useAsyncEffect

`useAsyncEffect` 是 `ahooks` 库提供的一个增强型副作用 Hook，用于在 `useEffect` 中**更安全、更方便地处理异步操作**。

它本质上是对原生 `useEffect` 的封装，解决了在 `useEffect` 中直接使用 `async/await` 时出现的 **“不支持返回 Promise”** 和 **“无法正确处理异步清理”** 的问题。

---

### ❌ 为什么不能直接在 `useEffect` 中使用 `async`？

```ts
// ❌ 错误示例：不能这样做
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);
```

**原因：**
- `useEffect` 的回调函数如果返回一个函数，必须是清理函数（用于解绑事件、清除定时器等）。
- `async` 函数**总是返回一个 Promise**，即使你返回一个函数，也会被包装成 `Promise<Function>`。
- React 无法处理 Promise 类型的返回值，会导致 **“Effect callbacks are synchronous to prevent race conditions”** 警告或潜在的内存泄漏。

---

### ✅ `useAsyncEffect` 的解决方案

`useAsyncEffect` 允许你直接使用 `async/await`，并能正确处理异步清理逻辑。

#### 基本用法

```ts
import { useAsyncEffect } from 'ahooks';

useAsyncEffect(async () => {
  const data = await fetch('/api/user');
  const user = await data.json();
  console.log('用户数据:', user);
}, []); // 依赖数组，与 useEffect 一致
```

---

### 🔧 支持异步清理（高级用法）

这是 `useAsyncEffect` 的强大之处：它允许你在组件卸载或依赖变化时，执行**异步清理操作**。

```ts
useAsyncEffect(
  async (isMounted) => {
    console.log('开始连接 WebSocket');

    const ws = new WebSocket('wss://example.com');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    // 模拟接收消息
    ws.onmessage = (event) => {
      console.log('收到消息:', event.data);
    };

    // 返回一个清理函数（可以是异步的）
    return async () => {
      if (isMounted()) {
        console.log('正在关闭 WebSocket...');
        await new Promise(resolve => {
          ws.close();
          setTimeout(resolve, 100); // 模拟关闭延迟
        });
        console.log('WebSocket 已关闭');
      }
    };
  },
  []
);
```

#### 参数说明：
- `isMounted`: 一个函数，用于检查组件是否仍然挂载（避免在卸载组件上 setState）。
- 返回的清理函数可以是 `async`，`useAsyncEffect` 会等待其完成。

---

### 💡 常见使用场景

#### 1. 异步数据获取（带取消）

```ts
useAsyncEffect(
  async (isMounted) => {
    try {
      const controller = new AbortController();
      
      const response = await fetch('/api/data', { signal: controller.signal });
      const data = await response.json();

      if (isMounted()) {
        setData(data);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('请求失败:', error);
      }
    }

    // 清理：取消请求
    return () => {
      controller.abort();
    };
  },
  []
);
```

#### 2. 订阅/取消订阅（异步资源）

```ts
useAsyncEffect(
  async (isMounted) => {
    const subscription = eventBus.subscribe('user:login', handleLogin);

    return async () => {
      await subscription.unsubscribe(); // 假设 unsubscribe 是异步的
    };
  },
  []
);
```

#### 3. 初始化复杂异步服务

```ts
useAsyncEffect(async () => {
  await authService.init(); // 初始化认证服务
  await analyticsService.load(); // 加载分析脚本
  console.log('所有服务初始化完成');
}, []);
```

---

### ⚠️ 注意事项

1. **不是所有场景都需要**
   - 如果只是简单请求，使用 `try/catch` + `useEffect` 也可以。
   - 推荐在需要**异步清理**或**确保清理完成**时使用。

2. **避免阻塞组件卸载**
   - 虽然 `useAsyncEffect` 会等待清理函数完成，但长时间的异步清理可能影响用户体验。
   - 建议设置超时或使用 `isMounted()` 避免内存泄漏。

3. **与 `useRequest` 的区别**
   | 方案             | 适用场景                                              |
   | ---------------- | ----------------------------------------------------- |
   | `useAsyncEffect` | 通用异步副作用，支持异步清理                          |
   | `useRequest`     | 专注于数据请求，提供 loading、error、retry 等完整状态 |

---

### 总结

`useAsyncEffect` 是处理 **复杂异步副作用** 的理想选择，特别是当你需要：

- ✅ 在 `useEffect` 中使用 `async/await`
- ✅ 执行异步清理操作（如关闭连接、取消订阅）
- ✅ 确保资源被正确释放

它弥补了原生 `useEffect` 对异步支持的不足，是 `ahooks` 中提升开发体验和代码健壮性的重要工具。

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

`useDebounceEffect` 是 `ahooks` 库提供的一个非常实用的自定义 Hook，它结合了 **`useEffect`** 和 **防抖（Debounce）** 功能。

---

### 📌 核心功能

`useDebounceEffect` 的作用是：**在依赖项变化时，延迟执行副作用函数，并且在延迟期间如果依赖项再次变化，会取消之前的执行，只执行最后一次。**

这可以有效避免频繁触发副作用（如网络请求、计算、事件处理等），提升性能和用户体验。

---

### ✅ 与 `useEffect` + `useDebounce` 的对比

#### ❌ 传统方式的问题

你可能会这样手动实现防抖：

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('搜索:', keyword);
    // 执行搜索
  }, 500);
  return () => clearTimeout(timer); // 清理上一次
}, [keyword]);
```

这种方式虽然可行，但逻辑分散，容易出错，且不便于复用。

#### ✅ 使用 `useDebounceEffect`

```tsx
import { useDebounceEffect } from 'ahooks';

useDebounceEffect(
  () => {
    console.log('搜索:', keyword);
    // 执行搜索
  },
  [keyword],
  {
    wait: 500, // 延迟 500ms
  }
);
```

代码更简洁、语义更清晰。

---

### 🔧 参数说明

```ts
useDebounceEffect(
  effect: () => void | (() => void),  // 副作用函数（可返回清理函数）
  deps: any[],                        // 依赖数组（同 useEffect）
  options?: {
    wait?: number;                   // 延迟时间（毫秒），默认 1000
    leading?: boolean;               // 是否在开始时立即执行一次（默认 false）
    trailing?: boolean;              // 是否在结束时执行一次（默认 true）
    maxWait?: number;                // 最大等待时间（节流式防抖）
  }
);
```

---

### 💡 常见使用场景

#### 1. 搜索输入框（防抖请求）

```tsx
const SearchComponent = () => {
  const [keyword, setKeyword] = useState('');

  useDebounceEffect(
    () => {
      if (keyword) {
        fetch(`/api/search?q=${keyword}`).then(res => {
          // 更新搜索结果
        });
      }
    },
    [keyword],
    { wait: 300 }
  );

  return (
    <input
      value={keyword}
      onChange={e => setKeyword(e.target.value)}
      placeholder="输入关键词搜索..."
    />
  );
};
```

> ✅ 避免用户每输入一个字符就发一次请求。

#### 2. 监听窗口大小变化（避免频繁重绘）

```tsx
useDebounceEffect(() => {
  console.log('窗口大小变化:', window.innerWidth, window.innerHeight);
  // 执行复杂的布局计算或图表重绘
}, [width, height], { wait: 200 });
```

#### 3. 表单自动保存

```tsx
useDebounceEffect(() => {
  if (formChanged) {
    saveForm(data); // 自动保存草稿
  }
}, [data], { wait: 1000 });
```

---

### ⚠️ 注意事项

1. **副作用函数可以返回清理函数**（类似于 `useEffect`）：

   ```ts
   useDebounceEffect(() => {
     const subscription = someObservable.subscribe();
     return () => subscription.unsubscribe(); // 清理
   }, [deps], { wait: 500 });
   ```

2. **`leading` 和 `trailing` 行为**：
   - `leading: true`：第一次变化时立即执行，之后防抖。
   - `trailing: false`：不执行最后一次延迟调用（较少用）。

3. **`maxWait`**：设置最大等待时间，即使持续变化，也会每隔一段时间强制执行一次（类似节流）。

---

### 🆚 相似 Hook 对比

| Hook                | 说明                                                        |
| ------------------- | ----------------------------------------------------------- |
| `useEffect`         | 普通副作用                                                  |
| `useDebounceFn`     | 返回一个防抖函数，需手动调用                                |
| `useDebounceEffect` | **自动监听依赖，自动执行防抖副作用** ✅ 推荐用于自动触发场景 |

---

### 总结

`useDebounceEffect` 是处理 **“依赖变化后延迟执行副作用”** 场景的最佳选择。它：

- ✅ 简化了防抖逻辑
- ✅ 避免频繁请求或渲染
- ✅ 提升用户体验
- ✅ API 清晰，配置灵活

> 推荐在搜索、自动保存、频繁状态监听等场景中使用 `useDebounceEffect`。

# useMemoizedFn

`useMemoizedFn` 是 `ahooks` 这个 React Hooks 工具库中的一个非常实用的 Hook。

### 核心功能

`useMemoizedFn` 的主要作用是 **返回一个函数的 memoized（记忆化）版本，这个函数在组件的整个生命周期内保持不变（引用地址不变）**。

这解决了在 React 函数组件中使用 `useCallback` 时，依赖项变化导致函数引用也变化的问题。

### 为什么需要 `useMemoizedFn`？

在 React 中，我们经常使用 `useCallback` 来缓存函数，避免子组件因父组件重新渲染而不必要的重新渲染：

```jsx
const MyComponent = ({ userId }) => {
  const fetchUser = useCallback(() => {
    console.log('Fetching user:', userId);
    // ... fetch logic
  }, [userId]); // 注意：这里依赖了 userId

  return <ChildComponent onFetch={fetchUser} />;
};
```

**问题：** 当 `userId` 变化时，`fetchUser` 函数会重新创建，导致其引用改变。如果 `ChildComponent` 使用 `React.memo` 优化，它仍然会重新渲染，因为 `onFetch` 属性的引用变了。

### `useMemoizedFn` 如何解决？

`useMemoizedFn` 创建的函数**永不改变引用**，并且它能访问到最新的组件状态和 props。

```jsx
import { useMemoizedFn } from 'ahooks';

const MyComponent = ({ userId }) => {
  const fetchUser = useMemoizedFn(() => {
    console.log('Fetching user:', userId); // 能访问到最新的 userId
    // ... fetch logic
  });

  // ✅ fetchUser 的引用在整个组件生命周期中永远不会变！

  return <ChildComponent onFetch={fetchUser} />;
};
```

### 关键特性

1.  **引用稳定：** 返回的函数引用永远不会变，非常适合传递给子组件做 props。
2.  **访问最新值：** 尽管函数引用不变，但它内部能访问到最新的 `props` 和 `state`（通过闭包的更新机制）。
3.  **无需依赖项数组：** 与 `useCallback` 不同，`useMemoizedFn` 不需要指定依赖项，减少了出错的可能性。

### 使用场景

*   **作为子组件的事件回调：** 尤其当子组件使用 `React.memo` 时，避免因父组件重新渲染或依赖项变化导致的不必要更新。
*   **在 `useEffect` 或其它 Hook 中作为依赖：** 如果某个 Hook 依赖一个函数，使用 `useMemoizedFn` 可以避免这个依赖项频繁变化。
*   **需要稳定函数引用的任何地方。**

### 总结

`useMemoizedFn` 是 `ahooks` 提供的一个增强版 `useCallback`，它通过更智能的机制保证了函数引用的绝对稳定，同时不牺牲对最新状态的访问能力，是优化 React 组件性能和避免不必要渲染的有力工具。

# useUpdateEffect

`useUpdateEffect` 是 `ahooks` 库中一个非常实用的自定义 Hook，它是对 React 原生 `useEffect` 的增强。

### 核心功能

`useUpdateEffect` 的作用是：**只在依赖项更新时执行副作用函数，而不会在组件首次渲染（mount）时执行。**

这与原生的 `useEffect` 有显著区别。

---

### 与 `useEffect` 的对比

#### 原生 `useEffect`

```jsx
useEffect(() => {
  console.log('useEffect: 执行了');
}, [dep]);
```

- **执行时机**：在**首次渲染后**以及**每次依赖项 `dep` 变化后**都会执行。
- 也就是说，它会执行两次：第一次挂载后 + 后续每次依赖变化。

#### `useUpdateEffect` (来自 ahooks)

```jsx
import { useUpdateEffect } from 'ahooks';

useUpdateEffect(() => {
  console.log('useUpdateEffect: 执行了');
}, [dep]);
```

- **执行时机**：**仅在依赖项 `dep` 发生变化时执行**，**跳过首次渲染**。
- 也就是说，它只在后续更新时执行，首次渲染不会触发。

---

### 为什么需要 `useUpdateEffect`？

在某些场景下，你只想在 `props` 或 `state` **更新时**才执行某些逻辑，而不想在组件**初次挂载时**就执行。如果用 `useEffect`，你需要手动处理，容易出错。

#### 常见使用场景

1.  **表单值变化时触发请求（但不想首次加载就请求）**

    ```jsx
    const [userId, setUserId] = useState(1);

    // 我们只想在 userId 改变时获取用户信息，而不是组件一加载就触发
    useUpdateEffect(() => {
      fetchUser(userId);
    }, [userId]);
    ```

2.  **监听父组件传来的 `props` 变化并做出响应**

    ```jsx
    function ChildComponent({ userName }) {
      useUpdateEffect(() => {
        console.log(`${userName} changed!`);
        // 做一些副作用，比如上报埋点、重置内部状态等
      }, [userName]);

      return <div>Hello, {userName}</div>;
    }
    ```

3.  **避免与 `useState` 初始化冲突**

    有时初始化状态会触发 `useEffect`，但你只想在用户交互后状态变化时才执行逻辑。

---

### 内部实现原理（简化版）

`useUpdateEffect` 的核心思路是使用一个 `ref` 来标记是否是首次渲染：

```jsx
import { useEffect, useRef } from 'react';

function useUpdateEffect(effect, deps) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true; // 标记已挂载
    } else {
      return effect(); // 只在更新时执行
    }
  }, deps);
}
```

---

### 总结

| Hook              | 首次渲染执行 | 依赖更新时执行 |
| ----------------- | ------------ | -------------- |
| `useEffect`       | ✅ 是         | ✅ 是           |
| `useUpdateEffect` | ❌ 否         | ✅ 是           |

✅ **推荐使用 `useUpdateEffect` 的场景**：
- 你明确希望**跳过首次执行**。
- 你只想响应**后续的变化**。
- 避免不必要的网络请求或副作用。

它是 `ahooks` 中提升开发体验和代码清晰度的典型例子。

# useFocusWithin

`useFocusWithin` 是 `ahooks` 库中的一个实用 Hook，用于**监听某个 DOM 元素或其子元素是否获得了焦点**。

它返回一个布尔值，表示当前目标元素**及其后代元素**是否处于“聚焦其中”（focus within）的状态。

---

### 📌 核心功能

`useFocusWithin` 用于判断焦点是否落在某个容器内部，常用于实现：

- 弹窗（Modal/Popover）的自动关闭
- 表单区域的聚焦状态管理
- 可编辑区域（如富文本）的激活状态检测
- “点击外部关闭”功能的增强版（基于焦点而非点击）

---

### ✅ 使用方式

```tsx
import { useFocusWithin } from 'ahooks';

const MyComponent = () => {
  const ref = useRef(null);
  const isFocusWithin = useFocusWithin(ref);

  return (
    <div ref={ref} style={{ padding: 20, border: '1px solid #ccc' }}>
      <p>Focus within: {isFocusWithin ? 'Yes' : 'No'}</p>
      <input type="text" placeholder="点击我试试" />
      <button>按钮</button>
    </div>
  );
};
```

在这个例子中：

- 当你点击 `input` 或 `button` 时，`isFocusWithin` 变为 `true`
- 当你点击容器外部时，`isFocusWithin` 变为 `false`

---

### 🔧 参数与返回值

#### 参数

- `ref`: 一个 React `ref`，绑定到你要监听的 DOM 容器元素上。

#### 返回值

- `boolean`: 表示当前是否有元素在目标容器内获得焦点。

---

### 💡 常见使用场景

#### 1. 实现“失去焦点关闭弹层”功能

```tsx
const Dropdown = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const isFocusWithin = useFocusWithin(ref);

  useEffect(() => {
    if (!isFocusWithin && open) {
      setOpen(false); // 失去焦点时关闭
    }
  }, [isFocusWithin, open]);

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && (
        <div className="dropdown">
          <input type="text" placeholder="输入内容..." />
          <button>确认</button>
        </div>
      )}
    </div>
  );
};
```

> ✅ 比 `onClickOutside` 更准确：用户用 Tab 键离开时也能正确触发关闭。

#### 2. 表单区域高亮或激活状态

```tsx
const FormSection = () => {
  const ref = useRef(null);
  const isFocused = useFocusWithin(ref);

  return (
    <div
      ref={ref}
      style={{
        border: `2px solid ${isFocused ? '#1890ff' : '#ddd'}`,
        padding: 16,
        borderRadius: 4,
      }}
    >
      <input placeholder="姓名" />
      <input placeholder="邮箱" />
    </div>
  );
};
```

---

### ⚠️ 注意事项

1. **必须传入有效的 `ref`**，且该 `ref` 已挂载到 DOM 元素上。
2. 监听的是 `focusin` 和 `focusout` 事件（比 `focus`/`blur` 更适合事件冒泡）。
3. 适用于支持 `HTMLElement` 的环境（浏览器）。

---

### 🆚 与 `useFocus` 的区别

| Hook             | 说明                                                   |
| ---------------- | ------------------------------------------------------ |
| `useFocus`       | 监听**某个元素自身**是否获得焦点（精确到单个元素）     |
| `useFocusWithin` | 监听**某个元素或其任意子元素**是否获得焦点（范围监听） |

👉 所以 `useFocusWithin` 更适合监听“一个区域”的聚焦状态。

---

### 总结

`useFocusWithin` 是一个轻量但非常实用的 Hook，特别适合处理**容器级的聚焦状态管理**。它简化了原本需要手动监听 `focusin`/`focusout` 的复杂逻辑，提升了开发效率和用户体验（尤其是键盘导航场景）。

> 推荐在需要判断“用户是否正在操作某个区域”的场景中使用它。

# useLockFn

`useLockFn` 是 `ahooks` 库中一个非常实用的自定义 Hook，用于**防止异步函数被重复调用**，即在前一次函数执行未完成时，阻止后续调用。

它特别适合用于处理按钮重复点击、防止表单重复提交、避免并发请求等场景。

---

### 📌 核心功能

`useLockFn` 接收一个**异步函数**，并返回一个“加锁版本”的函数。这个函数在执行期间（Promise 未 resolve/reject）会锁定状态，后续调用将直接返回 `undefined`，从而避免重复执行。

---

### ✅ 基本用法

```tsx
import { useLockFn } from 'ahooks';

const Demo = () => {
  const submit = useLockFn(async (name: string) => {
    await waitTime(3000); // 模拟网络请求
    console.log(`提交成功: ${name}`);
    return 'ok';
  });

  return (
    <>
      <button onClick={() => submit('foo')}>
        提交（防重复）
      </button>
      <button onClick={() => console.log('普通点击')}>
        普通按钮
      </button>
    </>
  );
};
```

**效果：**
- 第一次点击“提交”按钮：函数开始执行。
- 在 3 秒内再次点击：**无任何反应**（`submit` 返回 `undefined`）。
- 3 秒后点击：可以再次正常执行。

---

### 🔧 参数说明

```ts
useLockFn<T extends (...args: any[]) => Promise<any>>(fn: T): (...args: Parameters<T>) => ReturnType<T> | undefined
```

- **输入**：一个返回 `Promise` 的异步函数。
- **输出**：一个“锁定版本”的函数，类型安全，参数和原函数一致。
- 当函数正在执行时，调用返回 `undefined`。
- 当函数执行完成（无论成功或失败），锁自动释放，可再次调用。

---

### 💡 常见使用场景

#### 1. 防止表单重复提交

```tsx
const handleSubmit = useLockFn(async (formData) => {
  try {
    await api.submitForm(formData);
    message.success('提交成功');
  } catch (error) {
    message.error('提交失败');
  }
});
```

> ✅ 用户狂点提交按钮也不会重复发请求。

#### 2. 支付或下单操作

```tsx
const handlePay = useLockFn(async (orderId) => {
  const result = await api.payOrder(orderId);
  if (result.success) {
    navigate('/success');
  }
});
```

> 防止用户手抖多次支付。

#### 3. 分页加载“加载更多”

```tsx
const loadMore = useLockFn(async () => {
  const data = await api.fetchList(page + 1);
  setList(prev => [...prev, ...data]);
  setPage(p => p + 1);
});
```

> 防止用户快速多次点击“加载更多”，导致数据重复加载。

#### 4. 与 `useRequest` 对比

| 方案         | 特点                                                        |
| ------------ | ----------------------------------------------------------- |
| `useRequest` | 功能全面（loading、error、retry、防抖等），适合复杂请求管理 |
| `useLockFn`  | **轻量、专注“防重复调用”**，适合已有异步逻辑的快速加锁      |

👉 `useLockFn` 更像是一个“函数装饰器”，不改变原有逻辑，只加一层锁。

---

### ⚠️ 注意事项

1. **仅适用于异步函数（返回 Promise）**
   ```ts
   // ❌ 错误：同步函数
   useLockFn(() => console.log('hello'));

   // ✅ 正确：异步函数
   useLockFn(async () => { ... });
   ```

2. **返回值类型包含 `undefined`**
   - 调用被阻止时返回 `undefined`，使用时注意类型判断：
     ```ts
     const result = await submit();
     if (result) {
       // 只有真正执行时才有返回值
     }
     ```

3. **不会自动设置 loading 状态**
   - `useLockFn` 只负责“锁住函数调用”，不提供 `loading` 状态。
   - 如果需要 UI 反馈（如按钮 loading），建议结合 `useState`：

     ```tsx
     const [loading, setLoading] = useState(false);
     const submit = useLockFn(async (data) => {
       setLoading(true);
       try {
         await api.submit(data);
       } finally {
         setLoading(false);
       }
     });
     ```

---

### 总结

`useLockFn` 是一个**轻量、精准、类型安全**的防重复调用工具，特别适合：

- ✅ 快速为异步操作添加“防重复”能力
- ✅ 避免引入 `useRequest` 的复杂性
- ✅ 与现有逻辑无缝集成

> 推荐在**任何可能被频繁触发的异步操作**中使用 `useLockFn`，提升用户体验和系统稳定性。

# usePrevious

`usePrevious` 是 `ahooks` 库中一个简洁而实用的自定义 Hook，用于 **获取某个值在上一次渲染时的值**。

它类似于类组件中的 `componentDidUpdate(prevProps, prevState)` 中的 `prevProps` 或 `prevState`，但在函数组件中使用更加直观。

---

### 📌 核心功能

`usePrevious` 接收一个值作为参数，返回该值在**上一次渲染时的值**。首次渲染时，由于没有“上一次”，通常返回 `undefined`。

---

### ✅ 基本用法

```tsx
import { usePrevious } from 'ahooks';

const MyComponent = ({ count, name }) => {
  const prevCount = usePrevious(count);
  const prevName = usePrevious(name);

  console.log('当前 count:', count);
  console.log('上一次 count:', prevCount);

  console.log('当前 name:', name);
  console.log('上一次 name:', prevName);

  return (
    <div>
      <p>当前值: {count}</p>
      <p>上一次值: {prevCount ?? '无'}</p>
    </div>
  );
};
```

**输出示例：**
```
// 初始渲染
当前 count: 0
上一次 count: undefined

// count 变为 1 后
当前 count: 1
上一次 count: 0

// count 变为 2 后
当前 count: 2
上一次 count: 1
```

---

### 🔧 参数说明

```ts
usePrevious<T>(value: T): T | undefined
```

- `value`: 当前要追踪的值（可以是 `props`、`state`、计算值等）。
- 返回值：上一次渲染时 `value` 的值，**首次渲染返回 `undefined`**。

---

### 💡 常见使用场景

#### 1. 监听 `props` 或 `state` 的变化（替代 `useEffect` 依赖数组判断）

```tsx
const Counter = ({ count }) => {
  const prevCount = usePrevious(count);

  useEffect(() => {
    if (prevCount !== undefined && count !== prevCount) {
      console.log(`count 从 ${prevCount} 变为 ${count}`);
    }
  }, [count, prevCount]);

  return <div>{count}</div>;
};
```

> ✅ 可以明确知道“从什么值变到什么值”。

#### 2. 检测组件是否首次渲染

```tsx
const MyComponent = ({ data }) => {
  const prevData = usePrevious(data);
  const isFirstRender = prevData === undefined;

  useEffect(() => {
    if (!isFirstRender) {
      console.log('数据更新了:', data);
    }
  }, [data, prevData]);

  return <div>...</div>;
};
```

#### 3. 实现“撤销”功能的简单版本

```tsx
const UndoExample = () => {
  const [value, setValue] = useState('');
  const lastValue = usePrevious(value);

  const undo = () => {
    if (lastValue !== undefined) {
      setValue(lastValue);
    }
  };

  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={undo} disabled={lastValue === undefined}>
        撤销
      </button>
    </div>
  );
};
```

#### 4. 动画或过渡效果的触发判断

```tsx
const FadeBox = ({ visible }) => {
  const prevVisible = usePrevious(visible);

  useEffect(() => {
    if (prevVisible !== visible) {
      // 触发动画
      animateBox(visible);
    }
  }, [visible, prevVisible]);

  return <div className={visible ? 'fade-in' : 'fade-out'}></div>;
};
```

---

### ⚠️ 注意事项

1. **首次渲染返回 `undefined`**
   - 使用时注意空值判断，避免意外错误。

2. **基于 `useRef` 实现**
   - 内部使用 `useRef` 在每次渲染后更新“上一次”的值。
   - 不会触发组件重新渲染。

3. **与 `useEffect` 配合使用**
   - `usePrevious` 本身不触发副作用，通常与 `useEffect` 结合来响应变化。

4. **不能用于条件渲染**
   - 不要写成 `if (condition) usePrevious(value)`，必须始终调用，符合 Hook 规则。

---

### 🆚 相似方案对比

| 方案                | 说明                                |
| ------------------- | ----------------------------------- |
| `useRef` 手动记录   | 灵活但代码冗长，需手动管理          |
| `useEffect` + `ref` | 可实现，但逻辑分散                  |
| `usePrevious`       | **简洁、语义清晰、开箱即用** ✅ 推荐 |

---

### 总结

`usePrevious` 是一个轻量但非常实用的 Hook，它让你在函数组件中轻松访问“上一次的值”，特别适合：

- ✅ 检测值的变化（从 A 到 B）
- ✅ 避免首次渲染触发逻辑
- ✅ 实现简单的状态回退或动画控制

> 虽然逻辑简单，但 `usePrevious` 极大地提升了代码的可读性和开发效率，是 `ahooks` 中“小而美”的典范。