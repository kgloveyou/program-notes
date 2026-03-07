在 Vue.js 3 中，`shallowRef()` 是 `ref()` 的**浅层版本**。

它的核心区别在于：**`shallowRef` 只会追踪其 `.value` 属性本身的变更，而不会深度追踪 `.value` 内部嵌套对象的变化。**

### 1. 核心特性对比

| 特性         | `ref()` (深度响应式)                       | `shallowRef()` (浅层响应式)                            |
| :----------- | :----------------------------------------- | :----------------------------------------------------- |
| **追踪范围** | 深度追踪。修改嵌套对象的属性也会触发更新。 | **仅追踪顶层**。只有替换整个 `.value` 时才会触发更新。 |
| **性能开销** | 较高。需要递归遍历对象并转换为 Proxy。     | **极低**。内部对象保持原样，不创建 Proxy。             |
| **适用场景** | 大多数常规状态数据。                       | 大型不可变数据结构、高性能列表、第三方库实例。         |

### 2. 代码示例：行为差异

让我们通过一个具体的例子来看两者的区别：

```javascript
import { ref, shallowRef, triggerRef } from 'vue'

// 1. 普通 ref (深度响应式)
const deepState = ref({ count: 0, user: { name: 'Alice' } })

// 2. shallowRef (浅层响应式)
const shallowState = shallowRef({ count: 0, user: { name: 'Bob' } })

// --- 场景 A: 修改嵌套属性 ---

// 修改 deepState 的嵌套属性 -> ✅ 触发视图更新
deepState.value.user.name = 'Alice Updated' 

// 修改 shallowState 的嵌套属性 -> ❌ 不会触发视图更新
// Vue 不知道 shallowState.value.user 变了，因为它只监听 .value 的引用变化
shallowState.value.user.name = 'Bob Updated' 

// --- 场景 B: 替换整个对象 ---

// 替换 deepState -> ✅ 触发更新
deepState.value = { count: 1, user: { name: 'New Alice' } }

// 替换 shallowState -> ✅ 触发更新 (这是 shallowRef 唯一能自动检测到的变化)
shallowState.value = { count: 1, user: { name: 'New Bob' } }
```

### 3. 如何在 `shallowRef` 中手动触发更新？

如果你使用了 `shallowRef` 并且修改了其内部的嵌套数据，但需要强制视图更新，可以使用 **`triggerRef()`**。

```javascript
import { shallowRef, triggerRef } from 'vue'

const state = shallowRef({ count: 0, items: [] })

// 修改内部数据
state.value.items.push('new item')

// 此时视图不会更新，必须手动通知 Vue
triggerRef(state) 
// 👆 这行代码会强制触发依赖于 state 的副作用（如组件渲染）
```

### 4. 主要使用场景

为什么要使用 `shallowRef`？主要是为了**性能优化**和**兼容性**：

#### A. 处理大型不可变数据 (Immutable Data)
如果你的数据源（例如从后端获取的巨大 JSON 树）遵循**不可变原则**（即更新数据时总是返回一个新对象，而不是修改旧对象），那么不需要深度响应式。
*   **优势**：避免了递归将巨大对象转换为 Proxy 的性能开销和内存占用。
*   **逻辑**：既然每次更新都是替换整个对象 (`state.value = newData`)，`shallowRef` 足以检测到变化。

#### B. 集成第三方库
某些第三方库（如复杂的地图库、图表库实例、类实例）内部有复杂的状态管理或包含循环引用。
*   **问题**：Vue 的深度代理可能会干扰这些库的内部逻辑，或者导致严重的性能下降甚至栈溢出。
*   **解决**：使用 `shallowRef` 存储这些实例，Vue 只负责在实例被替换时更新组件，而不干涉实例内部。

#### C. 优化长列表渲染
在渲染成千上万行的列表时，如果每一行都是一个复杂的对象，深度响应式会带来巨大的初始化成本。如果列表项的更新策略是“替换整行”而非“修改行内属性”，使用 `shallowRef` 可以显著提升初始化速度。

### 5. 配套 API：`shallowReactive`

除了 `shallowRef`，Vue 还提供了 `shallowReactive`，它与 `reactive` 的关系等同于 `shallowRef` 与 `ref` 的关系。

*   `shallowReactive(obj)`：只使对象顶层属性具有响应式，嵌套对象保持原样。
*   注意：`shallowReactive` 返回的是对象本身（不是 proxy 包裹的新对象，但在顶层属性访问上是 proxy），而 `shallowRef` 返回的是一个 ref 对象。

### 6. 最佳实践总结

1.  **默认使用 `ref` / `reactive`**：除非你有明确的性能瓶颈或特殊需求，否则始终使用深度响应式，因为它更符合直觉，不易出错。
2.  **仅在必要时使用 `shallowRef`**：
    *   数据量极大且初始化慢。
    *   数据遵循不可变模式（Immutability）。
    *   对象包含无法被 Proxy 化的内容（如某些 DOM 元素、Map/Set 的特殊用法、第三方类实例）。
3.  **记得 `triggerRef`**：一旦决定使用 `shallowRef` 并修改内部状态，务必在修改后调用 `triggerRef`，否则界面不会刷新。
4.  **模板访问**：在模板中使用 `shallowRef` 和普通 `ref` 一样，直接通过 `{{ myShallowRef.property }}` 访问即可（Vue 会自动解包 `.value`），但请记住，如果 `property` 是嵌套对象且发生了变更，模板不会自动更新，除非你触发了 `triggerRef` 或替换了整个对象。