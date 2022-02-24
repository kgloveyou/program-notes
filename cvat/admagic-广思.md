# 228广思版

## 1、快捷键

```tsx
<GlobalHotKeys keyMap={subKeyMap} handlers={handlers} allowChanges />
```

allowChanges属性的作用：

Once we have our keyMap stored in the database, all that’s left to do is add GlobalHotKeys components wherever handlers are defined. The `allowChanges` prop allows the keyMap and handlers to be changed dynamically.

```tsx
<GlobalHotKeys
  /**
   * An object that defines actions as keys and key sequences as values
   * (using either a string, array or object).
   *
   * Actions defined in one HotKeys component are available to be handled
   * in an descendent HotKeys component.
   *
   * Optional.
   */
  keyMap={{}}
  /**
   * An object that defines handler functions as values, and the actions
   * that they handle as keys.
   *
   * Optional.
   */
  handlers={{}}
  /**
   * Whether the keyMap or handlers are permitted to change after the
   * component mounts. If false, changes to the keyMap and handlers
   * props will be ignored
   *
   * Optional.
   */
  allowChanges={false}
>
  /** * Wraps all children in a DOM-mountable component */
  {children}
</GlobalHotKeys>
```



annot-ui/src/components/annotation-page/standard-workspace/objects-side-bar/labels-list.tsx

文件中，activatedStateID一直不更新的类似问题：

https://github.com/greena13/react-hotkeys/issues/182

参考文件annot-ui\src\components\annotation-page\attribute-annotation-workspace\attribute-annotation-sidebar\attribute-annotation-sidebar.tsx中的写法，应该可行？



可能的解决方案：

https://stackoverflow.com/questions/64133324/react-hotkeys-cannot-access-updated-state

https://codesandbox.io/s/laughing-newton-08vyv