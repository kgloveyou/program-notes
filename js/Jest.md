# Jest 

## 快照测试

### Jest快照测试

第一次运行这个测试时，Jest 会创建一个如下所示的快照文件：

```
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```

快照文件应该和项目代码一起提交并做代码评审。 Jest uses [pretty-format](https://github.com/facebook/jest/tree/main/packages/pretty-format) to make snapshots human-readable during code review. 在随后的单元测试例子中，Jest会对比上一个快照和渲染输出。 如果它们相匹配，则测试通过。 若未能匹配，要么是单元测试发现了你代码中的Bug，要么是代码实现已经变了，需要更新测试快照文件。 `<Link>`

### 更新快照

由于我们更改了测试用例中传入的page地址，我们也希望快照能因此改变。 快照测试失败了，原因是我们更新后的组件快照和之前形成的快照不一致。

要解决这个问题，我们需要更新我们已存储的快件文件。 你可以运行Jest 加一个标识符来重新生成快照文件。

```bash
jest --updateSnapshot
```



运行上面的命令行，并接受更改。 你可以用单个字符完成同样的事情 ，如 `jest -u`。 这将为所有失败的快照测试重新生成快照文件。 如果我们无意间产生了Bug导致快照测试失败，应该先修复这些Bug，再生成快照文件，以避免用快照录制了错误的行为。



# jest中it和test差别

两者语义差不多，只是it语义更好理解

it “should xxx



具体到测试代码的书写，jest 也有多种方式，可以直接在测试文件中写一个个的test或it用来测试，也可以使用describe 函数，创建一个测试集，再在describe里面写test或it , 在jest中，it和test 是一样的功能，它们都接受两个参数，第一个是字符串，对这个测试进行描述，需要什么条件，达到什么效果。第二个是函数，函数体就是真正的测试代码，jest 要执行的代码。