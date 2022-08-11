# 2022全网最全three.js最新入门课程【搞定前端前沿技术】

https://www.bilibili.com/video/BV1Gg411X7FY?p=15&spm_id_from=pageDriver&vd_source=ada6f000d1772e939ebb2f8afea929b3

## 13-调用js接口控制画布全屏和退出全屏

```js
window.addEventListener('dblclick', ()=>{
  if(document.fullscreenElement){
    // 退出全屏
    document.exitFullscreen();
  } else {
    // 让画布全屏
    renderer.domElement.requestFullscreen();
  }
});
```

## 14-应用图形用户界面更改变量

```shell
npm install --save dat.gui
```

## 01-掌握几何体顶点_UV_法向属性