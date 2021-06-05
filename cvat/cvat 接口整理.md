# swagger接口整理

http://182.138.104.162:16480/annotations/api/swagger/

## auth

### auth_login_create

**POST**/auth/login

## datas（新增的接口？）

**GET**/datas																																																			datas_list

#### Request URL

```sh
http://182.138.104.162:16480/api/v1/datas
```

## datasets（新增的接口？）

**GET**/datasets/{id}																																																datasets_read

对接AI平台数据集？



## jobs

### **GET	**/jobs/{id}

Method returns details of a job

jobs_read

### **PUT	**/jobs/{id}

Method updates a job by id

jobs_update

### **PATCH**	/jobs/{id}

Methods does a partial update of chosen fields in a job

jobs_partial_update

### **GET**	/jobs/{id}/annotations

Method returns annotations for a specific job

jobs_annotations_read

### **PUT**	/jobs/{id}/annotations

Method performs an update of all annotations in a specific job

jobs_annotations_update

### **PATCH**	/jobs/{id}/annotations

Method performs a partial update of annotations in a specific job

jobs_annotations_partial_update

### **DELETE**	/jobs/{id}/annotations

Method deletes all annotations for a specific job

jobs_annotations_delete

## lambda

### **GET**	/lambda/functions

lambda_functions_list

### **GET**	/lambda/functions/{func_id}

lambda_functions_read

### **POST**	/lambda/functions/{func_id}

lambda_functions_create

### **GET**	/lambda/requests

lambda_requests_list

### **POST**	/lambda/requests

lambda_requests_create

### **GET**	/lambda/requests/{id}

lambda_requests_read

## projects

### **GET**	/projects

Returns a paginated list of projects according to query parameters (10 projects per page)

projects_list

### **POST**	/projects

Method creates a new project

projects_create

**参数：**

```json
{
  "name": "string",
  "owner": "string",
  "assignee": "string",
  "bug_tracker": "string"
}
```

**响应：**

- code	

201

- Example Value

```json
{
  "url": "string",
  "id": 0,
  "name": "string",
  "owner": "string",
  "assignee": "string",
  "bug_tracker": "string",
  "created_date": "2021-04-25T04:11:45.511Z",
  "updated_date": "2021-04-25T04:11:45.511Z",
  "status": "annotation"
}
```

### projects_read

**GET**	/projects/{id}

Method returns details of a specific project

**参数：**

| **Name** | Type    | **Description**                                  | required |
| -------- | ------- | ------------------------------------------------ | -------- |
| id       | integer | A unique integer value identifying this project. | Y        |

**响应**：



### projects_partial_update

**PATCH**/projects/{id}

Methods does a partial update of chosen fields in a project

**参数：**

| **Name** | Type    | **Description**                                  | required |
| -------- | ------- | ------------------------------------------------ | -------- |
| id       | integer | A unique integer value identifying this project. | Y        |

### projects_delete

**DELETE**	/projects/{id}

Method deletes a specific project



### projects_tasks

**GET**	/projects/{id}/tasks

Returns information of the tasks of the project with the selected id

## restrictions

### restrictions_terms_of_use

**GET**	/restrictions/terms-of-use

**参数：**

No parameters

**响应**：

| Code | Description |
| ---- | ----------- |
| 200  |             |

### restrictions_user_agreements

**GET**	/restrictions/user-agreements

Method provides user agreements that the user must accept to register

## server

### ~~server_about~~

**GET**	/server/about

Method provides basic CVAT information

### server_annotation_annotation_formats(P2)

**GET**	/server/annotation/formats

Method provides the list of supported annotations formats

```json
{
    "importers": [
        {
            "name": "COCO 1.0",
            "ext": "JSON, ZIP",
            "version": "1.0",
            "enabled": true
        },
        {
            "name": "CVAT 1.1",
            "ext": "XML, ZIP",
            "version": "1.1",
            "enabled": true
        },
        {
            "name": "LabelMe 3.0",
            "ext": "ZIP",
            "version": "3.0",
            "enabled": true
        },
        {
            "name": "Segmentation mask 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        },
        {
            "name": "MOT 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        },
        {
            "name": "MOTS PNG 1.0",
            "ext": "ZIP",
            "version": "1.0",
            "enabled": true
        },
        {
            "name": "PASCAL VOC 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        },
        {
            "name": "TFRecord 1.0",
            "ext": "ZIP",
            "version": "1.0",
            "enabled": true
        },
        {
            "name": "YOLO 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        }
    ],
    "exporters": [
        {
            "name": "COCO 1.0",
            "ext": "ZIP",
            "version": "1.0",
            "enabled": true
        },
        {
            "name": "CVAT for video 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        },
        {
            "name": "CVAT for images 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        },
        {
            "name": "Datumaro 1.0",
            "ext": "ZIP",
            "version": "1.0",
            "enabled": true
        },
        {
            "name": "LabelMe 3.0",
            "ext": "ZIP",
            "version": "3.0",
            "enabled": true
        },
        {
            "name": "Segmentation mask 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        },
        {
            "name": "MOT 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        },
        {
            "name": "MOTS PNG 1.0",
            "ext": "ZIP",
            "version": "1.0",
            "enabled": true
        },
        {
            "name": "PASCAL VOC 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        },
        {
            "name": "TFRecord 1.0",
            "ext": "ZIP",
            "version": "1.0",
            "enabled": true
        },
        {
            "name": "YOLO 1.1",
            "ext": "ZIP",
            "version": "1.1",
            "enabled": true
        }
    ]
}
```



### server_exception	(P2)

**POST**	/server/exception

Saves an exception from a client on the server

### server_logs

**POST**	/server/logs

Saves logs from a client on the server

### server_plugins

**GET**	/server/plugins

Method provides allowed plugins.

### server_share	(P3)

**GET**	/server/share

Returns all files and folders that are on the server along specified path



## tasks

### tasks_list

**GET**	/tasks

Returns a paginated list of tasks according to query parameters (10 tasks per page)

http://192.168.1.18/annotations/api/v1/tasks?page_size=10&page=1

```json
{
  "count": 48,
  "next": "http://192.168.1.18/api/v1/tasks?page=2&page_size=10",
  "previous": null,
  "results": [
    {
      "url": "http://192.168.1.18/api/v1/tasks/100",
      "id": 100,
      "name": "car",
      "mode": "annotation",
      "owner": "testzong",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-26T08:21:13.996946Z",
      "updated_date": "2021-04-26T08:21:14.447445Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "annotation",
      "labels": [
        {
          "id": 129,
          "name": "sky",
          "color": "#508040",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 10,
          "jobs": [
            {
              "url": "http://192.168.1.18/api/v1/jobs/81",
              "id": 81,
              "assignee": null,
              "status": "annotation"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 3,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 11,
      "image_quality": 70,
      "data": 99
    },
    ...
  ]
}
```



### tasks_create

