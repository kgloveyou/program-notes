### 问题描述

最近使用[Node](https://so.csdn.net/so/search?q=Node&spm=1001.2101.3001.7020).js遇到一个问题，具体报错信息如下所示

```auto
Error: listen EACCES 127.0.0.1:8888
    at Server.setupListenHandle [as _listen2] (net.js:1343:19)
    at listenInCluster (net.js:1401:12)
    at GetAddrInfoReqWrap.doListen [as callback] (net.js:1510:7)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (dns.js:72:10)
12345
```

网上大多数教程表示需要关闭被占用的端口，但实际上并没有任何端口被占用。

### 解决方案

实际上这个问题只需要重启一下网卡就可以了，具体步骤如下：

1.  以管理员身份打开PowerShell。
2.  用下面的命令停止winnat。
    
    ```powershell
     net stop winnat
    ```
    
3.  用下面的命令再次启动winnat。
    
    ```powershell
    net start winnat
    ```

