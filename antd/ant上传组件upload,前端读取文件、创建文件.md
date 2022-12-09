业务需求是用户上传文件后，还能修改文件内容,最后保存修改后的文件

实现方式：

1.前端读取文件内容后显示在代码编辑器中  方便用户修改

2.点保存按钮时，拿到改变的文件内容后，创建新的文件流 ， 提交给后端

\----------------------------------------------------------

这里演示的是JSON文件数据

选择文件

![](https://img-blog.csdnimg.cn/c2a54a6ddc944bd984a24c151fc1f51c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAd2VpeGluXzU3MjI5NzE1,size_18,color_FFFFFF,t_70,g_se,x_16)

1.拿到文件的JSON数据后，在代码编辑中显示

![](https://img-blog.csdnimg.cn/5b6c4dcb876a46c49c7d4f1bfb2e920d.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAd2VpeGluXzU3MjI5NzE1,size_15,color_FFFFFF,t_70,g_se,x_16)

js代码：[react](https://so.csdn.net/so/search?q=react&spm=1001.2101.3001.7020)引入antd的Upload组件

```jsx
onImportExcel = (file) => {
  // 创建FileReader 对象读取      
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    // 获取文件内容存进tempFile        
    this.setState({
      tempFile: reader.result
    });
  };
};
const uploadProps = {
  name: 'file',
  action: '',
  showUploadList: false,
  fileList,
  onChange: this.handleChange,
  beforeUpload: (file, fileList) => {
    this.onImportExcel(file);
  },
}; 

<Upload {...uploadProps} accept = ".JSON" >
  <Button type = "primary" ghost className = "mr-md" > 
      导入JSON文件 
  < /Button> 
</Upload>
```

2 拿到改变的文件内容后，创建新的文件流 ， 提交给后端

```javascript
handleSave = () => {
  const fileConent = "test";
  // fileConent其实时代码编辑器用户修改的内容
  const formData = new FormData();
  // 将得到的文件流添加到FormData对象
  const uuid = createUuid();
  const newFile = new Blob([fileConent], { type: "application/json" });
  // tempFile.name是文件名
  formData.append("file", newFile, tempFile.name);
  formData.append("uuid", uuid);
  axios.post(`/api/upload`, formData).then((res) => {
    if (res.status === 200) {
      console.log("上传成功", res.data);
    }
  });
};
```