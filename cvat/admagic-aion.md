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



修改属性

annot-ui\src\containers\annotation-page\standard-workspace\objects-side-bar\object-item.tsx

```typescript
    private changeAttribute = (id: number, value: string): void => {
        const { objectState, jobInstance } = this.props;
        jobInstance.logger.log(LogType.changeAttribute, {
            id,
            value,
            object_id: objectState.clientID,
        });
        console.log(id, value)
        const attr: Record<number, string> = {};
        attr[id] = value;
        console.log(attr, )
        objectState.attributes = attr;
        console.log(objectState.attributes)
        this.commit();
    };
```

annot-ui\src\containers\annotation-page\standard-workspace\objects-side-bar\object-item.tsx

```typescript
    private commit(): void {
        const { objectState, updateState } = this.props;

        updateState(objectState);
    }
```



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

## 问题记录

1、标注页面中labels的type为undefined.

```typescript
        annotation: {
            job: { requestedId, instance: job, fetching, labels },
```

2、重启服务

```shell
/opt/kube/bin/helm upgrade --install -f /root/build/admagic-frontend/values.yaml --ca-file=/etc/kubernetes/ssl/ca.pem admagic-frontend internal/admagic-frontend
```

3、保存失败

annot-core\src\annotations-saver.js

原因：http://localhost:3005/admagic-bff/api/v1/image-annots/save-annot接口返回的内容不对。

`createShapes`和`createTags`应该不为空。

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "createShapes": [],
    "updateShapes": [],
    "createTags": [],
    "UpdateTags": [],
    "id": 0,
    "createdAt": -6795364578871,
    "updatedAt": -6795364578871,
    "deletedAt": null
  }
}
```

4、删除所有图片后，标注界面一直转圈

annot-ui\src\actions\annotation-actions.ts

```typescript
stop_frame: getSubTaskTotalByStatus(frameType, s, sampled) - 1,
```

这里的stop_frame === -1.



## 默认属性

annot-ui\src\components\annotation-page\standard-workspace\objects-side-bar\object-item-details.tsx

```tsx
const { collapsed, attributes, values, changeAttribute, collapse } = props;
```

从values传入进来的。

=======>

annot-ui\src\components\annotation-page\standard-workspace\objects-side-bar\object-item.tsx

```tsx
                    <ItemDetails
                        collapsed={collapsed}
                        attributes={attributes}
                        values={attrValues}
                        collapse={collapse}
                        changeAttribute={changeAttribute}
                    />
```

从attrValues传入进来的。

======>

annot-ui\src\containers\annotation-page\standard-workspace\objects-side-bar\object-item.tsx

```tsx
attrValues={{ ...objectState.attributes }}
```



tapd中之前处理过这个bug

https://www.tapd.cn/61814423/bugtrace/bugs/view/1161814423001003337

相关代码

annot-core/src/annotations-objects.js

```js
this.appendDefaultAttributes(this.label);
```



## GeoOS

http://www.spatial-go.com/zh_CN/docs/overview.html

## 像素坐标系下空间关系计算

 [shapely](https://pypi.python.org/pypi/Shapely)

[GDAL/OGR Cookbook](http://pcjericks.github.io/py-gdalogr-cookbook/geometry.html#calculate-intersection-between-two-geometries) 

## 保存标注

cvat-ui\src\actions\annotation-actions.ts

```tsx
export function saveAnnotationsAsync(sessionInstance: any, afterSave?: () => void): ThunkAction {
```

比较前后是否相同。

annot-core\src\annotations-saver.js

```js
const exported = this.collection.export();
```

## 绘制点

保存

annot-ui\src\actions\annotation-actions.ts

```typescript
export function saveAnnotationsAsync(

const states = await sessionInstance.annotations.get(frame, showAllInterpolationTracks, filters);
```

这里返回的states中没有点形状。