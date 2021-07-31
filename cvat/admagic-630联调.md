# 630联调

http://192.168.1.185:8021/swagger/index.html



本地开发

```json
"start": "cross-env REACT_APP_API_URL=http://182.138.104.162:16480 webpack-dev-server --config ./webpack.config.js --mode=development",
```

远程访问

## 0、新建任务

下面有new Task的代码

annot-ui\src\actions\tasks-actions.ts

```js
export function createTaskAsync(data: any): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const description: any = {
            name: data.basic.name,
            labels: data.labels,
        };

        if (data.advanced.segmentSize) {
            description.segment_size = data.advanced.segmentSize;
        }
        if (data.advanced.startFrame) {
            description.start_frame = data.advanced.startFrame;
        }
        if (data.advanced.stopFrame) {
            description.stop_frame = data.advanced.stopFrame;
        }

        const taskInstance = new cvat.classes.Task(description);
        taskInstance.clientFiles = data.files.local;
        taskInstance.serverFiles = data.files.share;
        taskInstance.remoteFiles = data.files.remote;
        taskInstance.platformFiles = data.files.platform;
        taskInstance.datasetFiles = data.files.dataset;

        dispatch(createTask());
        try {
            const savedTask = await taskInstance.save((status: string): void => {
                dispatch(createTaskUpdateStatus(status));
            });
            dispatch(createTaskSuccess(savedTask.id));
        } catch (error) {
            dispatch(createTaskFailed(error));
        }
    };
}
```



## 1、任务列表

annot-ui\src\actions\tasks-actions.ts

```js
result = await cvat.tasks.get(filteredQuery);
```

返回的已经是封装好的Task对象。

任务详情查询返回信息

![image-20210601193540603](admagic-630联调.assets/image-20210601193540603.png)

annot-ui\src\reducers\tasks-reducer.ts

```js
case TasksActionTypes.GET_TASKS_SUCCESS: {
```

实际调用cvat-core中的

cvat-core\src\api-implementation.js

```js
cvat.tasks.get.implementation = async (filter) => {
```

cvat-core\src\server-proxy.js

```js
async function getTasks(filter = '') {
```



## 2、任务详情

与【获取任务列表】同一个，多了参数id=12.

http://182.138.104.162:16480/annotations/api/v1/tasks?page_size=10&id=12&page=1



annot-ui\src\containers\task-page\task-page.tsx

```js
getTasksAsync({
```



annot-ui\src\containers\task-page\details.tsx



=====>

cvat-ui\src\actions\tasks-actions.ts

```js
export function getTasksAsync(query: TasksQuery): ThunkAction<Promise<void>, {}, {}, AnyAction> {
	...
    result = await cvat.tasks.get(filteredQuery);

```

=====>

cvat-core\src\api-implementation.js

```js
cvat.tasks.get.implementation = async (filter) => {
    ...
    const tasks = tasksData.map((task) => attachUsers(task, users)).map((task) => new Task(task));
```

上面创建了新任务。

tasksData 的数据结构参考下面的results部分：

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/12",
      "id": 12,
      "name": "test_luosi_object_detection_COCO_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-27T04:10:14.889257Z",
      "updated_date": "2021-04-27T04:14:33.954734Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "completed",
      "labels": [
        {
          "id": 16,
          "name": "louosi",
          "color": "#227117",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 9,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/12",
              "id": 12,
              "assignee": null,
              "status": "completed"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 3,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 10,
      "image_quality": 70,
      "data": 12
    }
  ]
}
```

![image-20210604093935373](admagic-630联调.assets/image-20210604093935373.png)

![image-20210604094105819](admagic-630联调.assets/image-20210604094105819.png)

### 修改标签

annot-ui\src\components\labels-editor\labels-editor.tsx



annot-ui\src\components\labels-editor\label-form.tsx

`onSubmit`

====>

annot-ui\src\components\task-page\details.tsx

```tsx
<LabelsEditorComponent
    labels={taskInstance.labels.map((label: any): string => label.toJSON())}
    onSubmit={(labels: any[]): void => {
        taskInstance.labels = labels.map((labelData): any => new core.classes.Label(labelData));
        onTaskUpdate(taskInstance);
    }}
    disabled={disabled}
    />
