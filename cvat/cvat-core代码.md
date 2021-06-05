# cvat-core代码

## 依赖

```json
  "dependencies": {
    "axios": "^0.18.0",
    "browser-or-node": "^1.2.1",
    "cvat-data": "../cvat-data",
    "detect-browser": "^5.0.0",
    "error-stack-parser": "^2.0.2",
    "form-data": "^2.5.0",
    "jest-config": "^24.8.0",
    "js-cookie": "^2.2.0",
    "jsonpath": "^1.0.2",
    "platform": "^1.3.5",
    "store": "^2.0.12",
    "worker-loader": "^2.0.0"
  }
```

- store

  Cross-browser storage for all use cases, used across the web.

  https://github.com/marcuswestin/store.js

  store.js exposes a simple API for cross-browser local storage:

  ```js
  // Store current user
  store.set('user', { name:'Marcus' })
  
  // Get current user
  store.get('user')
  
  // Remove current user
  store.remove('user')
  
  // Clear all keys
  store.clearAll()
  
  // Loop over all stored values
  store.each(function(value, key) {
  	console.log(key, '==', value)
  })
  ```

  

- worker-loader

  worker loader module for webpack

  https://github.com/webpack-contrib/worker-loader

## 代码

### 代码结构

```bash
apulis@apulis-OptiPlex-7070-China-HDD-Protection:~/github-demos/cvat/cvat-core/src$ tree
.
├── annotation-formats.js
├── annotations-collection.js
├── annotations-filter.js
├── annotations-history.js
├── annotations.js
├── annotations-objects.js
├── annotations-saver.js
├── api-implementation.js
├── api.js
├── comment.js
├── common.js
├── config.js
├── download.worker.js
├── enums.js
├── exceptions.js
├── frames.js
├── issue.js
├── labels.js
├── lambda-manager.js
├── logger-storage.js
├── log.js
├── ml-model.js
├── object-state.js
├── plugins.js
├── project.js
├── review.js
├── server-proxy.js
├── session.js
├── statistics.js
└── user.js

0 directories, 30 files
```



### server-proxy.js

cvat-core\src\server-proxy.js

其中，包含两个类：WorkerWrappedAxios和ServerProxy。

前者定义了下载工作线程，后者定义了访问后台接口的代理对象。

#### WorkerWrappedAxios



#### ServerProxy



后台接口调用地址都在这个文件中定义，例如：

##### 获取关于

```js
async function about() {
```