**POST**	/tasks

Method creates a new task in a database without any attached images and videos

### tasks_read

**GET**	/tasks/{id}

Method returns details of a specific task

### tasks_update

**PUT**	/tasks/{id}

Method updates a task by id

### tasks_partial_update

**PATCH**	/tasks/{id}

Methods does a partial update of chosen fields in a task

### tasks_delete

**DELETE**	/tasks/{id}

Method deletes a specific task, all attached jobs, annotations, and data

### tasks_annotations_read

**GET**	/tasks/{id}/annotations

Method allows to download task annotations

### tasks_annotations_update

**PUT**	/tasks/{id}/annotations

Method allows to upload task annotations

### tasks_annotations_partial_update

**PATCH**	/tasks/{id}/annotations

Method performs a partial update of annotations in a specific task

### tasks_annotations_delete

**DELETE**	/tasks/{id}/annotations

Method deletes all annotations for a specific task

### tasks_data_read

**GET**	/tasks/{id}/data

Method returns data for a specific task

### tasks_data_create

**POST**	/tasks/{id}/data

Method permanently attaches images or video to a task

### tasks_data_data_info

**GET**/tasks/{id}/data/meta

Method provides a meta information about media files which are related with the task

### tasks_dataset_export

**GET**/tasks/{id}/dataset

Export task as a dataset in a specific format

### tasks_jobs

**GET**/tasks/{id}/jobs

Returns a list of jobs for a specific task

### tasks_save_to_platform

**GET**/tasks/{id}/

save_to_platform

### tasks_status

**GET**/tasks/{id}/status

When task is being created the method returns information about a status of the creation process

## users（用户管理系统提供）

### users_list

**GET**	/users

Method provides a paginated list of users registered on the server

===========>

**响应**：



### users_self

**GET**	/users/self

Method returns an instance of a user who is currently authorized

### users_read

**GET**	/users/{id}

Method provides information of a specific user

### users_partial_update

**PATCH**	/users/{id}

Method updates chosen fields of a user

### users_delete

**DELETE**	/users/{id}

Method deletes a specific user from the server



# 按功能整理接口

## 用户相关

### 用户登录

需权限管理系统提供

### 获取当前用户

http://182.138.104.162:16480/custom-user-dashboard-backend/auth/currentUser

GET

**响应体**

```json
{
  "success": true,
  "id": 30001,
  "userName": "admin",
  "phone": null,
  "registerType": "Account",
  "email": null,
  "openId": null,
  "microsoftId": null,
  "wechatId": null,
  "nickName": null,
  "currentRole": [
    "System Admin"
  ],
  "permissionList": [
    "SUBMIT_TRAINING_JOB",
    "VIEW_ALL_USER_JOB",
    "VIEW_AND_MANAGE_ALL_USERS_JOB",
    "VIEW_CLUSTER_STATUS",
    "MANAGE_USER",
    "AI_ARTS_ALL",
    "MANAGE_VC",
    "MANAGE_JOBS",
    "ANNOTATIONS_ADMIN",
    "ANNOTATIONS_USER",
    "ANNOTATIONS_OBSERVER",
    "ANNOTATIONS_ANNOTATOR",
    "MANAGE_PRIVILEGE_JOB",
    "SUBMIT_PRIVILEGE_JOB",
    "VIEW_VC",
    "LABELING_IMAGE",
    "DISPATCH_LABELING_TASK",
    "REVIEW_LABELING_TASK"
  ],
  "currentVC": [
    "platform"
  ],
  "jobMaxTimeSecond": null
}
```

### 获取用户列表

http://182.138.104.162:16480/custom-user-dashboard-backend/users/cvat/users?pageNo=1&pageSize=all

GET

**响应体**

```json
{
  "count": 1,
  "total": 1,
  "result": [
    {
      "permissionList": [
        "SUBMIT_TRAINING_JOB",
        "VIEW_ALL_USER_JOB",
        "VIEW_AND_MANAGE_ALL_USERS_JOB",
        "VIEW_CLUSTER_STATUS",
        "MANAGE_USER",
        "AI_ARTS_ALL",
        "MANAGE_VC",
        "MANAGE_JOBS",
        "ANNOTATIONS_ADMIN",
        "ANNOTATIONS_USER",
        "ANNOTATIONS_OBSERVER",
        "ANNOTATIONS_ANNOTATOR",
        "MANAGE_PRIVILEGE_JOB",
        "SUBMIT_PRIVILEGE_JOB"
      ],
      "username": "admin",
      "date_joined": "1619435497051",
      "id": 30001,
      "email": null,
      "url": "/custom-user-dashboard-backend/users/cvat/user/30001"
    }
  ]
}
```

## 创建新任务

浏览器URL：

http://182.138.104.162:16480/annotations/tasks/create

### 获取服务器share目录（原有功能，是否需要？）

```js
response = await Axios.get(`${backendAPI}/server/share?directory=${directory}`, {
```



### 获取数据集（已有）

http://182.138.104.162:16480/dataset_manager/api/cv_datasets/id/57