```

`onTaskUpdate`

====>

annot-ui\src\containers\task-page\details.tsx

```tsx
dispatch(updateTaskAsync(taskInstance));
```

====>

annot-ui\src\actions\tasks-actions.ts

```typescript
export function updateTaskAsync(taskInstance: any): ThunkAction<Promise<void>, CombinedState, {}, AnyAction> {
    
    await taskInstance.save();
```

====>

annot-core\src\session.js

```js
    Task.prototype.save.implementation = async function saveTaskImplementation(onUpdate) {
        // TODO: Add ability to change an owner and an assignee
        // 更新任务
        if (typeof this.id !== 'undefined') {
            // If the task has been already created, we update it
            const taskData = {};

            for (const [field, isUpdated] of Object.entries(this.__updatedFields)) {
                if (isUpdated) {
                    switch (field) {
                        case 'assignee':
                            taskData.assignee_id = this.assignee ? this.assignee.id : null;
                            break;
                        case 'name':
                            taskData.name = this.name;
                            break;
                        case 'labels':
                            taskData.labels = [...this._internalData.labels.map((el) => el.toJSON())];
                            break;
                        default:
                            break;
                    }
                }
            }

            await serverProxy.tasks.saveTask(this.id, taskData);

            this.updatedFields = {
                assignee: false,
                name: false,
                labels: false,
            };
            return this;
        }

        // 新建任务
        const taskSpec = {
            name: this.name,
            labels: this.labels.map((el) => el.toJSON()),
        };

        if (typeof (this.segmentSize) !== 'undefined') {
            taskSpec.segment_size = this.segmentSize;
        }
        if (typeof (this.overlap) !== 'undefined') {
            taskSpec.overlap = this.overlap;
        }

        const taskDataSpec = {
            client_files: this.clientFiles,
            server_files: this.serverFiles,
            remote_files: this.remoteFiles,
            platform_files: this.platformFiles,
            dataset_ids: this.datasetFiles,
            image_quality: this.imageQuality,
            use_zip_chunks: this.useZipChunks,
            use_cache: this.useCache,
        };

        if (typeof (this.startFrame) !== 'undefined') {
            taskDataSpec.start_frame = this.startFrame;
        }
        if (typeof (this.stopFrame) !== 'undefined') {
            taskDataSpec.stop_frame = this.stopFrame;
        }
        if (typeof (this.frameFilter) !== 'undefined') {
            taskDataSpec.frame_filter = this.frameFilter;
        }
        if (typeof (this.dataChunkSize) !== 'undefined') {
            taskDataSpec.chunk_size = this.dataChunkSize;
        }

        const task = await serverProxy.tasks.createTask(taskSpec, taskDataSpec, onUpdate);
        return new Task(task);
    };
```

根据`__updatedFields`字段，确定任务哪个字段进行了更新。

=====>

annot-core\src\server-proxy.js

```js
async function saveTask(id, taskData) {
    const { backendAPI } = config;

    try {
        await Axios.patch(`${backendAPI}/tasks/${id}`, JSON.stringify(taskData), {
            proxy: config.proxy,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (errorData) {
        throw generateError(errorData);
    }
}
```

### 删除标签

annot-ui\src\components\labels-editor\constructor-viewer-item.tsx

`onDelete`

===>

annot-ui\src\components\labels-editor\constructor-viewer.tsx

`onDelete`

===>

annot-ui\src\components\labels-editor\labels-editor.tsx

```js
private handleDelete = (label: Label): void => {
```

```js
private handleSubmit(savedLabels: Label[], unsavedLabels: Label[]): void {
    
    onSubmit(output);
```

===>

annot-ui\src\components\task-page\details.tsx

```js
 onSubmit={(labels: any[]): void => {
```



删除的标签在这里被置为deleted

cvat-core\src\session.js

```js
const IDs = labels.map((_label) => _label.id);
const deletedLabels = data.labels.filter((_label) => !IDs.includes(_label.id));
deletedLabels.forEach((_label) => {
    _label.deleted = true;
});

updatedFields.labels = true;
data.labels = [...deletedLabels, ...labels];
```

## 3、进入标注主界面

annot-ui\src\containers\annotation-page\annotation-page.tsx

annot-ui\src\components\annotation-page\annotation-page.tsx



调用getJob

```js
    useEffect(() => {
        if (job === null && !fetching) {
            getJob();
        }
    }, [job, fetching]);
```

实际调用

annot-ui\src\containers\annotation-page\annotation-page.tsx

```js
getJob(): void {
    dispatch(getJobAsync(taskID, jobID, initialFrame, initialFilters));
},
```

annot-ui\src\actions\annotation-actions.ts

```js
export function getJobAsync(tid: number, jid: number, initialFrame: number, initialFilters: string[]): ThunkAction {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const state: CombinedState = getStore().getState();
            const filters = initialFilters;
            const { showAllInterpolationTracks } = state.settings.workspace;

            dispatch({
                type: AnnotationActionTypes.GET_JOB,
                payload: {
                    requestedId: jid,
                },
            });

            const loadJobEvent = await logger.log(
                LogType.loadJob,
                {
                    task_id: tid,
                    job_id: jid,
                },
                true,
            );

            // Check state if the task is already there
            let task = state.tasks.current
                .filter((_task: Task) => _task.instance.id === tid)
                .map((_task: Task) => _task.instance)[0];

            // If there aren't the task, get it from the server
            if (!task) {
                [task] = await cvat.tasks.get({ id: tid });
            }

            // Finally get the job from the task
            const job = task.jobs.filter((_job: any) => _job.id === jid)[0];
            if (!job) {
                throw new Error(`Task ${tid} doesn't contain the job ${jid}`);
            }

            const frameNumber = Math.max(Math.min(job.stopFrame, initialFrame), job.startFrame);
            const frameData = await job.frames.get(frameNumber);
            // call first getting of frame data before rendering interface
            // to load and decode first chunk
            await frameData.data();
            const states = await job.annotations.get(frameNumber, showAllInterpolationTracks, filters);
            const [minZ, maxZ] = computeZRange(states);
            const colors = [...cvat.enums.colors];

            loadJobEvent.close(await jobInfoGenerator(job));

            dispatch({
                type: AnnotationActionTypes.GET_JOB_SUCCESS,
                payload: {
                    job,
                    states,
                    frameNumber,
                    frameFilename: frameData.filename,
                    frameData,
                    colors,
                    filters,
                    minZ,
                    maxZ,
                },
            });
            dispatch(changeFrameAsync(frameNumber, false));
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.GET_JOB_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}
```

- 读取图片

```js
const frameData = await job.frames.get(frameNumber);

await frameData.data();
```

- 获取指定帧的标注内容

```js
const states = await job.annotations.get(frameNumber, showAllInterpolationTracks, filters);
```

=====>

annot-core\src\session.js

```js
const annotationsData = await getAnnotations(this, frame, allTracks, filters);
return annotationsData;
```

=====>

cvat-core\src\annotations.js

```js
async function getAnnotations(session, frame, allTracks, filters) {
    const sessionType = session instanceof Task ? 'task' : 'job';
    const cache = getCache(sessionType);

    if (cache.has(session)) {
        return cache.get(session).collection.get(frame, allTracks, filters);
    }

    await getAnnotationsFromServer(session);
    return cache.get(session).collection.get(frame, allTracks, filters);
}
```



- 切换帧

  dispatch(changeFrameAsync(frameNumber, false));

```js
export function changeFrameAsync(toFrame: number, fillBuffer?: boolean, frameStep?: number): ThunkAction {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const state: CombinedState = getStore().getState();
        const { instance: job } = state.annotation.job;
        const { filters, frame, showAllInterpolationTracks } = receiveAnnotationsParameters();

        try {
            if (toFrame < job.startFrame || toFrame > job.stopFrame) {
                throw Error(`Required frame ${toFrame} is out of the current job`);
            }

            if (toFrame === frame) {
                dispatch({
                    type: AnnotationActionTypes.CHANGE_FRAME_SUCCESS,
                    payload: {
                        number: state.annotation.player.frame.number,
                        data: state.annotation.player.frame.data,
                        filename: state.annotation.player.frame.filename,
                        delay: state.annotation.player.frame.delay,
                        changeTime: state.annotation.player.frame.changeTime,
                        states: state.annotation.annotations.states,
                        minZ: state.annotation.annotations.zLayer.min,
                        maxZ: state.annotation.annotations.zLayer.max,
                        curZ: state.annotation.annotations.zLayer.cur,
                    },
                });

                return;
            }

            // Start async requests
            dispatch({
                type: AnnotationActionTypes.CHANGE_FRAME,
                payload: {},
            });

            await job.logger.log(LogType.changeFrame, {
                from: frame,
                to: toFrame,
            });
            const data = await job.frames.get(toFrame, fillBuffer, frameStep);
            const states = await job.annotations.get(toFrame, showAllInterpolationTracks, filters);
            const [minZ, maxZ] = computeZRange(states);
            const currentTime = new Date().getTime();
            let frameSpeed;
            switch (state.settings.player.frameSpeed) {
                case FrameSpeed.Fast: {
                    frameSpeed = (FrameSpeed.Fast as number) / 2;
                    break;
                }
                case FrameSpeed.Fastest: {
                    frameSpeed = (FrameSpeed.Fastest as number) / 3;
                    break;
                }
                default: {
                    frameSpeed = state.settings.player.frameSpeed as number;
                }
            }
            const delay = Math.max(
                0,
                Math.round(1000 / frameSpeed) - currentTime + (state.annotation.player.frame.changeTime as number),
            );

            dispatch({
                type: AnnotationActionTypes.CHANGE_FRAME_SUCCESS,
                payload: {
                    number: toFrame,
                    data,
                    filename: data.filename,
                    states,
                    minZ,
                    maxZ,
                    curZ: maxZ,
                    changeTime: currentTime + delay,
                    delay,
                },
            });
        } catch (error) {
            if (error !== 'not needed') {
                dispatch({
                    type: AnnotationActionTypes.CHANGE_FRAME_FAILED,
                    payload: {
                        number: toFrame,
                        error,
                    },
                });
            }
        }
    };
}
```

receiveAnnotationsParameters

从store中获取相关参数

```js
function receiveAnnotationsParameters(): AnnotationsParameters {
    if (store === null) {
        store = getCVATStore();
    }

    const state: CombinedState = getStore().getState();
    const {
        annotation: {
            annotations: { filters },
            player: {
                frame: { number: frame },
            },
            job: { instance: jobInstance },
        },
        settings: {
            workspace: { showAllInterpolationTracks },
        },
    } = state;

    return {
        filters,
        frame,
        jobInstance,
        showAllInterpolationTracks,
    };
}
```

const [minZ, maxZ] = computeZRange(states);

计算ZOrder的范围值

```tsx
export function computeZRange(states: any[]): number[] {
    const filteredStates = states.filter((state: any): any => state.objectType !== ObjectType.TAG);
    let minZ = filteredStates.length ? filteredStates[0].zOrder : 0;
    let maxZ = filteredStates.length ? filteredStates[0].zOrder : 0;
    filteredStates.forEach((state: any): void => {
        minZ = Math.min(minZ, state.zOrder);
        maxZ = Math.max(maxZ, state.zOrder);
    });

    return [minZ, maxZ];
}
```



### annot-ui\src\containers\annotation-page\standard-workspace\canvas-wrapper.tsx

### components/annotation-page/standard-workspace/canvas-wrapper

更新canvas（加载图片及标注）

```tsx
    private updateCanvas(): void {
        const { curZLayer, annotations, frameData, canvasInstance } = this.props;

        if (frameData !== null) {
            canvasInstance.setup(
                frameData,
                annotations.filter((e) => e.objectType !== ObjectType.TAG),
                curZLayer,
            );
        }
    }
```

canvasInstance.setup实际定义在：

annot-canvas\src\typescript\canvas.ts

annot-canvas\src\typescript\canvasModel.ts

```ts
    public setup(frameData: any, objectStates: any[], zLayer: number): void {
        if (this.data.imageID !== frameData.number) {
            if ([Mode.EDIT, Mode.DRAG, Mode.RESIZE].includes(this.data.mode)) {
                throw Error(`Canvas is busy. Action: ${this.data.mode}`);
            }
        }

        if (frameData.number === this.data.imageID) {
            this.data.zLayer = zLayer;
            this.data.objects = objectStates;
            this.notify(UpdateReasons.OBJECTS_UPDATED);
            return;
        }

        this.data.imageID = frameData.number;
        frameData
            .data((): void => {
                this.data.image = null;
                this.notify(UpdateReasons.IMAGE_CHANGED);
            })
            .then((data: Image): void => {
                if (frameData.number !== this.data.imageID) {
                    // already another image
                    return;
                }

                this.data.imageSize = {
                    height: frameData.height as number,
                    width: frameData.width as number,
                };

                this.data.image = data;
                this.notify(UpdateReasons.IMAGE_CHANGED);
                this.data.zLayer = zLayer;
                this.data.objects = objectStates;
                this.notify(UpdateReasons.OBJECTS_UPDATED);
            })
            .catch((exception: any): void => {
                throw exception;
            });
    }
```

frameData这里的方法调用重点（*）

从cvat-ui的components/annotation-page/standard-workspace/canvas-wrapper中传过来的。

![image-20210605190440782](admagic-630联调.assets/image-20210605190440782.png)



在cvat-ui\src\containers\annotation-page\standard-workspace\canvas-wrapper.tsx中，从state中获取。

```js
player: {
    frame: { data: frameData, number: frame, fetching: frameFetching },
        frameAngles,
},
```

## 4、移动多边形

Unable to move (drag with the mouse) track when it's a polygon

https://github.com/openvinotoolkit/cvat/issues/2650

修改文件：

cvat-core\src\annotations-objects.js

在

```
class PolygonShape extends PolyShape {
```

中，添加`this.pinned = false;`

## 5、多选shape

Selecting more than one object - Moving/Copying/Pasting or Assigning Label - Enhancement

https://github.com/openvinotoolkit/cvat/issues/2340