response = await Axios.get(`${backendAPI}/server/about`, {

##### 获取服务器share目录

```js
async function share(directory) {
```

response = await Axios.get(`${backendAPI}/server/share?directory=${directory}`, {

##### 提交异常信息

```js
async function exception(exceptionObject) {
```

await Axios.post(`${backendAPI}/server/exception`, JSON.stringify(exceptionObject), {

##### 获取标注格式（导入导出菜单列表）

```js
async function formats() {
```

response = await Axios.get(`${backendAPI}/server/annotation/formats`, {

##### 获取用户协议

```js
async function userAgreements() {
```

await Axios.get(`${backendAPI}/restrictions/user-agreements`

##### 用户注册

```js
async function register(		
```

await Axios.post(`${config.backendAPI}/auth/register`

##### 用户登录

```js
async function login(username, password) {
```

await Axios.post(`${config.backendAPI}/auth/login`

##### 登出

```js
async function logout() {	
```
await Axios.post(`${config.backendAPI}/auth/logout`, {

##### 修改密码

```js
async function changePassword(oldPassword, newPassword1, newPassword2) {
```

await Axios.post(`${config.backendAPI}/auth/password/change`

##### 请求重置密码

```js
async function requestPasswordReset(email) {
```

  await Axios.post(`${config.backendAPI}/auth/password/reset`

##### 重置密码

```js
async function resetPassword(newPassword1, newPassword2, uid, _token) {
```

await Axios.post(`${config.backendAPI}/auth/password/reset/confirm`

##### 鉴权

```js
async function authorized() {
```

await module.exports.users.getSelf();

##### 服务器请求？

```js
async function serverRequest(url, data) {
    try {
        return (
            await Axios({
                url,
                ...data,
            })
        ).data;
    } catch (errorData) {
        throw generateError(errorData);
    }
}
```



##### 获取任务列表

```tsx
async function getTasks(filter = '') {
    const { backendAPI } = config;
    console.log(666,config.proxy,`${backendAPI}/tasks?page_size=10&${filter}`)	
    //本地开发环境输出：666 false "/api/v1/tasks?page_size=10&page=1"
    let response = null;
    try {
        response = await Axios.get(`${backendAPI}/tasks?page_size=10&${filter}`, {
            proxy: config.proxy,
        });
    } catch (errorData) {
        throw generateError(errorData);
    }

    response.data.results.count = response.data.count;
    return response.data.results;
}
```

##### 保存任务

```js
async function saveTask(id, taskData) {
```

await Axios.patch(`${backendAPI}/tasks/${id}`, JSON.stringify(taskData), {

##### 删除任务

```js
async function deleteTask(id) {
```

await Axios.delete(`${backendAPI}/tasks/${id}`);

##### 导出数据集

```js
async function exportDataset(id, format) {
```

let url = `${backendAPI}/tasks/${id}/dataset?format=${format}`;

const response = await Axios.get(`${url}`, {

##### 创建任务

```js
async function createTask(taskSpec, taskDataSpec, onUpdate) {
```

依次调用了3个后台接口：



使用[FormData](https://www.npmjs.com/package/form-data)对象封装相关的任务参数。

A library to create readable `"multipart/form-data"` streams. Can be used to submit forms and file uploads to other web applications.



创建任务

```js
response = await Axios.post(`${backendAPI}/tasks`, JSON.stringify(taskSpec), {
```

上传数据

```js
await Axios.post(`${backendAPI}/tasks/${response.data.id}/data`, taskData, {
```

检查任务状态

```js
const response = await Axios.get(`${backendAPI}/tasks/${id}/status`);
```

完成后调用查询任务列表接口，

```js
const createdTask = await getTasks(`?id=${response.id}`);
```

##### 获取任务

```js
async function getTask(taskId) {
```

轮询检查任务状态，待Finished后，再返回任务信息。

```js
const response = await Axios.get(`${backendAPI}/tasks/${id}/status`);

...
const updatedTasks = await getTasks(`id=${taskId}&page=1`);

return updatedTasks;
```



##### 获取作业

```js
async function getJob(jobID) {
```

response = await Axios.get(`${backendAPI}/jobs/${jobID}`, {

##### 保存作业

```js
async function saveJob(id, jobData) {
```

await Axios.patch(`${backendAPI}/jobs/${id}`, JSON.stringify(jobData), {

##### 获取用户列表

```js
async function getUsers(id = null) {
```

response = await Axios.get(`${userBackendAPI}/users/cvat/users?pageNo=1&pageSize=all`, {

##### 获取当前用户

```js
async function getSelf() {
```

response = await Axios.get(`${userBackendAPI}/auth/currentUser`, {

##### 获取任务缩略图

```js
async function getPreview(tid) {
    
    response = await Axios.get(`${backendAPI}/tasks/${tid}/data?type=preview`, {
        proxy: config.proxy,
        responseType: 'blob',
    });
```



##### 获取任务数据

```js
async function getData(tid, chunk) {
```

​          response = await workerAxios.get(

​            `${backendAPI}/tasks/${tid}/data?type=chunk&number=${chunk}&quality=compressed`,

​            {

​              proxy: config.proxy,

​              responseType: 'arraybuffer',

​              headers:{ 'Authorization': 'Bearer ' + token }

​            },

​          );

##### 获取任务元数据

```js
async function getMeta(tid) {
```

response = await Axios.get(`${backendAPI}/tasks/${tid}/data/meta`, {

##### 获取任务/作业的标注

```js
// Session is 'task' or 'job'
async function getAnnotations(session, id) {
```

response = await Axios.get(`${backendAPI}/${session}s/${id}/annotations`, {

##### 删除作业帧

```js
async function deleteFrame(jobId, frameNumber) {
    const { backendAPI } = config;

    let response = null;
    try {
        response = await Axios.post(`${backendAPI}/jobs/${jobId}`, JSON.stringify({frameNumber: frameNumber}), {
            proxy: config.proxy,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (errorData) {
        throw generateError(errorData);
    }

    return response.data;
}
```



##### 更新任务/作业的标注

```js
// Session is 'task' or 'job'
async function updateAnnotations(session, id, data, action) {
    const { backendAPI } = config;
    let requestFunc = null;
    let url = null;
    if (action.toUpperCase() === 'PUT') {
        requestFunc = Axios.put.bind(Axios);
        url = `${backendAPI}/${session}s/${id}/annotations`;
    } else {
        requestFunc = Axios.patch.bind(Axios);
        url = `${backendAPI}/${session}s/${id}/annotations?action=${action}`;
    }

    let response = null;
    try {
        response = await requestFunc(url, JSON.stringify(data), {
            proxy: config.proxy,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (errorData) {
        throw generateError(errorData);
    }

    return response.data;
}
```

##### 上传标注

```js
// Session is 'task' or 'job'
async function uploadAnnotations(session, id, file, format) {
```

​              const response = await Axios.put(

​                `${backendAPI}/${session}s/${id}/annotations?format=${format}`,

​                annotationData,

​                {

​                  proxy: config.proxy,

​                },

​              );

##### 导出标注

```js
// Session is 'task' or 'job'
async function dumpAnnotations(id, name, format) {
    const { backendAPI } = config;
    const baseURL = `${backendAPI}/tasks/${id}/annotations`;
    let query = `format=${encodeURIComponent(format)}`;
    if (name) {
        const filename = name.replace(/\//g, '_');
        query += `&filename=${encodeURIComponent(filename)}`;
    }
    let url = `${baseURL}?${query}`;

    return new Promise((resolve, reject) => {
        async function request() {
            Axios.get(`${url}`, {
                proxy: config.proxy,
                headers:{ 'Authorization': 'Bearer ' + token }
            })
                .then((response) => {
                if (response.status === 202) {
                    setTimeout(request, 3000);
                } else {
                    query = `${query}&action=download`;
                    url = `${baseURL}?${query}`;
                    resolve(url);
                }
            })
                .catch((errorData) => {
                reject(generateError(errorData));
            });
        }

        setTimeout(request);
    });
}
```
##### 保存日志

```js
async function saveLogs(logs) {
    const { backendAPI } = config;

    try {
        await Axios.post(`${backendAPI}/server/logs`, JSON.stringify(logs), {
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



##### 获取Lambda函数

```js
async function getLambdaFunctions() {
```

const response = await Axios.get(`${backendAPI}/lambda/functions`, {

##### 运行Lambda请求

```js
async function runLambdaRequest(body) {
```

const response = await Axios.post(`${backendAPI}/lambda/requests`, JSON.stringify(body), {

##### 调用Lambda函数

```js
async function callLambdaFunction(funId, body) {
```

const response = await Axios.post(`${backendAPI}/lambda/functions/${funId}`, JSON.stringify(body), {

##### 获取Lambda请求列表

```js
async function getLambdaRequests() {
```

const response = await Axios.get(`${backendAPI}/lambda/requests`, {

##### 获取请求状态

```js
async function getRequestStatus(requestID) {
```

const response = await Axios.get(`${backendAPI}/lambda/requests/${requestID}`, {

##### 取消Lambda请求

```js
async function cancelLambdaRequest(requestId) {
```

​          await Axios.delete(`${backendAPI}/lambda/requests/${requestId}`, {

​            method: 'DELETE',

​          });

##### 获取安装的Apps

```js
async function installedApps() {
```

const response = await Axios.get(`${backendAPI}/server/plugins`, {

##### 获取ai平台数据集

```js
async function getDatasetsFromPlat() {
```

response = await Axios.get(`${backendAPI}/datasets`, {



##### 获取数据集管理系统中指定数据集

```js
async function getDatasetFromDM(dsId) {
```

response = await Axios.get(`${dsBackendAPI}/cv_datasets/id/${dsId}`, {



##### 推送至AI平台

```js
async function exportToPlatform(id) {
```

response = await Axios.get(`${backendAPI}/tasks/${id}/save_to_platform?format=COCO 1.0`, {



### cvat-core\src\api.js

将cvat-core\src\server-proxy.js中后台接口封装到一个cvat对象的对应属性上，后续调用直接使用该对象+属性+方法进行调用。


```js
const cvat = {
    server: {
        async about() {}
        async share(directory = '/'){},
        async formats() {},
        async userAgreements() {},
        async register(username, firstName, lastName, email, password1, password2, userConfirmations) {},
        login(),
        loginWithToken(token),
        async logout() {},
        async changePassword(oldPassword, newPassword1, newPassword2) {},
        async requestPasswordReset(email) {},
        async resetPassword(newPassword1, newPassword2, uid, token) {},
        async authorized() {}
        async request(url, data) {},
        async installedApps() {}
    },
    tasks: {
        async get(filter = {}) {},
        async getDatasets(filter = {}) {},
        async getDataset(filter = {}) {},
    },
    jobs: {
        async get(filter = {}) {},
    },
    users: {
        async get(filter = {}) {},
    },
    plugins: {
        async list() {},
        async register(plugin) {},    
    },
    lambda: {
        async list() {},
        async run(task, model, args) {},
        async call(task, model, args) {},
        async call(task, model, args) {},
        async cancel(requestID) { },
        async listen(requestID, onChange) {},
        async requests() {},
    },
    logger: loggerStorage,
    config: {
        get backendAPI() {},
        set backendAPI(value) {},
        get proxy() {},
        set proxy(value) {},
    },
    client: {
        version: `${pjson.version}`,
    },
	enums: {
		ShareFileType,
		TaskStatus,
		TaskMode,
		AttributeType,
		ObjectType,
		ObjectShape,
		LogType,
		HistoryActions,
		RQStatus,
		colors,
		Source,
	},
	exceptions: {
		Exception,
		ArgumentError,
		DataError,
		ScriptingError,
		PluginError,
		ServerError,
	},
	classes: {
		Task,
		User,
		Job,
		Log,
		Attribute,
		Label,
		Statistics,
		ObjectState,
		MLModel,
	},        
        
}
        
cvat.server = Object.freeze(cvat.server);
cvat.tasks = Object.freeze(cvat.tasks);
cvat.jobs = Object.freeze(cvat.jobs);
cvat.users = Object.freeze(cvat.users);
cvat.plugins = Object.freeze(cvat.plugins);
cvat.lambda = Object.freeze(cvat.lambda);
cvat.client = Object.freeze(cvat.client);
cvat.enums = Object.freeze(cvat.enums);

const implementAPI = require('./api-implementation');

Math.clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};

const implemented = Object.freeze(implementAPI(cvat));
return implemented;        
```

### cvat-core\src\api-implementation.js

包含两个函数：

#### attachUsers

给任务分配assignee和owner。

```js
function attachUsers(task, users) {}，
```

#### implementAPI

该方法又调用了cvat-core\src\api.js中的对应方法，绕一圈干嘛？



该方法中，将接口响应体json，封装成类对象。比如：

任务查询

```js
const tasks = tasksData.map((task) => attachUsers(task, users)).map((task) => new Task(task));
```



### cvat-core\src\config.js

```js
module.exports = {
    backendAPI: 'http://localhost:7000/api/v1',
    proxy: false,
};
```

### cvat-core\src\session.js(*)

辅助函数：

#### buildDublicatedAPI

```js
function buildDublicatedAPI(prototype) {
    Object.defineProperties(prototype, {
        annotations: Object.freeze({
            
        }),
        frames: Object.freeze({
            
        }),
        logger: Object.freeze({
            
        }).
        events: Object.freeze({
        
    	}),
   });        
}
```

给prototype对象添加新的属性：annotations、frames、logger、actions、events，并返回该对象。

annotations属性包含以下方法：

- upload

  Upload annotations from a dump file

  You need upload annotations from a server again after successful executing

  对应下面的prototype.annotations.upload方法。

- save

  ```
  * Save all changes in annotations on a server
  * Objects which hadn't been saved on a server before,
  * get a serverID after saving. But received object states aren't updated.
  * So, after successful saving it's recommended to update them manually
  * (call the annotations.get() again)
  ```

  prototype.annotations.save

- clear

  <!--Remove all annotations and optionally reinitialize it-->

  prototype.annotations.clear

- dump

​        <!--\* Dump of annotations to a file.-->

​        <!--\* Method always dumps annotations for a whole task.-->

​		prototype.annotations.dump,

- statistics

  <!--Collect short statistics about a task or a job.-->

  prototype.annotations.statistics

- put

  <!--Create new objects from one-frame states-->
  <!--After successful adding you need to update object states on a frame-->

  prototype.annotations.put,

- get

  <!--Get annotations for a specific frame-->

  <!--CVAT uses json queries for search.-->

  prototype.annotations.get,

  Get annotations for a specific frame

- search

  <!--Find a frame in the range [from, to] that contains at least one object satisfied to a filter-->

  prototype.annotations.search,

  

- searchEmpty

  <!--Find the nearest empty frame without any annotations-->

  prototype.annotations.searchEmpty,

  Find the nearest empty frame without any annotations

- select

  <!--Select shape under a cursor by using minimal distance-->

  <!--between a cursor and a shape edge or a shape point-->

  <!--For closed shapes a cursor is placed inside a shape-->

  prototype.annotations.select,

- merge

  <!--Method unites several shapes and tracks into the one-->
  <!--All shapes must be the same (rectangle, polygon, etc)-->
  <!--All labels must be the same-->
  <!--After successful merge you need to update object states on a frame-->

  prototype.annotations.merge,

- split

  <!--Method splits a track into two parts-->

  <!--(start frame: previous frame), (frame, last frame)-->

  <!--After successful split you need to update object states on a frame-->

  prototype.annotations.split,

- group

  <!--Method creates a new group and put all passed objects into it-->

  <!--After successful group you need to update object states on a frame-->

  prototype.annotations.group,

- import

  <!--Import raw data in a collection-->

  prototype.annotations.import

- export

   <!--Export a collection as a row data-->

   prototype.annotations.export

- exportDataset

  <!--Export as a dataset.-->

  <!--Method builds a dataset in the specified format.-->

  prototype.annotations.exportDataset,

- hasUnsavedChanges

   <!--Method indicates if there are any changes in annotations which haven't been saved on a server-->

frames属性包含以下方法：

- get

  <!--Get frame by its number-->

  对应prototype.frames.get,

- ranges

  <!--Returns the ranges of cached frames-->

  对应prototype.frames.ranges

- preview

  <!--Get the first frame of a task for preview-->

  对应prototype.frames.preview

- delete

  对应prototype.frames.delete

logger属性包含以下方法：

- log

  <!--Create a log and add it to a log collection-->
  
  prototype.logger.log,

actions属性包含以下方法：

- undo

  prototype.actions.undo

- redo

  prototype.actions.redo

- freeze

  <!--Freeze history (do not save new actions)-->

  prototype.actions.freeze

- clear

  <!--Remove all actions from history-->

  prototype.actions.clear

- get

  <!--Get actions-->
  
  prototype.actions.get

events属性包含以下方法：

- subscribe

  <!--Subscribe on an event-->

  prototype.events.subscribe,

- unsubscribe

  <!--Unsubscribe from an event. If callback is not provided,all callbacks will be removed from subscribers for the event-->

  prototype.events.unsubscribe,



类定义：


#### Session

Base abstract class for Task and Job. It contains common members.

```js
class Session {
    constructor() {
        annotations: {}, frames:{}, logger: {}, actions: {}, events: {},
    }
}
```

上述各个方法的说明在该类的参数注释里面有。



#### Job

Class representing a job.

```js
class Job extends Session {}
```

自有属性与方法

- id

- assignee

  Instance of a user who is responsible for the job

- reviewer

  Instance of a user who is responsible for review

- status

- start_frame

- stop_frame

- task

- __updatedFields

  ```js
  let updatedFields = {
      assignee: false,
      reviewer: false,
      status: false,
  };
  ```

  

- save()

  Method updates job data like status or assignee

真正实现方法：

- Job.prototype.save.implementation

  ```js
  await serverProxy.jobs.saveJob(this.id, jobData);
  ```

  

- Job.prototype.frames.get.implementation

  ```js
  const frameData = await getFrame(
      this.task.id,
      this.task.dataChunkSize,
      this.task.dataChunkType,
      this.task.mode,
      frame,
      this.startFrame,
      this.stopFrame,
      isPlaying,
      step,
  );
  return frameData;
  ```

  调用cvat-core\src\frames.js中的getFrame()方法。

- Job.prototype.frames.ranges.implementation

  ```js
  Job.prototype.frames.ranges.implementation = async function () {
      const rangesData = await getRanges(this.task.id);
      return rangesData;
  };
  ```

  调用cvat-core\src\frames.js中的getRanges(taskID)方法。

- Job.prototype.frames.delete.implementation

  ```js
  Job.prototype.frames.delete.implementation = async function (frameNumber) {
      const result = await serverProxy.frames.deleteFrame(this.id, frameNumber);
      return result;
  };
  ```

  调用cvat-core\src\server-proxy.js中deleteFrame(jobId, frameNumber)方法。

- Job.prototype.annotations.get.implementation

  ```js
  const annotationsData = await getAnnotations(this, frame, allTracks, filters);
  return annotationsData;
  ```

  调用cvat-core\src\annotations.js中的getAnnotations(this, frame, allTracks, filters)。

  

- Job.prototype.annotations.search.implementation

  ```js
  const result = searchAnnotations(this, filters, frameFrom, frameTo);
  return result;
  ```

  调用cvat-core\src\annotations.js中的searchAnnotations(this, filters, frameFrom, frameTo)。

- Job.prototype.annotations.searchEmpty.implementation

  ```js
  const result = searchEmptyFrame(this, frameFrom, frameTo);
  return result;
  ```

  调用cvat-core\src\annotations.js中的searchEmptyFrame(this, frameFrom, frameTo);

- Job.prototype.annotations.save.implementation

  ```js
  const result = await saveAnnotations(this, onUpdate);
  return result;
  ```

  调用cvat-core\src\annotations.js中的saveAnnotations.

- Job.prototype.annotations.merge.implementation

  

- Job.prototype.annotations.split.implementation

  

- Job.prototype.annotations.group.implementation

  

- Job.prototype.annotations.hasUnsavedChanges.implementation

  ```js
  const result = hasUnsavedChanges(this);
  return result;
  ```

  

- Job.prototype.annotations.clear.implementation

  ```js
  const result = await clearAnnotations(this, reload);
  return result;
  ```

  

- Job.prototype.annotations.select.implementation

  ```js
  const result = selectObject(this, frame, x, y);
  return result;
  ```

  

- Job.prototype.annotations.statistics.implementation

  

- Job.prototype.annotations.put.implementation

  ```js
  const result = putAnnotations(this, objectStates);
  return result;
  ```

  

- Job.prototype.annotations.upload.implementation

  

- Job.prototype.annotations.import.implementation

  

- Job.prototype.annotations.export.implementation

  

- Job.prototype.annotations.dump.implementation

  

- Job.prototype.annotations.exportDataset.implementation

  ```js
  const result = await exportDataset(this.task, format);
  return result;
  ```

  

- Job.prototype.actions.redo.implementation

  

- Job.prototype.actions.undo.implementation

  ```js
  const result = undoActions(this, count);
  return result;
  ```

  

- Job.prototype.actions.freeze.implementation

  

- Job.prototype.actions.clear.implementation

  

- Job.prototype.actions.get.implementation

  

- Job.prototype.logger.log.implementation

  

- Job.prototype.frames.preview.implementation

  ```js
  const frameData = await getPreview(this.task.id);
  return frameData;
  ```

  

- 

#### Task

Class representing a task

```js
class Task extends Session {}
```

属性与方法

- id

- name

- status

- size

- mode

- owner

  Instance of a user who has created the task

- assignee

  Instance of a user who is responsible for the task

- createdDate

- updatedDate

- overlap

- segmentSize

- imageQuality

- useZipChunks

- useCache

- labels

  <font color='red'>After task has been created value can be appended only.</font>

- jobs

- serverFiles

  List of files from shared resource

- clientFiles

  List of files from client host

- remoteFiles

  List of files from remote host

- platformFiles

  List of files from ai platform

- datasetFiles

  List of files from ai platform

- startFrame

- stopFrame

- frameFilter

  Filter to ignore some frames during task creation

- dataChunkSize

- dataChunkType

- close()

  Method removes all task related data from the client (annotations, history, etc.)

- save(onUpdate = () => {})

  Method updates data of a created task or creates new task from scratch

- delete()

  Method deletes a task from a server

- exportToPlatform()

  Method exports a task to ai platform

实际执行的方法：

- Task.prototype.close.implementation

  关闭任务？

  ```js
  Task.prototype.close.implementation = function closeTask() {
      clearFrames(this.id);	//frame.js中从frameDataCache清除改任务的信息
      for (const job of this.jobs) {	
          closeSession(job);	//annotations.js的WeakMap缓存中清除Job的信息
      }
  
      closeSession(this);	//annotations.js的WeakMap缓存中清除该Task的信息
      return this;
  };
  ```

  

- Task.prototype.save.implementation

  保存任务：如果任务已经存在，则更新；否则，新建任务。

```js
Task.prototype.save.implementation = async function saveTaskImplementation(onUpdate) {
    //更新任务
	await serverProxy.tasks.saveTask(this.id, taskData);
	...
    //新建任务
	const task = await serverProxy.tasks.createTask(taskSpec, taskDataSpec, onUpdate);    
```

- Task.prototype.delete.implementation

  删除任务

  ```js
  Task.prototype.delete.implementation = async function () {
      const result = await serverProxy.tasks.deleteTask(this.id);
      return result;
  };
  ```

  

- Task.prototype.frames.get.implementation

  获取Task指定帧

  ```js
  Task.prototype.frames.get.implementation = async function (frame, isPlaying, step) {
      const result = await getFrame(	//frames.js    getFrame
          this.id,
          this.dataChunkSize,
          this.dataChunkType,
          this.mode,
          frame,
          0,
          this.size - 1,
          isPlaying,
          step,
      );
      return result;
  };    
  ```

  

- Task.prototype.frames.ranges.implementation

  获取任务的缓存数据。

  ```js
  const rangesData = await getRanges(this.id);
  return rangesData;
  ```

  

- Task.prototype.frames.preview.implementation

  

- Task.prototype.annotations.get.implementation

    获取任务的标注内容

  ```js
  const result = await getAnnotations(this, frame, allTracks, filters);
  return result;
  ```

- Task.prototype.annotations.search.implementation

  

- Task.prototype.annotations.searchEmpty.implementation

  

- Task.prototype.annotations.save.implementation

  

- Task.prototype.annotations.merge.implementation

  

- Task.prototype.annotations.split.implementation

  

- ......

  



cvat.classes.Task、cvat.classes.Job均定义在这里



undo、redo等功能都定义在这里。

### cvat-core\src\annotations.js(*)

标注的所有操作都定义在这里。

#### 定义两个缓存对象

```js
const jobCache = new WeakMap();
const taskCache = new WeakMap();
```

从下面代码可以看出，cahe包含了3个属性。

```js
{collection: Collection, saver: AnnotationsSaver, history: AnnotationsHistory}
```

#### getCache

根据sessionType获取上述定义的两个缓存对象。

#### 从服务器读取标注数据

```js
async function getAnnotationsFromServer(session) {
    const sessionType = session instanceof Task ? 'task' : 'job';
    const cache = getCache(sessionType);

    if (!cache.has(session)) {
        const rawAnnotations = await serverProxy.annotations.getAnnotations(sessionType, session.id);

        // Get meta information about frames
        const startFrame = sessionType === 'job' ? session.startFrame : 0;
        const stopFrame = sessionType === 'job' ? session.stopFrame : session.size - 1;
        const frameMeta = {};
        for (let i = startFrame; i <= stopFrame; i++) {
            frameMeta[i] = await session.frames.get(i);
        }

        const history = new AnnotationsHistory();
        const collection = new Collection({
            labels: session.labels || session.task.labels,
            history,
            startFrame,
            stopFrame,
            frameMeta,
        });
        collection.import(rawAnnotations);

        const saver = new AnnotationsSaver(rawAnnotations.version, collection, session);

        cache.set(session, {
            collection,
            saver,
            history,
        });
    }
}
```

frameMeat[i]结构如下

<img src="cvat-core代码.assets/image-20210515115508042.png" alt="image-20210515115508042" style="zoom: 67%;" />

其中：

从接口读取的代码

```js
const rawAnnotations = await serverProxy.annotations.getAnnotations(sessionType, session.id);
```

​	rawAnnotations中包含版本号字段：rawAnnotations.version。<font color='red'>该字段只是用来和git repos同步标注文件用的，我们不需要。</font>

对应cvat-core\src\server-proxy.js中的代码

```js
// Session is 'task' or 'job'
async function getAnnotations(session, id) {
```

response = await Axios.get(`${backendAPI}/${session}s/${id}/annotations`, {

http://182.138.104.162:16480/annotations/api/v1/jobs/25/annotations

返回内容参见：[response body](cvat 接口整理.md### 获取任务/作业的标注)

需要从session中读取帧数据

```js
frameMeta[i] = await session.frames.get(i);
```

这里的frameMeta是FrameData数据类型

<img src="cvat-core代码.assets/image-20210512115851165.png" alt="image-20210512115851165" style="zoom:80%;" />

AnnotationsHistory定义在[这里](### cvat-core\src\annotations-history.js)

`Collection`定义在cvat-core\src\annotations-collection.js



#### closeSession

从缓存对象中删除指定的session。

```js
async function closeSession(session) {
    const sessionType = session instanceof Task ? 'task' : 'job';
    const cache = getCache(sessionType);

    if (cache.has(session)) {
        cache.delete(session);
    }
}
```

#### getAnnotations

读取指定帧标注：从缓存对象或服务器读取。

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

#### saveAnnotations

```js
async function saveAnnotations(session, onUpdate) {
    const sessionType = session instanceof Task ? 'task' : 'job';
    const cache = getCache(sessionType);

    if (cache.has(session)) {
        await cache.get(session).saver.save(onUpdate);
    }

    // If a collection wasn't uploaded, than it wasn't changed, finally we shouldn't save it
}
```

#### searchAnnotations

从task/job对应的annotations-collections中查找标注。（内存查找）

```js
const sessionType = session instanceof Task ? 'task' : 'job';
const cache = getCache(sessionType);

if (cache.has(session)) {
    return cache.get(session).collection.search(filters, frameFrom, frameTo);
}
```

#### searchEmptyFrame

从task/job对应的annotations-collections中查找空帧。（内存查找）

```js
const sessionType = session instanceof Task ? 'task' : 'job';
const cache = getCache(sessionType);

if (cache.has(session)) {
    return cache.get(session).collection.searchEmpty(frameFrom, frameTo);
}
```

#### mergeAnnotations

调用annotations-collection.merge

```js
const sessionType = session instanceof Task ? 'task' : 'job';
const cache = getCache(sessionType);

if (cache.has(session)) {
    return cache.get(session).collection.merge(objectStates);
}
```

#### splitAnnotations

调用annotations-collection.split

```js
const sessionType = session instanceof Task ? 'task' : 'job';
const cache = getCache(sessionType);

if (cache.has(session)) {
    return cache.get(session).collection.split(objectState, frame);
}
```

#### groupAnnotations

调用annotations-collection.group

```js
const sessionType = session instanceof Task ? 'task' : 'job';
const cache = getCache(sessionType);

if (cache.has(session)) {
    return cache.get(session).collection.group(objectStates, reset);
}
```

#### hasUnsavedChanges

判断是否有未保存的修改标注。调用annotations-saver.hasUnsavedChanges()方法。

```js
const sessionType = session instanceof Task ? 'task' : 'job';
const cache = getCache(sessionType);

if (cache.has(session)) {
    return cache.get(session).saver.hasUnsavedChanges();
}

return false;
```

#### clearAnnotations

清空标注。

调用annotations-saver.clear()方法。

如果reload，需要再次调用`getAnnotationsFromServer(session)`。

```js
const sessionType = session instanceof Task ? 'task' : 'job';
const cache = getCache(sessionType);

if (cache.has(session)) {
    cache.get(session).collection.clear();
}

if (reload) {
    cache.delete(session);
    await getAnnotationsFromServer(session);
}
```

#### annotationsStatistics

```js
function annotationsStatistics(session) {
```

实际调用annotations-collection.js文件中的statistics()方法。

#### putAnnotations

新增标注？

调用annotations-collection.put()方法。

#### selectObject

选择标注

调用annotations-collection.select()方法。

#### uploadAnnotations

上传标注文件。

```js
async function uploadAnnotations(session, file, loader) {
    const sessionType = session instanceof Task ? 'task' : 'job';
    if (!(loader instanceof Loader)) {
        throw new ArgumentError(i18next.t('A loader must be instance of Loader class'));
    }
    await serverProxy.annotations.uploadAnnotations(sessionType, session.id, file, loader.name);
}
```

参考接口文档中【导入标注】。

#### dumpAnnotations

导出标注。

```js
async function dumpAnnotations(session, name, dumper) {
    if (!(dumper instanceof Dumper)) {
        throw new ArgumentError(i18next.t('A dumper must be instance of Dumper class'));
    }

    let result = null;
    const sessionType = session instanceof Task ? 'task' : 'job';
    if (sessionType === 'job') {
        result = await serverProxy.annotations.dumpAnnotations(session.task.id, name, dumper.name);
    } else {
        result = await serverProxy.annotations.dumpAnnotations(session.id, name, dumper.name);
    }

    return result;
}
```

参考接口文档中【导出标注】。

#### importAnnotations

import标注

调用annotations-collection.import()方法。

#### exportAnnotations

调用annotations-collection.export()方法。

#### exportDataset

导出数据集

```js
async function exportDataset(session, format) {
    if (!(format instanceof String || typeof format === 'string')) {
        throw new ArgumentError(i18next.t('Format must be a string'));
    }
    if (!(session instanceof Task)) {
        throw new ArgumentError(i18next.t('A dataset can only be created from a task'));
    }

    let result = null;
    result = await serverProxy.tasks.exportDataset(session.id, format);

    return result;
}
```

参考接口文档中【导出数据集】。

#### undoActions

调用annotations-history.undo(count)。

#### redoActions

调用annotations-history.redo(count)。

#### freezeHistory

调用annotations-history.freeze(frozen)。

#### clearActions

调用annotations-history.clear()。

#### getActions

调用annotations-history.get()。



### cvat-core\src\annotations-history.js

标注操作缓存栈，用于undo、redo。

```js
class AnnotationHistory {
```

#### constructor

```js
constructor() {
    this.frozen = false;
    this.clear();
}
```

#### freeze

设置是否freeze。

```js
freeze(frozen) {
    this.frozen = frozen;
}
```

#### get()

```js
get() {
    return {
        undo: this._undo.map((undo) => [undo.action, undo.frame]),
        redo: this._redo.map((redo) => [redo.action, redo.frame]),
    };
}
```

#### do(action, undo, redo, clientIDs, frame)

#### undo(count)

#### redo(count)

#### clear()

清空undo、redo数组/栈。



### cvat-core\src\annotations-collection.js

作业对应标注内容的集合。

包含了一系列的方法：import，export，get，merge，split，group，statistics，put，select，searchEmpty，search以及两个辅助函数：shapeFactory和trackFactory。

#### shapeFactory(shapeData, clientID, injection)

构造shapeModel

#### trackFactory(trackData, clientID, injection)

构造trackModel

#### constructor

```js
class Collection {
    constructor(data) {
        this.startFrame = data.startFrame;
        this.stopFrame = data.stopFrame;
        this.frameMeta = data.frameMeta;

        this.labels = data.labels.reduce((labelAccumulator, label) => {
            labelAccumulator[label.id] = label;
            return labelAccumulator;
        }, {});

        this.annotationsFilter = new AnnotationsFilter();
        this.history = data.history;
        this.shapes = {}; // key is a frame
        this.tags = {}; // key is a frame
        this.tracks = [];
        this.objects = {}; // key is a client id
        this.count = 0;
        this.flush = false;
        this.groups = {
            max: 0,
        }; // it is an object to we can pass it as an argument by a reference
        this.injection = {
            labels: this.labels,
            groups: this.groups,
            frameMeta: this.frameMeta,
            history: this.history,
            groupColors: {},
        };
    }
```

#### import

从接口返回的数据生成collection的内容。

```js
import(data) {
    const result = {
        tags: [],
        shapes: [],
        tracks: [],
    };

    for (const tag of data.tags) {
        const clientID = ++this.count;
        const color = colors[clientID % colors.length];
        const tagModel = new Tag(tag, clientID, color, this.injection);
        this.tags[tagModel.frame] = this.tags[tagModel.frame] || [];
        this.tags[tagModel.frame].push(tagModel);
        this.objects[clientID] = tagModel;

        result.tags.push(tagModel);
    }
    
    for (const shape of data.shapes) {
        const clientID = ++this.count;
        const shapeModel = shapeFactory(shape, clientID, this.injection);
        this.shapes[shapeModel.frame] = this.shapes[shapeModel.frame] || [];
        this.shapes[shapeModel.frame].push(shapeModel);
        this.objects[clientID] = shapeModel;

        result.shapes.push(shapeModel);
    }

    for (const track of data.tracks) {
        const clientID = ++this.count;
        const trackModel = trackFactory(track, clientID, this.injection);
        // The function can return null if track doesn't have any shapes.
        // In this case a corresponded message will be sent to the console
        if (trackModel) {
            this.tracks.push(trackModel);
            this.objects[clientID] = trackModel;

            result.tracks.push(trackModel);
        }
    }

    return result;
}    
```

这里生成了ClientID值。

#### export

```js
export() {
```

将collection中的对象生成接口需要的内容格式。即：

```json
{
  "version": 3,
  "tags": [],
  "shapes": [
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        180.935546875,
        7.013671875,
        816.6929321289062,
        803.1107788085938
      ],
      "id": 160,
      "frame": 0,
      "label_id": 35,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        30.6328125,
        24.013671875,
        468.09033203125,
        743.8065795898438
      ],
      "id": 161,
      "frame": 1,
      "label_id": 35,
      "group": 0,
      "source": "manual",
      "attributes": []
    }
  ],
  "tracks": []
}
```

#### get

获取指定帧对应的objectStates（包括了tracks, shapes, tags）。

```js
get(frame, allTracks, filters) {
```

#### merge

```js
merge(objectStates) {
```

#### split

```js
split(objectState, frame) {
```

#### group

```js
group(objectStates, reset) {
```

#### clear()

清空所有标注内容

```js
clear() {
    this.shapes = {};
    this.tags = {};
    this.tracks = [];
    this.objects = {}; // by id
    this.count = 0;

    this.flush = true;
}
```

#### statistics

```js
statistics() {
```

#### put

合并objectStates到当前集合中。

```js
put(objectStates) {
```



#### select

选中指定坐标的objectStates

```js
select(objectStates, x, y) {
```

#### searchEmpty

查找未标注过的帧。用于Go back/next to an empty frame

```js
searchEmpty(frameFrom, frameTo) {
```

<img src="cvat-core代码.assets/image-20210512165621161.png" alt="image-20210512165621161" style="zoom:80%;" />

#### search

根据过滤规则进行查找。用于Go back/next with a filter。

```js
search(filters, frameFrom, frameTo) {
```

其中过滤规则的设置在

<img src="cvat-core代码.assets/image-20210512170106404.png" alt="image-20210512170106404" style="zoom:80%;" />



### cvat-core\src\annotations-objects.js

定义一系列标注对象。（Tag、Shape、Track）

#### 辅助函数

##### objectStateFactory(frame, data)（※）

```js
// Called with the Annotation context
function objectStateFactory(frame, data) {
    const objectState = new ObjectState(data);

    // eslint-disable-next-line no-underscore-dangle
    objectState.__internal = {
        save: this.save.bind(this, frame, objectState),
        delete: this.delete.bind(this),
    };

    return objectState;
}
```



##### fitPoints(shapeType, points, maxX, maxY)

过滤指定坐标范围内的点？

##### checkShapeArea(shapeType, points)

检查长度/面积是否大于指定阈值。

##### checkOutside(points, width, height)

检查点是否都在图片坐标范围内。



#### Annotation

标注抽象类。

```js
class Annotation {
```

方法：

##### appendDefaultAttributes(label)

标签属性设置默认值。

##### updateTimestamp

如果存在任何改变，更新时间戳。

##### delete

删除当前object，并添加信息到History栈。

```js
delete(frame, force) {
    if (!this.lock || force) {
        this.removed = true;

        this.history.do(
            HistoryActions.REMOVED_OBJECT,
            () => {
                this.serverID = undefined;
                this.removed = false;
                this.updated = Date.now();
            },
            () => {
                this.removed = true;
                this.updated = Date.now();
            },
            [this.clientID],
            frame,
        );
    }

    return this.removed;
}
```

##### _validateStateBeforeSave(frame, data, updated)

检查updated参数的数据类型是否正确，并剔除掉frame宽高范围外的坐标点。

```js
// 代码略
```



#### Drawn

绘图抽象类。

```js
class Drawn extends Annotation {
```

##### constructor

```js
constructor(data, clientID, color, injection) {
    super(data, clientID, color, injection);
    this.frameMeta = injection.frameMeta;
    this.hidden = false;
    this.pinned = true;
    this.shapeType = null;
}
```

##### _savePinned(pinned, frame)



#### Shape

```js
class Shape extends Drawn {
```



##### toJSON()

// Method is used to export data to the server

##### get(frame)

// Method is used to construct ObjectState objects

##### _savePoints(points, frame)

##### _saveOccluded(occluded, frame)

##### _saveZOrder(zOrder, frame)

##### save(frame, data)

保存数据，并返回ObjectsState对象。

#### RectangleShape

```js
class RectangleShape extends Shape {
```

#### PolyShape

抽象类

```js
class PolyShape extends Shape {
```



#### PolygonShape

```js
class PolygonShape extends PolyShape {
```



#### PolylineShape

```js
class PolylineShape extends PolyShape {
```



#### PointsShape

```js
class PointsShape extends PolyShape {
```



#### CuboidShape

```js
class CuboidShape extends Shape {
```

#### Track

抽象类

```js
class Track extends Drawn {
```

#### RectangleTrack

#### PolyTrack

#### PolygonTrack

#### PolylineTrack

#### PointsTrack

#### CuboidTrack

#### Tag

```js
class Tag extends Annotation {
```

##### toJSON()

// Method is used to export data to the server

##### get(frame)

// Method is used to construct ObjectState objects

##### save(frame, data)



### cvat-core\src\annotations-filter.js

标注过滤器。用于根据条件查询标注。

```js
class AnnotationsFilter {
```

#### constructor()

#### _splitWithOperator(container, expression)

// Method splits expression by operators that are outside of any brackets

#### _groupByBrackets(container, expression)

// Method groups bracket containings to nested arrays of container

#### _parse(expression)

#### _join(groups)

#### _convertObjects(statesData)

#### toJSONQuery

```js
toJSONQuery(filters) {
```

将filters转换成JSONQuery

#### filter

```js
filter(statesData, query) {
    try {
        const objects = this._convertObjects(statesData);
        return jsonpath.query(objects, query);
    } catch (error) {
        throw new ArgumentError(i18next.t('Could not apply the filter. ${error.toString()}').replace('${error.toString()}', `${error.toString()}`));
    }
}
```

查询符合条件的objects。使用jsonpath查询语法。



### cvat-core\src\annotations-saver.js

标注保存类。

```js
class AnnotationsSaver {
```

#### 字段

- sessionType

- id

- version

  对应engine_jobcommit表中的version字段。job提交一次，version+1。（用于和github reps同步标注文件，进行对比？）。

- collection

- initialObjects

  ```json
  {
  	shapes:{},
      tracks:{},
      tags:{},
  }
  ```

  

- hash

#### 构造函数

```js
constructor(version, collection, session) {
	this.sessionType = session instanceof Task ? 'task' : 'job';
	this.id = session.id;
	this.version = version;
	this.collection = collection;
	this.initialObjects = {};
	this.hash = this._getHash();

	// We need use data from export instead of initialData
	// Otherwise we have differ keys order and JSON comparison code incorrect
	const exported = this.collection.export();

	this._resetState();
	for (const shape of exported.shapes) {
		this.initialObjects.shapes[shape.id] = shape;
	}

	for (const track of exported.tracks) {
		this.initialObjects.tracks[track.id] = track;
	}

	for (const tag of exported.tags) {
		this.initialObjects.tags[tag.id] = tag;
	}
}
```

需要传入version



#### _resetState()

清空initialObjects。

```js
_resetState() {
    this.initialObjects = {
        shapes: {},
        tracks: {},
        tags: {},
    };
}
```



#### _getHash()

转换JSON.stringify

```js
_getHash() {
	const exported = this.collection.export();
	return JSON.stringify(exported);
}
```



#### async _request(data, action)

向服务端发送请求

```js
async _request(data, action) {
	const result = await serverProxy.annotations.updateAnnotations(this.sessionType, this.id, data, action);

	return result;
}
```

对应后台接口

http://192.168.1.18/annotations/api/v1/jobs/112/annotations?action=create

#### _put

Method performs an update of all annotations in a specific job

```js
async _put(data) {
    const result = await this._request(data, 'put');
    return result;
}
```

对应后台接口

http://192.168.1.18/annotations/api/v1/jobs/112/annotations?action=put

PUT

#### _create

Method performs a partial update of annotations in a specific job

```js
async _create(created) {
    const result = await this._request(created, 'create');
    return result;
}
```

对应后台接口

http://192.168.1.18/annotations/api/v1/jobs/112/annotations?action=create

PATCH

#### _update

Method performs a partial update of annotations in a specific job

```js
async _update(updated) {
    const result = await this._request(updated, 'update');
    return result;
}
```

对应后台接口

http://192.168.1.18/annotations/api/v1/jobs/112/annotations?action=update

PATCH

#### _delete(deleted)

Method performs a partial update of annotations in a specific job

```js
async _delete(deleted) {
    const result = await this._request(deleted, 'delete');
    return result;
}
```

对应后台接口

http://192.168.1.18/annotations/api/v1/jobs/112/annotations?action=delete

PATCH

#### _split(exported)

拆分成created、updated、deleted 3部分。

#### _updateCreatedObjects(saved, indexes)

更新新增标注的serverID字段值。

```js
// Updated IDs of created objects(包括clientID、serverID)
for (const type of Object.keys(indexes)) {
	for (let i = 0; i < indexes[type].length; i++) {
		const clientID = indexes[type][i];
		this.collection.objects[clientID].serverID = saved[type][i].id;
	}
}
```

serverID字段内容从这里设置，标注在服务器上生成的id。



#### _receiveIndexes(exported)

返回exported中的clientID对象。

```js
_receiveIndexes(exported) {
    // Receive client indexes before saving
    const indexes = {
        tracks: exported.tracks.map((track) => track.clientID),
        shapes: exported.shapes.map((shape) => shape.clientID),
        tags: exported.tags.map((tag) => tag.clientID),
    };

    // Remove them from the request body
    exported.tracks
        .concat(exported.shapes)
        .concat(exported.tags)
        .map((value) => {
        delete value.clientID;
        return value;
    });

    return indexes;
}
```



#### save

保存标注内容。

```js
async save(onUpdate) {
    // flush === true，一并提交
    const savedData = await this._put({ ...exported, version: this.version });
    this.version = savedData.version;
    
    // flush === false，分开提交
    const createdData = await this._create({ ...created, version: this.version });
    this.version = createdData.version;
    
    const updatedData = await this._update({ ...updated, version: this.version });
    this.version = updatedData.version;
    
    const deletedData = await this._delete({ ...deleted, version: this.version });
    this._version = deletedData.version;    
    
```

保存之后，返回的数据会有version字段。



### cvat-core\src\annotation-formats.js

​    定义了AnnotationFormats,    Loader,    Dumper 3个类。

​	从AnnotationFormats中可以获得exporters和importers。

#### Loader

##### name

##### format

##### version

##### enabled

#### Dumper

##### name

##### format

##### version

##### enabled

#### AnnotationFormats

##### loaders

##### dumpers

### cvat-core\src\labels.js

标注及其属性定义。

定义了两个类：Attribute、Label。

#### Attribute

Class representing an attribute

包含以下属性：

- id：integer

- defaultValue：(string|integer|boolean)

- inputType：API.cvat.enums.AttributeType

  ```js
  const AttributeType = Object.freeze({
      CHECKBOX: 'checkbox',
      RADIO: 'radio',
      SELECT: 'select',
      NUMBER: 'number',
      TEXT: 'text',
  });
  ```

  

- mutable：boolean

- name：string

- values: (string[]|integer[]|boolean[])

包含的方法：

- toJSON()

#### Label

Class representing a label

包含以下属性：

- id
- name
- color
- attributes: API.cvat.classes.Attribute[]

包含的方法：

- toJSON()

### cvat-core\src\enums.js

枚举类型定义。

#### ObjectType

```js
const ObjectType = Object.freeze({
    TAG: 'tag',
    SHAPE: 'shape',
    TRACK: 'track',
});
```

#### ObjectShape

```js
const ObjectShape = Object.freeze({
    RECTANGLE: 'rectangle',
    POLYGON: 'polygon',
    POLYLINE: 'polyline',
    POINTS: 'points',
    CUBOID: 'cuboid',
});
```

#### Source

```js
const Source = Object.freeze({
    MANUAL: 'manual',
    AUTO: 'auto',
}); 
```

#### ModelType

```js
const ModelType = {
    DETECTOR: 'detector',
    INTERACTOR: 'interactor',
    TRACKER: 'tracker',
};
```

#### ShareFileType

```js
const ShareFileType = Object.freeze({
    DIR: 'DIR',
    REG: 'REG',
});
```

#### TaskStatus

```js
const TaskStatus = Object.freeze({
    ANNOTATION: 'annotation',
    VALIDATION: 'validation',
    COMPLETED: 'completed',
});
```

#### RQStatus

```js
const RQStatus = Object.freeze({
    QUEUED: 'queued',
    STARTED: 'started',
    FINISHED: 'finished',
    FAILED: 'failed',
    UNKNOWN: 'unknown',
});
```

#### TaskMode

```js
const TaskMode = Object.freeze({
    ANNOTATION: 'annotation',
    INTERPOLATION: 'interpolation',
});
```

#### AttributeType

```js
const AttributeType = Object.freeze({
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    SELECT: 'select',
    NUMBER: 'number',
    TEXT: 'text',
});
```



### cvat-core\src\statistics.js

统计类定义，对应Info弹框里面的信息。

### cvat-core\src\object-state.js

Class representing a state of an object on a specific frame

增强版的annotation-object

```js
class ObjectState {
```

**必选字段**: 

- objectType： enums.ObjectType

```js
const ObjectType = Object.freeze({
    TAG: 'tag',
    SHAPE: 'shape',
    TRACK: 'track',
});
```
- shapeType：enums.ObjectShape

```js
const ObjectShape = Object.freeze({
    RECTANGLE: 'rectangle',
    POLYGON: 'polygon',
    POLYLINE: 'polyline',
    POINTS: 'points',
    CUBOID: 'cuboid',
});
```

- frame：integer

- updated：number

  Timestamp of the latest updated of the object

- group：object

  Object with short group info { color, id }

- 

**可选字段**: 

- keyframes：{object | null}

  Object of keyframes { first, prev, next, last }

- clientID：integer

- serverID：integer

**后续可以设置的可选字段**: 

- points：number[]

- zOrder：integer | null

- outside：boolean

- occluded：boolean

- hidden：boolean

- attributes：Object

  Object is id:value pairs where "id" is an integer attribute identifier and "value" is an attribute value

- lock：boolean

- label：API.cvat.classes.Label

- color：string

- keyframe：boolean

- source：API.cvat.enums.Source

  ```js
  const Source = Object.freeze({
      MANUAL: 'manual',
      AUTO: 'auto',
  });
  ```

  

- pinned：boolean

#### constructor(serialized)



#### async save()

Method saves/updates an object state in a collection

```js
const result = await PluginRegistry.apiWrapper.call(this, ObjectState.prototype.save);
return result;
```

实际执行的是：

```js
// Updates element in collection which contains it
ObjectState.prototype.save.implementation = async function () {
    if (this.__internal && this.__internal.save) {
        return this.__internal.save();
    }

    return this;
};
```

---------------->cvat-core\src\annotations-objects.js

中的objectStateFactory方法内部定义的save方法。

__internal的定义如下：

```js
// Called with the Annotation context
function objectStateFactory(frame, data) {
    const objectState = new ObjectState(data);

    // eslint-disable-next-line no-underscore-dangle
    objectState.__internal = {
        save: this.save.bind(this, frame, objectState),
        delete: this.delete.bind(this),
    };

    return objectState;
}
```



#### delete(frame, force = false)

Delete element from a collection which contains it

实际执行代码

```js
// Delete element from a collection which contains it
ObjectState.prototype.delete.implementation = async function (frame, force) {
    if (this.__internal && this.__internal.delete) {
        if (!Number.isInteger(+frame) || +frame < 0) {
            throw new ArgumentError('Frame argument must be a non negative integer');
        }

        return this.__internal.delete(frame, force);
    }

    return false;
};
```

---------------->cvat-core\src\annotations-objects.js

中的objectStateFactory方法内部定义的delete方法。



### cvat-core\src\plugins.js

#### PluginRegistry

类

##### static async apiWrapper(wrappedFunc, ...args)

静态方法

##### static async register(plug)

静态方法

##### static async list()

静态方法

### cvat-core\src\log.js

定义了以下几个类：

#### Log

抽象类

#### LogWithCount

```js
class LogWithCount extends Log {
```

#### LogWithObjectsInfo

#### LogWithWorkingTime

#### LogWithExceptionInfo

#### logFactory

工厂函数：根据logType返回对应的Log子对象。



### cvat-core\src\logger-storage.js

#### LoggerStorage

类

##### constructor()

```js
this.clientID = Date.now().toString().substr(-6);
```

##### updateWorkingTime

更新工作时间



##### async configure(isActiveChecker, activityHelper)

##### async log(logType, payload = {}, wait = false)

##### async save()

### cvat-core\src\frames.js

图片帧相关类及操作函数：



首先定义frameDataCache，帧数据缓存

```js
// This is the frames storage
const frameDataCache = {};
```



#### FrameData

Class provides meta information about specific frame and frame itself，即帧的封装对象。

##### constructor

```js
constructor({
    width, height, name, taskID, frameNumber, startFrame, stopFrame, decodeForward,
})
```

其中定义了如下属性：

- filename
- width
- height
- tid
- number
- startFrame
- stopFrame
- decodeForward

方法：

##### async data(onServerRequest = () => {})

Method returns URL encoded image which can be placed in the img tag

​     \* @param {function} [onServerRequest = () => {}]

​     \* callback which will be called if data absences local

```js
async data(onServerRequest = () => {}) {
    const result = await PluginRegistry.apiWrapper.call(this, FrameData.prototype.data, onServerRequest);
    return result;
}
```

实际调用的方法：

##### FrameData.prototype.data.implementation

```js
// 代码看不懂
```



#### FrameBuffer---帧缓冲

##### constructor(size, chunkSize, stopFrame, taskID)

```js
class FrameBuffer {
    constructor(size, chunkSize, stopFrame, taskID) {
        this._size = size;
        this._buffer = {};
        this._requestedChunks = {};
        this._chunkSize = chunkSize;
        this._stopFrame = stopFrame;
        this._activeFillBufferRequest = false;
        this._taskID = taskID;
    }
```



#### frameDataCache

```js
// This is the frames storage
const frameDataCache = {};
```

关键对象：

frameDataCache，存储帧数据缓存信息

```js
frameDataCache[taskID] = {
    meta,
    chunkSize,
    mode,
    startFrame,
    stopFrame,
    provider: new cvatData.FrameProvider(
        blockType,
        chunkSize,
        Math.max(decodedBlocksCacheSize, 9),
        decodedBlocksCacheSize,
        1,
    ),
    frameBuffer: new FrameBuffer(
        Math.min(180, decodedBlocksCacheSize * chunkSize),
        chunkSize,
        stopFrame,
        taskID,
    ),
    decodedBlocksCacheSize,
    activeChunkRequest: null,
    nextChunkRequest: null,
};
```

包含的关键方法：

#### getPreview

获取标注任务预览图

```js
async function getPreview(taskID) {
```

调用方法：

```js
// Just go to server and get preview (no any cache)
serverProxy.frames
    .getPreview(taskID)
```



#### getFrame(taskID, chunkSize, chunkType, mode, frame, startFrame, stopFrame, isPlaying, step)

获取指定帧

```js
async function getFrame(taskID, chunkSize, chunkType, mode, frame, startFrame, stopFrame, isPlaying, step) {
    if (!(taskID in frameDataCache)) {
        const blockType = chunkType === 'video' ? cvatData.BlockType.MP4VIDEO : cvatData.BlockType.ARCHIVE;

        const meta = await serverProxy.frames.getMeta(taskID);
        const mean = meta.frames.reduce((a, b) => a + b.width * b.height, 0) / meta.frames.length;
        const stdDev = Math.sqrt(
            meta.frames.map((x) => Math.pow(x.width * x.height - mean, 2)).reduce((a, b) => a + b)
            / meta.frames.length,
        );

        // limit of decoded frames cache by 2GB
        const decodedBlocksCacheSize = Math.floor(2147483648 / (mean + stdDev) / 4 / chunkSize) || 1;

        frameDataCache[taskID] = {
            meta,
            chunkSize,
            mode,
            startFrame,
            stopFrame,
            provider: new cvatData.FrameProvider(
                blockType,
                chunkSize,
                Math.max(decodedBlocksCacheSize, 9),
                decodedBlocksCacheSize,
                1,
            ),
            frameBuffer: new FrameBuffer(
                Math.min(180, decodedBlocksCacheSize * chunkSize),
                chunkSize,
                stopFrame,
                taskID,
            ),
            decodedBlocksCacheSize,
            activeChunkRequest: null,
            nextChunkRequest: null,
        };
        const frameMeta = getFrameMeta(taskID, frame);
        // actual only for video chunks
        frameDataCache[taskID].provider.setRenderSize(frameMeta.width, frameMeta.height);
    }

    return frameDataCache[taskID].frameBuffer.require(frame, taskID, isPlaying, step);
}
```

#### getFrameMeta(taskID, frame)

获取帧的元信息（width, height）

```js
function getFrameMeta(taskID, frame) {
```

#### getRanges

获取任务的缓冲数据？

```js
function getRanges(taskID) {
```

#### clear

清除任务缓冲数据

```js
function clear(taskID) {
```

其中用到了cvat-data.js的FrameProvider类。

### cvat-data\src\js\cvat-data.js

从数据缓存中读取帧数据。

```js
class FrameProvider {
```



### cvat-core\src\ml-model.js

#### MLModel

机器学习模型类

包含如下字段：

id

name

labels

framework

description

type

params



## 笔记

### Object.freeze()

Object.freeze() 方法用于冻结对象，禁止对于该对象的属性进行修改（由于`数组本质也是对象`，因此该方法可以对数组使用）。

https://juejin.im/post/6844903922469961741

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

Object.freeze(..) 会创建一个冻结对象， 这个方法实际上会在一个现有对象上调用Object.seal(..) 并把所有“数据访问” 属性标记为 writable:false， 这样就无法修改它们的值。
这个方法是你可以应用在对象上的级别最高的不可变性， 它会禁止对于对象本身及其任意直接属性的修改（不过就像我们之前说过的， 这个对象引用的其他对象是不受影响的）。
你可以“深度冻结” 一个对象， 具体方法为， 首先在这个对象上调用 Object.freeze(..)，然后遍历它引用的所有对象并在这些对象上调用 Object.freeze(..)。 但是一定要小心， 因为这样做有可能会在无意中冻结其他（共享） 对象。  

### Object.defineProperties()

**`Object.defineProperties()`** 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

```js
Object.defineProperties(obj, props)
```

可以参考《你不知道的JavaScript上卷》，P111.

### 数组解构赋值法

```js
[task.assignee] = users.filter((user) => user.username === task.assignee);
```

### __internal

js中以__开头的对象/方法，表示私有。



## 汉化

1、Uncaught TypeError: i18next.init is not a function

https://stackoverflow.com/questions/42477112/uncaught-typeerror-i18next-init-is-not-a-function

2、i18next-node-fs-backend示例

https://codesandbox.io/s/9o68r5o8mp?file=/server.js:661-668



## 删除frame后相应要做的修改

1、cvat-core\src\annotations-history.js文件中的方法。

