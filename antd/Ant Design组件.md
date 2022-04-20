# Ant Design组件

https://ant.design/components/grid-cn/

# Grid栅格

24 栅格系统。

布局是基于 24 栅格来定义每一个『盒子』的宽度，但不拘泥于栅格。

[区块间隔](https://ant.design/components/grid-cn/#components-grid-demo-gutter)

栅格常常需要和间隔进行配合，你可以使用 `Row` 的 `gutter` 属性，我们推荐使用 `(16+8n)px` 作为栅格间隔(n 是自然数)。

如果要支持响应式，可以写成 `{ xs: 8, sm: 16, md: 24, lg: 32 }`。

如果需要垂直间距，可以写成数组形式 `[水平间距, 垂直间距]` `[16, { xs: 8, sm: 16, md: 24, lg: 32 }]`。

[左右偏移](https://ant.design/components/grid-cn/#components-grid-demo-offset)

列偏移。

使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。

[排版](https://ant.design/components/grid-cn/#components-grid-demo-flex)

布局基础。

子元素根据不同的值 `start`,`center`,`end`,`space-between`,`space-around`，分别定义其在父节点里面的排版方式。

[Flex 填充](https://ant.design/components/grid-cn/#components-grid-demo-flex-stretch)

Col 提供 `flex` 属性以支持填充。

[响应式布局](https://ant.design/components/grid-cn/#components-grid-demo-responsive)

参照 Bootstrap 的 [响应式设计](http://getbootstrap.com/css/#grid-media-queries)，预设六个响应尺寸：`xs` `sm` `md` `lg` `xl` `xxl`。

### Col

|      |                                                              |                  |      |      |
| ---- | ------------------------------------------------------------ | ---------------- | ---- | ---- |
| xs   | `屏幕 < 576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number \| object | -    |      |
| sm   | `屏幕 ≥ 576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number \| object | -    |      |
| md   | `屏幕 ≥ 768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number \| object | -    |      |
| lg   | `屏幕 ≥ 992px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number \| object | -    |      |
| xl   | `屏幕 ≥ 1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number \| object | -    |      |
| xxl  | `屏幕 ≥ 1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number \| object | -    |      |



# Select

滚动页面，下面框脱离组件问题。

https://github.com/ant-design/ant-design/issues/8268



# Upload上传

使用antd的Upload组件和axios上传文件

https://www.cnblogs.com/wurijie/p/13055515.html



[React AntDesign add uploaded images to FormData](https://stackoverflow.com/questions/54845951/react-antdesign-add-uploaded-images-to-formdata/54855963#54855963)



Send multipart/form-data with antd upload 

https://github.com/ant-design/ant-design/issues/11616

