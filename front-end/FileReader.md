# FileReader

我们可以通过html5提供的FileReader读取到文件中的数据。

首先创建一个FileReader实例：

```js
const reader = new FileReader();
```

FileReader提供了如下方法：

readAsArrayBuffer(file)
按字节读取文件内容，结果用ArrayBuffer对象表示
readAsBinaryString(file)
按字节读取文件内容，结果为文件的二进制串
readAsDataURL(file)
读取文件内容，结果用data:url的字符串形式表示
readAsText(file,encoding)
按字符读取文件内容，结果用字符串形式表示
abort()
终止文件读取操作

readAsDataURL和readAsText较为常用，这里只对这两者进行说明。

readAsDataURL会将文件内容进行base64编码后输出：

```js
document.querySelector('#file').addEventListener('change',(fileChoosed) => {
   const reader = new FileReader();
   reader.readAsDataURL(fileChoosed.target.files[0]);//发起异步请求
   reader.onload = function(readRes){
       console.log('加载完成', readRes.target.result)
   }          
})

```

控制台为当前所传文件的base64编码表示。由于媒体文件的src属性，可以通过采用网络地址或base64的方式显示，因此我们可以利用readAsDataURL实现对图片的预览。
如下，只需将读取的结果赋给图片的src属性，即可预览图片：

```html
<input type="file" id="file" />
<img src="" id="imgPreview">

```

```js
document.querySelector('#file').addEventListener('change',(fileChoosed) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileChoosed.target.files[0]);//发起异步请求
    reader.onload = function(readRes){
        document.querySelector('#imgPreview').src = readRes.target.result
    }           
})

```

readAsText可按指定编码方式读取文件，但读取文件的单位是字符，故对于文本文件，只要按规定的编码方式读取即可；而对于媒体文件（图片、音频、视频），其内部组成并不是按字符排列，故采用readAsText读取，会产生乱码。

FileReader事件：

onloadstart 当读取操作开始时调用
onprogress 在读取数据过程中周期性调用
onabort 当读取操作被中止时调用
onerror 当读取操作发生错误时调用
onload 当读取操作成功完成时调用
onloadend 当读取操作完成时调用，无论成功，失败或取消

注释：

每过50ms左右，就会触发一次progress事件，对于较大的文件可以利用progress实现进度条；
由于种种原因无法读取文件时，会触发error事件。触发error事件时，相关信息保存在FileReader对象的error属性中，这个属性将保存一个对象，此对象只有一个属性code，即错误码。1表示未找到文件，2表示安全性错误，3表示读取中断，4表示文件不可读，5表示编码错误。
示例：

```js
document.querySelector('#file').addEventListener('change',(fileChoosed) => {
    const reader = new FileReader();
    reader.readAsText(fileChoosed.target.files[0],'utf-8');//发起异步请求
    reader.onloadstart = function(readRes){
    	// 文件大于500kb则取消加载
        if(readRes.total > 1024*500) {            
            reader.abort()
        } else {
            console.log("开始加载")
        }
    }
    reader.onabort = function (readRes) {
        console.log('加载已取消')
    }
    reader.onprogress = function(readRes){
        console.log("加载中", `${(readRes.loaded / readRes.total).toFixed(2)*100}/100`)
    }
    reader.onload = function(readRes){
        console.log('加载成功')
    }
    reader.onloadend= function(readRes){
        console.log("加载结束")
    }            
})

```

————————————————
版权声明：本文为CSDN博主「定栓」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44116302/article/details/91554835

 

## 其他参考

https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader

[在web应用程序中使用文件](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications)