GET

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": 57,
    "createdAt": 1619510662365,
    "updatedAt": 1619512213229,
    "deletedAt": null,
    "cvDatasetFormat": "COCO 1.0",
    "annotScene": "image",
    "annotType": "object_detection",
    "annotStatus": "unlabeled",
    "extType": "",
    "datasetCode": "9dabf9b3-4d24-4046-acfb-074c939c379b",
    "name": "test_dog1111",
    "description": "",
    "version": "0.1",
    "tag": 11,
    "sourceType": "upload_from_page",
    "sourceDetail": null,
    "storageType": "cluster_fs",
    "storagePath": "dataset-images/dataset-manager/storage/1b304cd8-b99d-4b77-a396-99b6c47e2551",
    "storageDetail": null,
    "itemCount": 8,
    "annotCount": 0,
    "isPublished": false,
    "isLatest": true,
    "jobStatus": "completed",
    "labelList": null,
    "versionCount": ""
  }
}
```

### 提交任务数据

http://182.138.104.162:16480/annotations/api/v1/tasks

POST

**请求体**

```json
{
  "name": "test_dog1111_object_detection_COCO_1.0",
  "labels": [
    {
      "name": "hd",
      "attributes": []
    },
    {
      "name": "person",
      "attributes": []
    },
    {
      "name": "bird",
      "attributes": []
    }
  ],
  "segment_size": "100"
}
```

**响应体**

```json
{
  "url": "http://182.138.104.162:16480/api/v1/tasks/28",
  "id": 28,
  "name": "test_dog1111_object_detection_COCO_1.0",
  "mode": "",
  "owner": "admin",
  "assignee": null,
  "bug_tracker": "",
  "created_date": "2021-05-07T02:19:30.897548Z",
  "updated_date": "2021-05-07T02:19:30.912816Z",
  "overlap": null,
  "segment_size": 100,
  "status": "annotation",
  "labels": [
    {
      "id": 36,
      "name": "hd",
      "color": "#2f069e",
      "attributes": []
    },
    {
      "id": 37,
      "name": "person",
      "color": "#c06060",
      "attributes": []
    },
    {
      "id": 38,
      "name": "bird",
      "color": "#404040",
      "attributes": []
    }
  ],
  "segments": [],
  "project": null
}
```

### 提交数据

http://182.138.104.162:16480/annotations/api/v1/tasks/28/data

POST

**Form Data**

```
dataset_ids[0]: 	57
image_quality:	 70
use_zip_chunks:	 true
use_cache: 	true
```

**响应体**

```json
{
  "chunk_size": null,
  "size": 0,
  "image_quality": 70,
  "start_frame": 0,
  "stop_frame": 0,
  "frame_filter": "",
  "compressed_chunk_type": "imageset",
  "original_chunk_type": "imageset",
  "client_files": [],
  "server_files": [],
  "remote_files": [],
  "platform_files": [],
  "dataset_ids": [
    "57"
  ],
  "use_zip_chunks": false,
  "use_cache": false
}
```

### 获取任务状态

http://182.138.104.162:16480/annotations/api/v1/tasks/28/status

GET

**响应体**

```json
{
  "state": "Finished",
  "message": ""
}
```



## 加载任务列表

浏览器URL：

http://182.138.104.162:16480/annotations/tasks

### 获取任务列表

http://182.138.104.162:16480/annotations/api/v1/tasks?page_size=10&page=1

GET

```json
{
  "count": 22,
  "next": "http://182.138.104.162:16480/api/v1/tasks?page=2&page_size=10",
  "previous": null,
  "results": [
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/27",
      "id": 27,
      "name": "test_object_detection_COCO_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-05-06T09:46:53.531234Z",
      "updated_date": "2021-05-06T09:47:33.194043Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "completed",
      "labels": [
        {
          "id": 35,
          "name": "car",
          "color": "#2080c0",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 1,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/31",
              "id": 31,
              "assignee": null,
              "status": "completed"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 72,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 2,
      "image_quality": 70,
      "data": 36
    },
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/26",
      "id": 26,
      "name": "test_object_detection_COCO_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-05-06T09:45:53.252764Z",
      "updated_date": "2021-05-06T09:46:28.764218Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "completed",
      "labels": [
        {
          "id": 34,
          "name": "car",
          "color": "#2080c0",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 1,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/30",
              "id": 30,
              "assignee": null,
              "status": "completed"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 72,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 2,
      "image_quality": 70,
      "data": 35
    },
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/25",
      "id": 25,
      "name": "test_dog1002_ocr_detection_OCR_DETECTION_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-30T03:54:59.991450Z",
      "updated_date": "2021-05-06T09:47:04.255348Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "annotation",
      "labels": [
        {
          "id": 33,
          "name": "text",
          "color": "#20cc1c",
          "attributes": [
            {
              "id": 4,
              "name": "value",
              "mutable": false,
              "input_type": "text",
              "default_value": "",
              "values": [
                ""
              ]
            }
          ]
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 1,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/28",
              "id": 28,
              "assignee": null,
              "status": "annotation"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 9,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 2,
      "image_quality": 70,
      "data": 33
    },
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/24",
      "id": 24,
      "name": "test_dog121_image_segmentation_COCO_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-30T03:53:49.103952Z",
      "updated_date": "2021-04-30T03:53:49.363911Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "annotation",
      "labels": [
        {
          "id": 32,
          "name": "car",
          "color": "#2080c0",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 2,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/27",
              "id": 27,
              "assignee": null,
              "status": "annotation"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 9,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 3,
      "image_quality": 70,
      "data": 32
    },
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/23",
      "id": 23,
      "name": "test_dog88555_crop_people_1619526789_image_classification_ImageNet_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-30T03:35:28.192996Z",
      "updated_date": "2021-04-30T03:43:29.742201Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "completed",
      "labels": [
        {
          "id": 31,
          "name": "cat",
          "color": "#6080c0",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 10,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/26",
              "id": 26,
              "assignee": null,
              "status": "completed"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 72,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 11,
      "image_quality": 70,
      "data": 31
    },
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/22",
      "id": 22,
      "name": "test_dog88555_crop_people_1619526801_image_classification_ImageNet_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-27T12:38:26.218769Z",
      "updated_date": "2021-04-28T06:31:12.303610Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "annotation",
      "labels": [
        {
          "id": 29,
          "name": "car",
          "color": "#2080c0",
          "attributes": []
        },
        {
          "id": 30,
          "name": "color",
          "color": "#55b297",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 26,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/25",
              "id": 25,
              "assignee": null,
              "status": "annotation"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 72,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 27,
      "image_quality": 70,
      "data": 30
    },
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/21",
      "id": 21,
      "name": "test_dog88555_object_detection_COCO_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-27T12:30:17.424140Z",
      "updated_date": "2021-04-28T04:15:54.617759Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "annotation",
      "labels": [
        {
          "id": 26,
          "name": "people",
          "color": "#b45802",
          "attributes": []
        },
        {
          "id": 27,
          "name": "other",
          "color": "#e6f7bb",
          "attributes": []
        },
        {
          "id": 28,
          "name": "dog",
          "color": "#406040",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 18,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/21",
              "id": 21,
              "assignee": null,
              "status": "annotation"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 72,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 19,
      "image_quality": 70,
      "data": 26
    },
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/19",
      "id": 19,
      "name": "test_ocr_crop_text_1619509293_ocr_recognition_OCR_RECOGNITION_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-27T08:05:13.639419Z",
      "updated_date": "2021-04-30T03:58:12.950562Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "annotation",
      "labels": [
        {
          "id": 24,
          "name": "text",
          "color": "#20cc1c",
          "attributes": [
            {
              "id": 3,
              "name": "value",
              "mutable": false,
              "input_type": "text",
              "default_value": "",
              "values": [
                ""
              ]
            }
          ]
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 11,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/17",
              "id": 17,
              "assignee": null,
              "status": "annotation"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 72,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 12,
      "image_quality": 70,
      "data": 22
    },
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/14",
      "id": 14,
      "name": "test-lin01_object_detection_COCO_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-27T07:08:35.673000Z",
      "updated_date": "2021-04-27T07:10:12.250309Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "completed",
      "labels": [
        {
          "id": 19,
          "name": "cat",
          "color": "#6080c0",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 0,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/15",
              "id": 15,
              "assignee": null,
              "status": "completed"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": null,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 0,
      "image_quality": 70,
      "data": 16
    },
    {
      "url": "http://182.138.104.162:16480/api/v1/tasks/13",
      "id": 13,
      "name": "test_luosi_crop_louosi_1619496894_image_classification_ImageNet_1.0",
      "mode": "annotation",
      "owner": "admin",
      "assignee": null,
      "bug_tracker": "",
      "created_date": "2021-04-27T04:15:33.782897Z",
      "updated_date": "2021-04-27T04:22:47.092947Z",
      "overlap": 0,
      "segment_size": 0,
      "status": "completed",
      "labels": [
        {
          "id": 17,
          "name": "lousi",
          "color": "#2c6d21",
          "attributes": []
        },
        {
          "id": 18,
          "name": "block",
          "color": "#51245a",
          "attributes": []
        }
      ],
      "segments": [
        {
          "start_frame": 0,
          "stop_frame": 67,
          "jobs": [
            {
              "url": "http://182.138.104.162:16480/api/v1/jobs/13",
              "id": 13,
              "assignee": null,
              "status": "completed"
            }
          ]
        }
      ],
      "project": null,
      "data_chunk_size": 72,
      "data_compressed_chunk_type": "imageset",
      "data_original_chunk_type": "imageset",
      "size": 68,
      "image_quality": 70,
      "data": 13
    }
  ]
}
```





### ~~获取用户协议~~

http://182.138.104.162:16480/annotations/api/v1/restrictions/user-agreements

GET

### 获取标注格式（导入导出菜单列表）

http://182.138.104.162:16480/annotations/api/v1/server/annotation/formats

GET

**响应体**

```json
{
  "importers": [
    {
      "name": "COCO 1.0",
      "ext": "JSON, ZIP",
      "version": "1.0",
      "enabled": true
    },
    {
      "name": "CVAT 1.1",
      "ext": "XML, ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "LabelMe 3.0",
      "ext": "ZIP",
      "version": "3.0",
      "enabled": true
    },
    {
      "name": "Segmentation mask 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "MOT 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "MOTS PNG 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    },
    {
      "name": "PASCAL VOC 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "TFRecord 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    },
    {
      "name": "YOLO 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "ImageNet 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    }
  ],
  "exporters": [
    {
      "name": "COCO 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    },
    {
      "name": "CVAT for video 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "CVAT for images 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "Datumaro 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    },
    {
      "name": "LabelMe 3.0",
      "ext": "ZIP",
      "version": "3.0",
      "enabled": true
    },
    {
      "name": "Segmentation mask 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "MOT 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "MOTS PNG 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    },
    {
      "name": "PASCAL VOC 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "TFRecord 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    },
    {
      "name": "YOLO 1.1",
      "ext": "ZIP",
      "version": "1.1",
      "enabled": true
    },
    {
      "name": "ImageNet 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    },
    {
      "name": "OCR RECOGNITION 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    },
    {
      "name": "OCR DETECTION 1.0",
      "ext": "ZIP",
      "version": "1.0",
      "enabled": true
    }
  ]
}
```





### 获取任务缩略图

http://localhost:3000/annotations/api/v1/tasks/13/data?type=preview

GET

```js
response = await Axios.get(`${backendAPI}/tasks/${tid}/data?type=preview`, {
    proxy: config.proxy,
    responseType: 'blob',
});
```



### ~~关于~~

http://182.138.104.162:16480/annotations/api/v1/server/about

GET

### 获取安装的Apps

http://182.138.104.162:16480/annotations/api/v1/server/plugins

GET

**响应体**

```json
{
  "GIT_INTEGRATION": true,
  "ANALYTICS": false,
  "MODELS": false
}
```

## 删除任务

Request URL: http://192.168.1.203:8080/api/v1/tasks/8
Request Method: DELETE
Status Code: 204 No Content

## 任务详情

浏览器URL：

http://182.138.104.162:16480/annotations/tasks/12

### 获取任务状态

http://182.138.104.162:16480/annotations/api/v1/tasks/12/status

GET

**响应体**

```json
{
  "state": "Finished",
  "message": ""
}
```

### 获取任务详情

与【获取任务列表】同一个，多了参数id=12.

http://182.138.104.162:16480/annotations/api/v1/tasks?page_size=10&id=12&page=1

GET

**响应体**

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

### 更新任务

新增、修改和删除标签时调用。

#### 删除标签

http://192.168.1.203:8080/api/v1/tasks/26

PATCH

**请求体**

```json
{
  "labels": [
    {
      "name": "cat",
      "attributes": [],
      "color": "#6080c0",
      "id": 35,
      "deleted": true
    }
  ]
}
```

**响应体**

```json
{
  "url": "http://192.168.1.203:8080/api/v1/tasks/26",
  "id": 26,
  "name": "8",
  "project_id": null,
  "mode": "annotation",
  "owner": {
    "url": "http://192.168.1.203:8080/api/v1/users/1",
    "id": 1,
    "username": "django",
    "first_name": "",
    "last_name": ""
  },
  "assignee": {
    "url": "http://192.168.1.203:8080/api/v1/users/1",
    "id": 1,
    "username": "django",
    "first_name": "",
    "last_name": ""
  },
  "bug_tracker": "",
  "created_date": "2021-05-08T03:28:19.097516Z",
  "updated_date": "2021-05-19T12:41:10.584582Z",
  "overlap": 0,
  "segment_size": 0,
  "status": "annotation",
  "labels": [],
  "segments": [
    {
      "start_frame": 0,
      "stop_frame": 0,
      "jobs": [
        {
          "url": "http://192.168.1.203:8080/api/v1/jobs/26",
          "id": 26,
          "assignee": {
            "url": "http://192.168.1.203:8080/api/v1/users/1",
            "id": 1,
            "username": "django",
            "first_name": "",
            "last_name": ""
          },
          "reviewer": {
            "url": "http://192.168.1.203:8080/api/v1/users/1",
            "id": 1,
            "username": "django",
            "first_name": "",
            "last_name": ""
          },
          "status": "annotation"
        }
      ]
    }
  ],
  "data_chunk_size": 72,
  "data_compressed_chunk_type": "imageset",
  "data_original_chunk_type": "imageset",
  "size": 1,
  "image_quality": 70,
  "data": 26,
  "dimension": "2d",
  "subset": ""
}
```

#### 新增标签

http://192.168.1.203:8080/api/v1/tasks/26

PATCH

**请求体**

```json
{
  "labels": [
    {
      "name": "cat",
      "attributes": [
        {
          "name": "color",
          "mutable": false,
          "input_type": "select",
          "default_value": "gray",
          "values": [
            "gray",
            "black"
          ]
        }
      ]
    }
  ]
}
```

**响应体**

```json
{
  "url": "http://192.168.1.203:8080/api/v1/tasks/26",
  "id": 26,
  "name": "8",
  "project_id": null,
  "mode": "annotation",
  "owner": {
    "url": "http://192.168.1.203:8080/api/v1/users/1",
    "id": 1,
    "username": "django",
    "first_name": "",
    "last_name": ""
  },
  "assignee": {
    "url": "http://192.168.1.203:8080/api/v1/users/1",
    "id": 1,
    "username": "django",
    "first_name": "",
    "last_name": ""
  },
  "bug_tracker": "",
  "created_date": "2021-05-08T03:28:19.097516Z",
  "updated_date": "2021-05-20T01:58:26.236859Z",
  "overlap": 0,
  "segment_size": 0,
  "status": "annotation",
  "labels": [
    {
      "id": 36,
      "name": "cat",
      "color": "#6080c0",
      "attributes": [
        {
          "id": 12,
          "name": "color",
          "mutable": false,
          "input_type": "select",
          "default_value": "gray",
          "values": [
            "gray",
            "black"
          ]
        }
      ]
    }
  ],
  "segments": [
    {
      "start_frame": 0,
      "stop_frame": 0,
      "jobs": [
        {
          "url": "http://192.168.1.203:8080/api/v1/jobs/26",
          "id": 26,
          "assignee": {
            "url": "http://192.168.1.203:8080/api/v1/users/1",
            "id": 1,
            "username": "django",
            "first_name": "",
            "last_name": ""
          },
          "reviewer": {
            "url": "http://192.168.1.203:8080/api/v1/users/1",
            "id": 1,
            "username": "django",
            "first_name": "",
            "last_name": ""
          },
          "status": "annotation"
        }
      ]
    }
  ],
  "data_chunk_size": 72,
  "data_compressed_chunk_type": "imageset",
  "data_original_chunk_type": "imageset",
  "size": 1,
  "image_quality": 70,
  "data": 26,
  "dimension": "2d",
  "subset": ""
}
```

#### 修改标签

http://192.168.1.203:8080/api/v1/tasks/26

PATCH

**请求体**

```json
{
  "labels": [
    {
      "name": "cat",
      "attributes": [
        {
          "name": "color",
          "mutable": false,
          "input_type": "select",
          "default_value": "gray",
          "values": [
            "gray",
            "black",
            "white"
          ],
          "id": 12
        }
      ],
      "color": "#6080c0",
      "id": 36
    }
  ]
}
```

**响应体**

```json
{
  "url": "http://192.168.1.203:8080/api/v1/tasks/26",
  "id": 26,
  "name": "8",
  "project_id": null,
  "mode": "annotation",
  "owner": {
    "url": "http://192.168.1.203:8080/api/v1/users/1",
    "id": 1,
    "username": "django",
    "first_name": "",
    "last_name": ""
  },
  "assignee": {
    "url": "http://192.168.1.203:8080/api/v1/users/1",
    "id": 1,
    "username": "django",
    "first_name": "",
    "last_name": ""
  },
  "bug_tracker": "",
  "created_date": "2021-05-08T03:28:19.097516Z",
  "updated_date": "2021-05-20T02:04:19.068263Z",
  "overlap": 0,
  "segment_size": 0,
  "status": "annotation",
  "labels": [
    {
      "id": 36,
      "name": "cat",
      "color": "#6080c0",
      "attributes": [
        {
          "id": 12,
          "name": "color",
          "mutable": false,
          "input_type": "select",
          "default_value": "gray",
          "values": [
            "gray",
            "black",
            "white"
          ]
        }
      ]
    }
  ],
  "segments": [
    {
      "start_frame": 0,
      "stop_frame": 0,
      "jobs": [
        {
          "url": "http://192.168.1.203:8080/api/v1/jobs/26",
          "id": 26,
          "assignee": {
            "url": "http://192.168.1.203:8080/api/v1/users/1",
            "id": 1,
            "username": "django",
            "first_name": "",
            "last_name": ""
          },
          "reviewer": {
            "url": "http://192.168.1.203:8080/api/v1/users/1",
            "id": 1,
            "username": "django",
            "first_name": "",
            "last_name": ""
          },
          "status": "annotation"
        }
      ]
    }
  ],
  "data_chunk_size": 72,
  "data_compressed_chunk_type": "imageset",
  "data_original_chunk_type": "imageset",
  "size": 1,
  "image_quality": 70,
  "data": 26,
  "dimension": "2d",
  "subset": ""
}
```



### 保存作业

给作业分配标注人员或在标注主界面切换作业状态时调用。

http://182.138.104.162:16480/annotations/api/v1/jobs/33

PATCH

**请求体**

```json
{"status":"annotation","assignee":"admin"}
```

**响应体**

```json
{
  "url": "http://182.138.104.162:16480/api/v1/jobs/33",
  "id": 33,
  "assignee": "admin",
  "status": "annotation",
  "start_frame": 0,
  "stop_frame": 0,
  "task_id": 29
}
```

<font color='color'>分配审核员（最新版）</font>

http://192.168.1.203:8080/api/v1/jobs/27

PATCH

**请求体**

```json
{
  "reviewer_id": 1
}
```

**响应体**

```json
{
  "url": "http://192.168.1.203:8080/api/v1/jobs/27",
  "id": 27,
  "assignee": {
    "url": "http://192.168.1.203:8080/api/v1/users/1",
    "id": 1,
    "username": "django",
    "first_name": "",
    "last_name": ""
  },
  "reviewer": {
    "url": "http://192.168.1.203:8080/api/v1/users/1",
    "id": 1,
    "username": "django",
    "first_name": "",
    "last_name": ""
  },
  "status": "annotation",
  "start_frame": 0,
  "stop_frame": 0,
  "task_id": 27
}
```

## 进入标注界面

### 提交日志

http://182.138.104.162:16480/annotations/api/v1/server/logs

POST

**请求体**

```json
[
  {
    "client_id": 767013,
    "name": "Send user activity",
    "time": "2021-05-07T02:34:23.031000Z",
    "payload": {
      "working_time": 33224
    },
    "is_active": true
  }
]
```

### 获取任务元数据

```js
response = await Axios.get(`${backendAPI}/tasks/${tid}/data/meta`, {
```

http://182.138.104.162:16480/annotations/api/v1/tasks/28/data/meta

GET

**响应体**

```json
{
  "chunk_size": 3,
  "size": 8,
  "image_quality": 70,
  "start_frame": 0,
  "stop_frame": 7,
  "frame_filter": "",
  "frames": [
    {
      "width": 5472,
      "height": 3648,
      "name": "VTFjeGFGb3lWbVpOYWtGNVRVUkJlRTFVVFhkUFZGRXpUa1JGTVUxRWF3.jpg"
    },
    {
      "width": 5472,
      "height": 3648,
      "name": "VTFjeGFGb3lWbVpOYWtGNVRVUkJlRTFVVFhoTlJFVjNUa1JWTUUxcWF3.jpg"
    },
    {
      "width": 5472,
      "height": 3648,
      "name": "VTFjeGFGb3lWbVpOYWtGNVRVUkJlRTFVVFhoTlJFVjNUbFJWZVU5RVZR.jpg"
    },
    {
      "width": 5472,
      "height": 3648,
      "name": "VTFjeGFGb3lWbVpOYWtGNVRVUkJlRTFVVFhoTlJFVjRUWHBGZUUxRWF3.jpg"
    },
    {
      "width": 5472,
      "height": 3648,
      "name": "VTFjeGFGb3lWbVpOYWtGNVRVUkJlRTFVVFhoTlJFVjRUa1JKTWs1Nll3.jpg"
    },
    {
      "width": 5472,
      "height": 3648,
      "name": "VTFjeGFGb3lWbVpOYWtGNVRVUkJlRTFVVFhoTlJFVjRUa1JyTVU5RVJR.jpg"
    },
    {
      "width": 500,
      "height": 355,
      "name": "dT0zMTE0MDMyOTA4LDQ3Nzc3MzIyJmZtPTI2JmdwPTA.jpg"
    },
    {
      "width": 500,
      "height": 330,
      "name": "dT0zNDMxMDc2NTk5LDIxMzgyODg1NjAmZm09MjYmZ3A9MCAtIOWJr-acrA.jpg"
    }
  ]
}
```

### 获取任务数据

http://182.138.104.162:16480/annotations/api/v1/tasks/28/data?type=chunk&number=0&quality=compressed

GET

**响应体**

二进制数据（用浏览器打开，显示data.zip压缩包）

### 获取任务/作业的标注

前端调用代码：

```js
// Session is 'task' or 'job'
async function getAnnotations(session, id) {
```

response = await Axios.get(`${backendAPI}/${session}s/${id}/annotations`, {



http://182.138.104.162:16480/annotations/api/v1/jobs/25/annotations

GET

**响应体（图像分类）**

```json
{
  "version": 11,
  "tags": [
    {
      "id": 219,
      "frame": 0,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 211,
      "frame": 3,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 204,
      "frame": 4,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 217,
      "frame": 5,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 205,
      "frame": 6,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 203,
      "frame": 7,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 209,
      "frame": 8,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 207,
      "frame": 10,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 212,
      "frame": 12,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 213,
      "frame": 14,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 208,
      "frame": 16,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 216,
      "frame": 18,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 206,
      "frame": 20,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 215,
      "frame": 22,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 210,
      "frame": 24,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "id": 214,
      "frame": 26,
      "label_id": 29,
      "group": 0,
      "source": "manual",
      "attributes": []
    }
  ],
  "shapes": [],
  "tracks": []
}
```

**响应体（目标检测）**

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
        179.533203125,
        16.115234375,
        832.0947265625,
        807.31103515625
      ],
      "id": 158,
      "frame": 0,
      "label_id": 34,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        43.611328125,
        22.712890625,
        460.9483947753906,
        745.7510375976562
      ],
      "id": 159,
      "frame": 1,
      "label_id": 34,
      "group": 0,
      "source": "manual",
      "attributes": []
    }
  ],
  "tracks": []
}
```

**响应体（图像分割）**

```json
{
  "version": 9,
  "tags": [],
  "shapes": [
    {
      "type": "polygon",
      "occluded": false,
      "z_order": 0,
      "points": [
        209.501953125,
        92.998046875,
        220.65082644628274,
        58.084297520661494,
        236.49380165289404,
        48.98925619834699,
        255.85743801653007,
        53.683471074382396,
        260.8450413223145,
        89.47685950413506,
        282.0,
        127.30000000000291,
        298.1000000000022,
        177.5,
        309.2541322314064,
        234.1173553719018,
        334.1921487603322,
        271.9644628099195,
        323.33677685950533,
        291.03471074380286,
        272.2871900826467,
        252.01404958677813,
        226.51859504132517,
        187.46859504132226,
        211.26239669421557,
        158.42314049587003,
        213.60950413223327,
        131.72479338843186
      ],
      "id": 13,
      "frame": 0,
      "label_id": 4,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "type": "polygon",
      "occluded": false,
      "z_order": 0,
      "points": [
        198.40000000000146,
        42.80000000000291,
        173.10000000000218,
        45.0,
        171.44545454545732,
        66.28181818182202,
        174.71818181818526,
        78.82727272727789,
        156.44545454545732,
        84.55454545454995,
        135.17272727273303,
        159.28181818182202,
        139.809090909097,
        178.10000000000582,
        163.809090909097,
        201.55454545454995,
        176.35454545454922,
        207.55454545454995,
        152.9000000000051,
        233.7363636363698,
        142.809090909097,
        250.10000000000582,
        144.44545454545732,
        266.7363636363698,
        161.35454545454922,
        279.0090909090941,
        165.44545454545732,
        301.3727272727301,
        165.17272727273303,
        306.8272727272779,
        185.62727272727716,
        305.1909090909139,
        179.0818181818213,
        254.7363636363698,
        178.53636363636906,
        233.46363636364185,
        206.0818181818213,
        205.10000000000582,
        205.26363636364113,
        195.55454545454995,
        233.60000000000218,
        158.40000000000146
      ],
      "id": 14,
      "frame": 1,
      "label_id": 4,
      "group": 0,
      "source": "manual",
      "attributes": []
    },
    {
      "type": "polygon",
      "occluded": false,
      "z_order": 0,
      "points": [
        2.056640625,
        34.720703125,
        50.09297520661494,
        39.05991735537464,
        143.99793388430044,
        93.6053719008305,
        201.64256198347357,
        82.4483471074418,
        249.36983471074564,
        88.95661157025097,
        293.99793388430044,
        73.15082644628274,
        336.76652892562197,
        73.46074380165737,
        302.3657024793429,
        126.76652892562197,
        317.55165289256547,
        172.6342975206644,
        315.0723140495902,
        195.2582644628128,
        326.5392561983499,
        215.09297520661494,
        335.836776859509,
        226.25000000000364,
        375.1962809917386,
        241.43595041322624,
        376.12603305785524,
        251.9731404958693,
        320.65082644628274,
        269.9483471074418,
        308.56404958678104,
        292.8822314049612,
        200.09297520661494,
        313.64669421488,
        179.01859504132517,
        299.700413223145,
        42.0351239669435,
        270.5681818181838,
        19.411157024795102,
        254.45247933884457,
        0.5061983471096028,
        257.86157024793647
      ],
      "id": 15,
      "frame": 2,
      "label_id": 4,
      "group": 0,
      "source": "manual",
      "attributes": []
    }
  ],
  "tracks": []
}
```



### 保存标注

调用了4次接口（前3个实际是同一个接口，传参不同）：

1、保存新增标注

http://192.168.1.18/annotations/api/v1/jobs/112/annotations?action=create

PATCH

**请求体**

```json
{
  "shapes": [
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        247.490234375,
        168.279296875,
        351.8026351928711,
        266.0721664428711
      ],
      "attributes": [],
      "frame": 0,
      "label_id": 161,
      "group": 0,
      "source": "manual"
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        385.216796875,
        211.470703125,
        429.1828422546387,
        274.2211265563965
      ],
      "attributes": [],
      "frame": 0,
      "label_id": 161,
      "group": 0,
      "source": "manual"
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        533.126953125,
        266.884765625,
        603.1710968017578,
        339.0070114135742
      ],
      "attributes": [],
      "frame": 0,
      "label_id": 161,
      "group": 0,
      "source": "manual"
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        302.458984375,
        190.28125,
        336.727237701416,
        230.62080764770508
      ],
      "attributes": [],
      "frame": 1,
      "label_id": 161,
      "group": 0,
      "source": "manual"
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        346.505859375,
        203.3203125,
        372.1764888763428,
        236.3254051208496
      ],
      "attributes": [],
      "frame": 1,
      "label_id": 161,
      "group": 0,
      "source": "manual"
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        475.673828125,
        239.177734375,
        518.8656768798828,
        277.47994232177734
      ],
      "attributes": [],
      "frame": 1,
      "label_id": 161,
      "group": 0,
      "source": "manual"
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        353.1171875,
        180.572265625,
        877.5314331054688,
        572.9661560058594
      ],
      "attributes": [],
      "frame": 2,
      "label_id": 161,
      "group": 0,
      "source": "manual"
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        997.6328125,
        131.982421875,
        1532.1319580078125,
        531.7107849121094
      ],
      "attributes": [],
      "frame": 2,
      "label_id": 161,
      "group": 0,
      "source": "manual"
    },
    {
      "type": "rectangle",
      "occluded": false,
      "z_order": 0,
      "points": [
        114.6796875,
        136.591796875,
        275.12110900878906,
        453.8074035644531
      ],
      "attributes": [],
      "frame": 2,
      "label_id": 161,
      "group": 0,
      "source": "manual"
    }
  ],
  "tracks": [],
  "tags": [],
  "version": 0
}
```

2、保存更新标注

http://192.168.1.18/annotations/api/v1/jobs/112/annotations?action=update

PATCH

**请求体**

```json
{
  "shapes": [],
  "tracks": [],
  "tags": [],
  "version": 1
}
```

3、保存删除标注

http://192.168.1.18/annotations/api/v1/jobs/112/annotations?action=delete

PATCH

**请求体**

```json
{
  "shapes": [],
  "tracks": [],
  "tags": [],
  "version": 2
}
```

4、保存日志

http://192.168.1.18/annotations/api/v1/server/logs

POST

**请求体**

```json
[
  {
    "name": "Load job",
    "time": "2021-05-06T01:57:35.495Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "duration": 269,
      "frame count": 3,
      "track count": 0,
      "object count": 0,
      "box count": 0,
      "polygon count": 0,
      "polyline count": 0,
      "points count": 0,
      "cuboids count": 0,
      "tag count": 0
    }
  },
  {
    "name": "Fit image",
    "time": "2021-05-06T01:57:35.765Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {}
  },
  {
    "name": "Draw object",
    "time": "2021-05-06T01:57:42.142Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "count": 1,
      "duration": 1531
    }
  },
  {
    "name": "Draw object",
    "time": "2021-05-06T01:57:44.771Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "count": 1,
      "duration": 1447
    }
  },
  {
    "name": "Draw object",
    "time": "2021-05-06T01:57:46.877Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "count": 1,
      "duration": 1379
    }
  },
  {
    "name": "Change frame",
    "time": "2021-05-06T01:57:52.009Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "from": 0,
      "to": 1
    }
  },
  {
    "name": "Fit image",
    "time": "2021-05-06T01:57:52.018Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {}
  },
  {
    "name": "Draw object",
    "time": "2021-05-06T01:57:53.893Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "count": 1,
      "duration": 1129
    }
  },
  {
    "name": "Draw object",
    "time": "2021-05-06T01:57:55.507Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "count": 1,
      "duration": 1190
    }
  },
  {
    "name": "Draw object",
    "time": "2021-05-06T01:57:56.996Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "count": 1,
      "duration": 1173
    }
  },
  {
    "name": "Change frame",
    "time": "2021-05-06T01:57:58.828Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "from": 1,
      "to": 2
    }
  },
  {
    "name": "Fit image",
    "time": "2021-05-06T01:57:58.843Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {}
  },
  {
    "name": "Rotate image",
    "time": "2021-05-06T02:20:34.624Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "angle": 270
    }
  },
  {
    "name": "Fit image",
    "time": "2021-05-06T02:20:34.624Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {}
  },
  {
    "name": "Rotate image",
    "time": "2021-05-06T02:20:38.174Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "angle": 0
    }
  },
  {
    "name": "Fit image",
    "time": "2021-05-06T02:20:38.174Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {}
  },
  {
    "name": "Draw object",
    "time": "2021-05-06T03:22:42.387Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "count": 1,
      "duration": 1049
    }
  },
  {
    "name": "Draw object",
    "time": "2021-05-06T03:23:29.909Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "count": 1,
      "duration": 1197
    }
  },
  {
    "name": "Undo action",
    "time": "2021-05-06T03:23:34.449Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "name": "Created objects",
      "frame": 2,
      "count": 1,
      "duration": 1
    }
  },
  {
    "name": "Redo action",
    "time": "2021-05-06T03:23:35.519Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "name": "Created objects",
      "frame": 2,
      "count": 1,
      "duration": 1
    }
  },
  {
    "name": "Draw object",
    "time": "2021-05-06T03:52:24.034Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "count": 1,
      "duration": 1132
    }
  },
  {
    "name": "Save job",
    "time": "2021-05-06T03:52:33.748Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "duration": 586
    }
  },
  {
    "name": "Send task info",
    "time": "2021-05-06T03:52:34.334Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "frame count": 3,
      "track count": 9,
      "object count": 9,
      "box count": 9,
      "polygon count": 0,
      "polyline count": 0,
      "points count": 0,
      "cuboids count": 0,
      "tag count": 0
    }
  },
  {
    "name": "Send user activity",
    "time": "2021-05-06T03:52:34.334Z",
    "client_id": "187377",
    "job_id": 112,
    "task_id": 131,
    "is_active": true,
    "payload": {
      "working_time": 221809
    }
  }
]
```

## 提送至AI平台

http://182.138.104.162:16480/annotations/api/v1/tasks/4/publish

GET

**响应体**

空

## 导出标注

http://192.168.1.203:8080/api/v1/tasks/10/annotations?format=COCO%201.0

GET

**响应体**

二进制数据（zip压缩包，只有标注文件）

## 导出数据集

http://192.168.1.203:8080/api/v1/tasks/9/dataset?format=COCO%201.0

GET

**响应体**

二进制数据（zip压缩包，包含标注文件及图片）

## 导入标注

**Request URL:** http://192.168.1.203:8080/api/v1/tasks/9/annotations?format=COCO%201.0

**Request Method:** PUT

**Status Code:** 202 Accepted

**Form Data**

annotation_file: (binary)

## 自动标注相关

### 获取Lambda请求列表

http://localhost:3000/annotations/api/v1/lambda/requests

GET

**响应体**

```json
[
  {
    "id": "9efc200f-71de-4903-9100-7a91b9e7f61d",
    "function": {
      "id": "openvino-mask-rcnn-inception-resnet-v2-atrous-coco",
      "threshold": null,
      "task": 68548
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T14:07:15.893499",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "753a5ffa-6fb8-40e2-a1d4-6d04cf6c4656",
    "function": {
      "id": "openvino-omz-public-yolo-v3-tf",
      "threshold": null,
      "task": 74214
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-07T03:09:47.705293",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "b7dd4446-d36b-49a3-ad60-6b055bf6857b",
    "function": {
      "id": "openvino-omz-public-yolo-v3-tf",
      "threshold": null,
      "task": 74108
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T13:26:27.340202",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "a96d9290-9c3f-4070-84b1-329b71f4e279",
    "function": {
      "id": "openvino-omz-public-yolo-v3-tf",
      "threshold": null,
      "task": 71914
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T18:09:44.091403",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "d2d2dce5-6187-4a12-bb46-f9824e67b003",
    "function": {
      "id": "openvino-mask-rcnn-inception-resnet-v2-atrous-coco",
      "threshold": null,
      "task": 67641
    },
    "status": "started",
    "progress": 97,
    "enqueued": "2021-05-06T09:50:00.278170",
    "started": "2021-05-06T09:50:00.288995",
    "ended": null,
    "exc_info": null
  },
  {
    "id": "08ad91e0-0919-4b42-b236-4e4546862091",
    "function": {
      "id": "openvino-omz-public-faster_rcnn_inception_v2_coco",
      "threshold": null,
      "task": 74197
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T14:18:36.535572",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "e8da6797-5004-469d-820e-b1560129edd8",
    "function": {
      "id": "openvino-omz-public-yolo-v3-tf",
      "threshold": null,
      "task": 74290
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T18:17:57.134956",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "f42f5088-4d9c-4814-97c6-d27a03e0be91",
    "function": {
      "id": "openvino-mask-rcnn-inception-resnet-v2-atrous-coco",
      "threshold": null,
      "task": 41429
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T12:19:58.064632",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "b7a4912a-3e7a-450f-8600-8f5ff93f7987",
    "function": {
      "id": "openvino-omz-intel-person-reidentification-retail-0300",
      "threshold": 0.5,
      "task": 74090
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T11:18:13.361815",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "3cad55b0-57a6-47b3-bb3d-eab1bb12b64a",
    "function": {
      "id": "openvino-omz-public-yolo-v3-tf",
      "threshold": null,
      "task": 74113
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T21:32:20.572822",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "1c51a2eb-42a3-4adc-ac11-fbe2f153f0d2",
    "function": {
      "id": "openvino-omz-intel-person-reidentification-retail-0300",
      "threshold": 0.5,
      "task": 74301
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T20:22:33.383088",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "350ec534-3728-40d0-9edf-6e1981933974",
    "function": {
      "id": "openvino-mask-rcnn-inception-resnet-v2-atrous-coco",
      "threshold": null,
      "task": 74293
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T18:36:08.847009",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "a89896ff-b15b-4f99-b42d-17390d56e815",
    "function": {
      "id": "openvino-mask-rcnn-inception-resnet-v2-atrous-coco",
      "threshold": null,
      "task": 74216
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T15:00:21.408712",
    "started": null,
    "ended": null,
    "exc_info": null
  },
  {
    "id": "78a88d59-55af-4e0e-9a41-c81a1d221e60",
    "function": {
      "id": "openvino-omz-public-yolo-v3-tf",
      "threshold": null,
      "task": 74297
    },
    "status": "queued",
    "progress": 0,
    "enqueued": "2021-05-06T18:54:10.243831",
    "started": null,
    "ended": null,
    "exc_info": null
  }
]
```

### 获取Lambda函数（即标注模型列表）

http://192.168.1.18/annotations/api/v1/lambda/functions

GET

**响应体**

```json
[
  {
    "id": "fbrs",
    "kind": "interactor",
    "labels": [],
    "state": "ready",
    "description": "f-BRS interactive segmentation",
    "framework": "pytorch",
    "name": "f-BRS",
    "min_pos_points": 1
  },
  {
    "id": "openvino-omz-public-faster_rcnn_inception_v2_coco",
    "kind": "detector",
    "labels": [
      "person",
      "bicycle",
      "car",
      "motorcycle",
      "airplane",
      "bus",
      "train",
      "truck",
      "boat",
      "traffic_light",
      "fire_hydrant",
      "stop_sign",
      "parking_meter",
      "bench",
      "bird",
      "cat",
      "dog",
      "horse",
      "sheep",
      "cow",
      "elephant",
      "bear",
      "zebra",
      "giraffe",
      "backpack",
      "umbrella",
      "handbag",
      "tie",
      "suitcase",
      "frisbee",
      "skis",
      "snowboard",
      "sports_ball",
      "kite",
      "baseball_bat",
      "baseball_glove",
      "skateboard",
      "surfboard",
      "tennis_racket",
      "bottle",
      "wine_glass",
      "cup",
      "fork",
      "knife",
      "spoon",
      "bowl",
      "banana",
      "apple",
      "sandwich",
      "orange",
      "broccoli",
      "carrot",
      "hot_dog",
      "pizza",
      "donut",
      "cake",
      "chair",
      "couch",
      "potted_plant",
      "bed",
      "dining_table",
      "toilet",
      "tv",
      "laptop",
      "mouse",
      "remote",
      "keyboard",
      "cell_phone",
      "microwave",
      "oven",
      "toaster",
      "sink",
      "refrigerator",
      "book",
      "clock",
      "vase",
      "scissors",
      "teddy_bear",
      "hair_drier",
      "toothbrush"
    ],
    "description": "Faster RCNN inception v2 COCO via Intel OpenVINO toolkit",
    "framework": "openvino",
    "name": "Faster RCNN"
  }    
]
```

### 运行自动标注

https://cvat.org/api/v1/lambda/requests

POST

**Status Code:** 200 

**响应体**

```json
{
  "id": "828a5cb0-4279-49e3-9cd2-661c05e67234",
  "function": {
    "id": "openvino-mask-rcnn-inception-resnet-v2-atrous-coco",
    "threshold": null,
    "task": 50869
  },
  "status": "queued",
  "progress": 0,
  "enqueued": "2021-05-07T04:20:12.502153",
  "started": null,
  "ended": null,
  "exc_info": null
}
```

## 其他接口

日志相关的功能，是否还实现？

### 保存日志

参见【进入标注界面】|【保存标注】|【保存日志】。

### 获取作业

前端访问代码

```js
response = await Axios.get(`${backendAPI}/jobs/${jobID}`, {
```

# 接口定义后台代码

cvat\apps\engine\views.py

