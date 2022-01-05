# http

## 1、PUT vs PATCH

- https://www.geeksforgeeks.org/difference-between-put-and-patch-request/

**PUT HTTP Request:**

In the above example, we have made a PUT request to the server, with a payload attached to the body. If we want to update the name and email, with a PUT request **we have to send all the other fields such id,avatarlast_name, to the server, otherwise, it replaces the data with the payload passed as we can see in the above example**.

**PATCH HTTP Request:**

Unlike PUT Request, PATCH does partial update e.g. Fields that need to be updated by the client, only that field is updated without modifying the other field.

**Difference between PUT and PATCH  request:**

| PUT                                                          | PATCH                                                        |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| PUT is a method of modifying resource where the client sends data that updates the entire resource . | PATCH is a method of modifying resources where the client sends partial data that is to be updated without modifying the entire data. |
| In a PUT request, the enclosed entity is considered to be a modified version of the resource stored on the origin server, and the client is requesting that the stored version be replaced | With PATCH, however, the enclosed entity contains a set of instructions describing how a resource currently residing on the origin server should be modified to produce a new version. |
| HTTP PUT is said to be idempotent, So if you send retry a request multiple times, that should be equivalent to a single request modification | HTTP PATCH is basically said to be non-idempotent. So if you retry the request N times, you will end up having N resources with N different URIs created on the server. |
| It has High Bandwidth                                        | Since Only data that need to be modified if send in the request body as a payload , It has Low Bandwidth |

- https://segmentfault.com/q/1010000005685904

