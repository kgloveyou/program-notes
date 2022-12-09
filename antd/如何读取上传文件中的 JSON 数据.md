> 上传文件是某些应用场景中比较常见的功能。一般都是拿到源文件，直接发送相关 `Blob` 类型数据给接收者。但是如果我们要处理上传的文件数据或者需要根据上传的文件中的数据做一些其他事情时，那就需要一些其他操作了。

## 获取文件

根据 `type=file` 获取相关的 file 数据[查看MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file) ：

```html
<input type="file" accept="application/json">
1
```

只获取 JSON 文件。通过 `event.files[0]` ，可以获取到相关的 file 数据。

## 获取 JSON 文件的数据内容

有了 file 数据，那我们就可以通过 fileReader 来处理 file 数据：

```typescript
 const reader = new FileReader();
 // 异步处理文件数据
 reader.readAsText(file, 'UTF-8');
 // 处理完成后立马触发 onload
 reader.onload = fileReader => {
     const fileData = fileReader.target.result;
     console.log(JSON.parse(fileData as string));
     console.log(JSON.parse(reader.result as string));
     // 上面的两个输出相同
 };
12345678910
```