# admagic-aion

## 切换方向

annot-ui\src\containers\annotation-page\standard-workspace\objects-side-bar\object-item.tsx

```typescript
private switchOrientation = (): void => {
```

这里有判断顺时针或逆时针的代码，它也是通过面积的正负判断的。

https://github.com/opencv/cvat/issues/4033



绘制结束事件在这里，判断车库8个点以及多边形方向校准都写在这里。

annot-ui\src\components\annotation-page\standard-workspace\canvas-wrapper.tsx

```typescript
private onCanvasShapeDrawn = (event: any): void => {
```



## 车锁、挡车器自动关联车库

是否可以参考下面代码？

annot-ui\src\components\annotation-page\standard-workspace\canvas-wrapper.tsx

```typescript
private onCanvasCursorMoved = async (event: any): Promise<void> => {
```

================>

annot-core\src\annotations-collection.js

```js
select(objectStates, x, y) {
```

使用turf.js进行相交判断

https://turfjs.fenxianglu.cn/category/booleans/booleanCrosses.html

创建多边形

https://turfjs.fenxianglu.cn/category/helper/polygon.html

创建线

https://turfjs.fenxianglu.cn/category/helper/lineString.html

## 自动创建图片属性

annot-ui\src\containers\annotation-page\standard-workspace\controls-side-bar\setup-tag-popover.tsx

```typescript
    private onSetup = (): void => {
        const { frame, labels, jobInstance, canvasInstance, onAnnotationCreate, onRememberObject } = this.props;

        const { selectedLabelID } = this.state;

        canvasInstance.cancel();

        onRememberObject(selectedLabelID);

        const objectState = new cvat.classes.ObjectState({
            objectType: ObjectType.TAG,
            label: labels.filter((label: any) => label.id === selectedLabelID)[0],
            frame,
        });

        onAnnotationCreate(jobInstance, frame, [objectState]);
    };
```

当前帧的标注

annot-ui\src\containers\annotation-page\top-bar\statistics-modal.tsx

