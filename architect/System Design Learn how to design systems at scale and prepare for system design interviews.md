# System Design Learn how to design systems at scale and prepare for system design interviews

https://github.com/karanpratapsingh/system-design

### UDP  

用户数据报协议 (UDP) 是一种更简单的无连接互联网协议，其中不需要错误检查和恢复服务。 使用 UDP，打开连接、维护连接或终止连接没有任何开销。 数据不断地发送给接收者，无论他们是否收到。

对于广播或多播网络传输等实时通信而言，它在很大程度上是首选。 当我们需要最低延迟并且延迟数据比数据丢失更糟糕时，我们应该使用 UDP 而不是TCP。

### TCP vs UDP  

TCP是面向连接的协议，而UDP是无连接的协议。 TCP 和 UDP 之间的一个关键区别是速度，因为 TCP 比 UDP 慢。 总体而言，UDP 是一种更快、更简单、更高效的协议，但是只有 TCP 才能重传丢失的数据包。

TCP 提供从用户到服务器的有序数据传递（反之亦然），而 UDP 不专用于端到端通信，也不检查接收者的准备情况（是否已经准备好）。

| Feature             | TCP                                         | UDP                                |
| ------------------- | ------------------------------------------- | ---------------------------------- |
| Connection          | Requires an established connection          | Connectionless protocol            |
| Guaranteed delivery | Can guarantee delivery of data              | Cannot guarantee delivery of data  |
| Re-transmission     | Re-transmission of lost packets is possible | No re-transmission of lost packets |
| Speed               | Slower than UDP                             | Faster than TCP                    |
| Broadcasting        | Does not support broadcasting               | Supports broadcasting              |
| Use cases           | HTTPS, HTTP, SMTP, POP, FTP, etc            | Video streaming, DNS, VoIP, etc    |

### Domain Name System (DNS)  

## 集群

Highly available or fail-over  （高可用或故障转移）

on standby  （随时待命）

P33

## 缓存（Caching）

### 用例

缓存可以有许多现实世界的用例，例如：

- 数据库缓存
- 内容分发网络 (CDN)
- 域名系统 (DNS) 缓存
- API 缓存

*重要的是要注意缓存不应用作永久数据存储。它们几乎总是在易失性内存中实现，因为它更快，因此应该被视为暂时的。*

### 例子

以下是一些常用的缓存技术：

- Redis
- Memcached  
- Amazon Elasticache  
- Aerospike

## 代理（Proxy）

代理服务器是位于客户端和后端服务器之间的中间硬件/软件。 它接收来自客户端的请求并将它们中继到源服务器。 通常，代理用于过滤请求、记录请求或有时转换请求（通过添加/删除标头、加密/解密或压缩）。

### 正向代理（Forward Proxy  ）

正向代理，通常称为代理、代理服务器或 Web 代理，是位于一组客户端计算机前面的服务器。

### 反向代理（Reverse Proxy  ）

反向代理是位于一个或多个 Web 服务器前面的服务器，用于拦截来自客户端的请求。

单个反向代理是单点故障，配置多个反向代理（即故障转移）进一步增加了复杂性。

### 示例

以下是一些常用的代理技术：

- Nginx
- HAProxy
- Traefik
- Envoy  

## 卷

卷是磁盘或磁带上的固定存储量。 术语卷通常用作存储本身的同义词，但单个磁盘可能包含多个卷或一个卷跨越多个磁盘。

### 文件存储

Example: Amazon EFS, Azure files, Google Cloud Filestore, etc.  

### 块存储

Example: [Amazon EBS](https://aws.amazon.com/ebs).  

### 对象存储

对象存储也称为基于对象的存储，它将数据文件分解为称为对象的片段。 然后它将这些对象存储在单个存储库（repository  ）中，该存储库可以分布在多个网络系统中。

Example: Amazon S3, Azure Blob Storage, Google Cloud Storage, etc.  

### NAS  

NAS（Network Attached Storage  ）是连接到网络的存储设备，允许授权网络用户从中央位置存储和检索数据。 NAS 设备很灵活，这意味着当我们需要额外的存储空间时，我们可以添加我们拥有的东西。 它更快、更便宜，并提供现场公共云的所有优势，让我们完全控制。

### HDFS  

Hadoop 分布式文件系统 (HDFS) 是一种分布式文件系统，旨在在商用硬件上运行。 HDFS 具有高度容错性，旨在部署在低成本硬件上。 HDFS 提供对应用程序数据的高吞吐量访问，适用于拥有大量数据集的应用程序。 它与现有的分布式文件系统有很多相似之处。

HDFS 旨在在大型集群中跨机器可靠地存储非常大的文件。它将每个文件存储为一系列块，文件中除最后一个块外的所有块大小相同。 复制文件的块以实现容错。

# 第2章 数据库和DBMS  

[SQL databases](https://karanpratapsingh.com/courses/system-design/sql-databases)  

[NoSQL databases](https://karanpratapsingh.com/courses/system-design/nosql-databases)  

○ Document
○ Key-value
○ Graph
○ Timeseries
○ Wide column
○ Multi-model  

[SQL vs NoSQL databases](https://karanpratapsingh.com/courses/system-design/sql-vs-nosql-databases)  



breaches（违规行为）

on-premises（本地部署的）

## 关系型数据库

### Materialized views  （物化视图）

## NoSQL 数据库

以下是不同类型的 NoSQL 数据库：

### Document 

● MongoDB
● Amazon DocumentDB
● CouchDB   



### Key-value  

● Redis
● Memcached
● Amazon DynamoDB
● Aerospike  



### Graph  

用例
● 欺诈检测
● 推荐引擎
● 社交网络
● 网络映射

例子

● Neo4j
● ArangoDB
● Amazon Neptune
● JanusGraph  



### Time series  

使用场景
● 物联网数据
● 指标分析
● 应用监控
● 了解财务趋势

例子

● InfluxDB
● Apache Druid  



### Wide column

使用场景

● 业务分析
● 基于属性的数据存储

例子

● BigTable
● Apache Cassandra
● ScyllaDB  

### Multi-model  

多模型数据库将不同的数据库模型（即关系、图形、键值、文档等）组合到一个集成的后端。 这意味着它们可以容纳各种数据类型、索引、查询并在多个模型中存储数据。

例子

● ArangoDB
● Azure Cosmos DB
● Couchbase  

## SQL 与 NoSQL 数据库

### 可扩展性

在最常见的情况下，SQL 数据库是垂直可扩展的，这可能会变得非常昂贵。 可以跨多个服务器扩展关系数据库，但这是一个具有挑战性且耗时的过程。

另一方面，NoSQL 数据库是水平可扩展的，这意味着我们可以轻松地将更多服务器添加到我们的 NoSQL 数据库基础架构中以处理大流量。 任何廉价的商品硬件或云实例都可以托管 NoSQL 数据库，因此比垂直扩展更具成本效益。 许多 NoSQL 技术还自动跨服务器分发数据。

### 可靠性

绝大多数关系数据库都符合 ACID。 因此，在数据可靠性和执行事务的安全保证方面，SQL 数据库仍然是更好的选择。
大多数 NoSQL 解决方案为了性能和可扩展性而牺牲了 ACID 合规性。

### 原因

与往常一样，我们应该始终选择更符合要求的技术。 那么，让我们看看选择基于 SQL 或 NoSQL 的数据库的一些原因：

对于 SQL：
● 具有严格模式的结构化数据
● 关系型数据
● 需要复杂的连接
● 事务性
● 按索引查找非常快

对于 NoSQL：
● 动态或灵活的架构
● 非关系型数据
● 无需复杂的连接
● 数据密集型工作负载
● 非常高的 IOPS 吞吐量

## 数据库复制

### 主从复制

### 主主复制

### 同步与异步复制

## 索引

### 密集索引(*dense* *index*)

在密集索引中，为表的每一行创建一个索引记录。

### 稀疏索引（sparse index）

在稀疏索引中，仅为部分记录创建记录。

稀疏索引在写入时比密集索引需要更少的维护，因为它们只包含值的子集。 这种更轻的维护负担意味着插入、更新和删除将更快。 拥有更少的条目也意味着索引将使用更少的内存。 查找数据的速度较慢，因为整个页面的扫描通常遵循二分查找。 处理有序数据时，稀疏索引也是可选的。

## 规范化和非规范化

非规范化是一种数据库优化技术，我们将冗余数据添加到一个或多个表中。 这可以帮助我们避免在关系数据库中进行代价高昂的联接。 它试图以牺牲一些写入性能为代价来提高读取性能。 数据的冗余副本被写入多个表中，以避免昂贵的连接（joins）。

## ACID 和 BASE 一致性模型

### BASE  

在 NoSQL 数据库世界中，ACID 事务不太常见，因为一些数据库放宽了对即时一致性、数据新鲜度和准确性的要求，以获得其他好处，例如规模（scale）和弹性。

BASE 属性比 ACID 保证要宽松得多，但是两个一致性模型之间没有直接的一对一映射。 让我们理解这些术语：

#### Basic Availability  

数据库似乎大部分时间都在工作。

#### Soft-state  

存储不必是写一致的，不同的副本也不必一直相互一致。

#### Eventual consistency  

数据可能不会立即保持一致，但最终会变得一致。即使由于不一致而无法给出正确的响应，系统中的读取仍然是可能的。

### ACID vs BASE Trade-offs  

对于我们的应用程序是否需要 ACID 或 BASE 一致性模型，没有正确的答案。 这两种模型的设计都是为了满足不同的要求。 在选择数据库时，我们需要牢记模型的属性和应用程序的要求。

鉴于 BASE 松散的一致性，如果开发人员为他们的应用程序选择 BASE 存储，他们需要对一致性数据有更多的知识和严谨的态度。 熟悉所选数据库的基本行为并在这些约束范围内工作至关重要。

另一方面，与 ACID 事务的简单性相比，围绕 BASE 限制进行规划有时可能是一个主要缺点。 完全 ACID 数据库非常适合数据可靠性和一致性至关重要的用例。

## CAP定理

CAP 定理指出，分布式系统只能提供一致性、可用性和分区容错 (CAP) 三个所需特性中的两个。（Consistency, Availability, and Partition tolerance）

### Consistency  

一致性意味着所有客户端同时看到相同的数据，无论它们连接到哪个节点。 为此，每当数据写入一个节点时，必须立即在系统中的所有节点之间转发或复制，然后才能认为写入“成功”。

### Availability  

可用性意味着任何请求数据的客户端都会得到响应，即使一个或多个节点已故障。

### Partition tolerance  

分区容错意味着系统在消息丢失或部分故障的情况下继续工作。 具有分区容错性的系统可以承受任何数量的网络故障，而不会导致整个网络出现故障。 数据在节点和网络的组合之间得到充分复制，以使系统在间歇性中断时保持正常运行。

### Consistency-Availability Tradeoff  

我们生活在一个物理世界，无法保证网络的稳定性，所以分布式数据库必须选择 Partition Tolerance (P)。 这意味着在一致性 (C) 和可用性 (A) 之间进行权衡。

#### CA 数据库

CA 数据库提供跨所有节点的一致性和可用性。 如果系统中的任何两个节点之间存在分区，它就无法做到这一点，因此无法提供容错。
示例：PostgreSQL、MariaDB。

#### CP数据库

CP 数据库以牺牲可用性为代价提供一致性和分区容错性。 当任何两个节点之间发生分区时，系统必须关闭不一致的节点，直到分区解决。
示例：MongoDB、Apache HBase。

#### AP数据库

AP 数据库以牺牲一致性为代价提供可用性和分区容错性。 发生分区时，所有节点都保持可用，但分区错误端的节点可能会返回比其他节点更旧的数据版本。 解决分区后，AP 数据库通常会重新同步节点以修复系统中的所有不一致。

示例：Apache Cassandra、CouchDB

## PACELC定理

PACELC 定理是 CAP 定理的扩展。 CAP 定理指出，在分布式系统中的网络分区 (P) 的情况下，必须在可用性 (A) 和一致性 (C) 之间进行选择。

PACELC 通过引入延迟 (L) 作为分布式系统的附加属性来扩展 CAP 定理。 该定理指出 else (E)，即使系统在没有分区的情况下正常运行，也必须在延迟 (L) 和一致性 (C) 之间进行选择。

## 事务

事务是一系列被认为是“单个工作单元”的数据库操作。 事务中的操作要么全部成功，要么全部失败。 通过这种方式，事务的概念在系统的一部分发生故障时支持数据完整性。并非所有数据库都选择支持 ACID 事务，通常是因为它们优先考虑其他难以或理论上不可能一起实现的优化。
通常，关系数据库支持 ACID 事务，而非关系数据库不支持（也有例外）。

## 分布式事务

分布式事务是对跨两个或多个数据库执行的数据的一组操作。 它通常在通过网络连接的不同节点之间进行协调，但也可能跨越单个服务器上的多个数据库。

### 为什么我们需要分布式事务？

与单个数据库上的 ACID 事务不同，分布式事务涉及更改多个数据库上的数据。 因此，分布式事务处理更加复杂，因为数据库必须将事务中更改的提交或回滚作为一个独立的单元进行协调。
换句话说，所有节点都必须提交，或者所有节点都必须中止并且整个事务回滚。 这就是为什么我们需要分布式事务。
现在，让我们看看一些流行的分布式事务解决方案：

### Two-Phase commit  

该协议即使在许多临时系统故障的情况下也能实现其目标，因此被广泛使用。 但是，它不能适应所有可能的故障配置，并且在极少数情况下，需要手动干预来纠正结果。

该协议需要一个协调节点，该节点基本上协调和监督不同节点之间的事务。 协调者试图在两个阶段的一组进程之间建立共识，因此得名。

### Three-phase commit  

### Sagas  

saga 是一系列本地事务。 每个本地事务都会更新数据库并发布消息或事件以触发 saga 中的下一个本地事务。 如果本地事务因违反业务规则而失败，则 saga 会执行一系列补偿事务，以撤消先前本地事务所做的更改。

## Sharding（分片）

### 数据分区

数据分区是一种将数据库分解为许多较小部分的技术。 它是跨多台机器拆分数据库或表以提高数据库的可管理性、性能和可用性的过程。

#### 方法

可以使用许多不同的方法来决定如何将应用程序数据库分解为多个较小的数据库。 以下是各种大型应用程序使用的三种最流行的方法：

##### 水平分区（或分片）

在此策略中，我们根据分区键定义的值范围对表数据进行水平拆分。 它也被称为数据库分片。

##### 垂直分区

在垂直分区中，我们根据列对数据进行垂直分区。 我们将表划分为元素较少的相对较小的表，并且每个部分都存在于单独的分区中。

在本教程中，我们将特别关注分片。

### 什么是分片？

分片是一种与水平分区相关的数据库架构模式，即将一个表的行分成多个不同的表，称为分区或分片。 每个分区都有相同的架构和列，但也是共享数据的一个子集。 同样，每个分区中保存的数据都是唯一的，并且独立于其他分区中保存的数据。

数据分片的理由是，在某个时间点之后，通过添加更多机器进行水平扩展比通过添加强大的服务器进行垂直扩展更便宜、更可行。 分片可以在应用程序或数据库级别实现。

### 分区标准

#### Hash-Based  

该策略基于散列算法将行划分为不同的分区，而不是基于连续索引对数据库行进行分组。
这种方法的缺点是动态添加/删除数据库服务器变得昂贵。

#### List-Based  

在基于列表的分区中，每个分区都是根据列上的值列表而不是一组连续的值范围来定义和选择的。

#### Range Based  

范围分区根据分区键的值范围将数据映射到各种分区。 换句话说，我们以这样一种方式对表进行分区，即每个分区包含由分区键定义的给定范围内的行。

范围应该是连续的但不重叠，其中每个范围都指定一个分区的非包含下限和上限。 任何等于或高于范围上限的分区键值都将添加到下一个分区。

#### Composite  

顾名思义，复合分区基于两种或多种分区技术对数据进行分区。 这里我们首先使用一种技术对数据进行分区，然后使用相同或其他方法将每个分区进一步细分为子分区。

### 什么时候使用分片？

以下是分片可能是正确选择的一些原因：

● 利用现有硬件而不是高端机器。
● 维护不同地理区域的数据。
● 通过添加更多分片快速扩展。
● 每台机器的负载更小，性能更佳。
● 当需要更多并发连接时。

## Consistent Hashing  

一致的散列通过确保每次扩大或缩小规模时，不必重新排列所有键或接触所有服务器，从而解决了这个水平可扩展性问题。

### 虚拟节点

为了保证负载分布更均匀，我们可以引入虚拟节点的概念，有时也称为VNode。

## Database Federation（联邦数据库技术）  

联合（或功能分区）按功能拆分数据库。 联合架构使几个不同的物理数据库对最终用户显示为一个逻辑数据库。

联合还提供从多个来源派生的数据的内聚、统一视图。 联邦系统的数据源可以包括数据库和各种其他形式的结构化和非结构化数据。

# 第3章 

## N层架构

N 层架构将应用程序分为逻辑层和物理层。 层是一种分离职责和管理依赖关系的方法。 每一层都有特定的职责。 较高层可以使用较低层中的服务，但反之则不行。

层在物理上是分开的，在不同的机器上运行。 一个层可以直接调用另一个层，或者使用异步消息传递。 尽管每一层都可能托管在自己的层中，但这不是必需的。 多个层可能托管在同一层上。 物理分离层提高了可扩展性和弹性，并增加了额外网络通信的延迟。

### N 层架构的类型

#### 3层架构

## 消息代理（Message Brokers）

消息代理是一种软件，它使应用程序、系统和服务能够相互通信并交换信息。 消息代理通过在正式消息协议之间转换消息来做到这一点。 这允许相互依赖的服务直接相互“对话”，即使它们是用不同的语言编写的或在不同的平台上实现的。

消息代理可以验证、存储、路由和传递消息到适当的目的地。 它们充当其他应用程序之间的中介，允许发送者在不知道接收者在哪里、它们是否处于活动状态或它们有多少的情况下发布消息。 这有助于系统内进程和服务的解耦。

### 模型

消息代理提供两种基本的消息分发模式或消息样式：

- [点对点消息传递](https://karanpratapsingh.com/courses/system-design/message-queues)：这是消息队列中使用的分发模式，消息的发送者和接收者之间具有一对一的关系。

- [发布-订阅消息](https://karanpratapsingh.com/courses/system-design/publish-subscribe)：在这种消息分发模式中，通常称为“发布/订阅”，每条消息的生产者将其发布到一个主题，多个消息消费者订阅他们想要接收消息的主题。

### 消息代理与事件流

消息代理可以支持两种或多种消息模式，包括消息队列和发布/订阅，而事件流平台仅提供发布/订阅式分发模式。事件流平台专为处理大量消息而设计，易于扩展。它们能够将记录流排序到称为主题的类别中，并将它们存储预定的时间。然而，与消息代理不同，事件流平台无法保证消息传递或跟踪哪些消费者已收到消息。

事件流平台提供比消息代理更高的可扩展性，但确保容错的功能更少，例如消息重发，以及更有限的消息路由和排队功能。

### 消息代理与企业服务总线 (ESB)

企业服务总线 (ESB) 基础架构很复杂，集成起来很困难，维护起来也很昂贵。 当生产环境出现问题时，很难对其进行故障排除，不易扩展，更新繁琐。

而消息代理是提供类似功能的 ESB 的“轻量级”替代品，是一种服务间通信机制，成本较低。它们非常适合在随着 ESB 失宠而变得越来越普遍的[微服务架构](https://karanpratapsingh.com/courses/system-design/monoliths-microservices#microservices)中使用。

### 例子

以下是一些常用的消息代理：
● NATS
● Apache Kafka
● RabbitMQ
● ActiveMQ  

## 消息队列（Message Queues）

消息队列是一种促进异步通信的服务到服务通信形式。 它异步接收来自生产者的消息并将它们发送给消费者。

队列用于有效管理大型分布式系统中的请求。在处理负载最小的小型系统和小型数据库中，写入速度可以预见的很快。 然而，在更复杂和更大的系统中，写入可能会花费几乎不确定的时间。

### Working  

### 特征

#### Push or Pull Delivery  

#### FIFO (First-In-First-Out) Queues  

#### Schedule or Delay Delivery  

#### At-Least-Once Delivery  

消息队列可以存储多个消息副本以实现冗余和高可用性，并在通信失败或错误的情况下重新发送消息以确保它们至少被传递一次。

#### Exactly-Once Delivery  

当不能容忍重复时，FIFO（先进先出）消息队列将通过自动过滤掉重复来确保每条消息只传递一次（并且只传递一次）。

#### Dead-letter Queues  

死信队列是其他队列可以向其发送无法成功处理的消息的队列。这使得将它们放在一边以供进一步检查变得容易，而不会阻塞队列处理或将 CPU 周期花费在可能永远不会成功使用的消息上。

#### Ordering  

大多数消息队列都提供尽力而为的排序，以确保消息通常以与发送消息相同的顺序传递，并且消息至少传递一次。

#### Poison-pill Messages

毒丸是可以接收但无法处理的特殊消息。 它们是一种用于通知消费者结束其工作的机制，因此它不再等待新的输入，并且类似于在客户端/服务器模型中关闭套接字。

#### 安全性

消息队列将对尝试访问队列的应用程序进行身份验证，这允许我们通过网络以及队列本身加密消息。

#### 任务队列

任务队列接收任务及其相关数据，运行它们，然后传递它们的结果。 它们可以支持调度，并可用于在后台运行计算密集型作业。

#### Backpressure  

如果队列开始显着增长，队列大小可能会变得大于内存，从而导致缓存未命中、磁盘读取，甚至性能下降。 背压可以通过限制队列大小来提供帮助，从而为已经在队列中的作业保持高吞吐率和良好的响应时间。 队列填满后，客户端会收到服务器繁忙或 HTTP 503 状态代码，以便稍后重试。 客户端可以稍后重试请求，可能使用[指数退避](https://en.wikipedia.org/wiki/Exponential_backoff)策略。

### 例子

以下是一些广泛使用的消息队列：

- Amazon SQS
- RabbitMQ
- ActiveMQ
- ZeroMQ

## 发布 - 订阅

与消息队列类似，发布-订阅也是一种便于异步通信的服务到服务通信形式。 在发布/订阅模型中，发布到主题的任何消息都会立即推送给该主题的所有订阅者。

消息主题的订阅者通常执行不同的功能，并且每个人都可以对消息并行执行不同的操作。 发布者不需要知道谁在使用它正在广播的信息，订阅者也不需要知道消息来自哪里。 这种消息传递方式与消息队列有点不同，其中发送消息的组件通常知道它要发送到的目的地。

### Working  

与消息队列不同，消息队列会在检索到消息之前对其进行批处理，消息主题在很少或没有队列的情况下传输消息，并立即将它们推送给所有订阅者。 以下是它的工作原理：

- 消息主题提供了一种轻量级机制来广播异步事件通知和端点，允许软件组件连接到主题以发送和接收这些消息。
- 要广播消息，称为发布者的组件只需将消息推送到主题。
- 订阅该主题的所有组件（称为订阅者）都将收到广播的每条消息。

### 优势

### 特征

#### 推送交付

当消息发布到消息主题时，Pub/Sub 消息传递会立即推送异步事件通知。 当消息可用时，订阅者会收到通知。

#### 多种交付协议

在发布-订阅模型中，主题通常可以连接到多种类型的端点，例如消息队列、无服务器函数、HTTP 服务器等。

#### 扇出

当一条消息被发送到一个主题，然后被复制并推送到多个端点时，就会发生这种情况。 Fanout 提供异步事件通知，从而允许并行处理。

#### 过滤

此功能使订阅者能够创建消息过滤策略，以便它只会收到它感兴趣的通知，而不是接收发布到主题的每条消息。

#### Durability

Pub/Sub 消息传递服务通常通过将同一消息的副本存储在多个服务器上来提供非常高的持久性，并且至少交付一次。

#### 安全

消息主题对尝试发布内容的应用程序进行身份验证，这允许我们使用加密端点并加密通过网络传输的消息。

### 例子

以下是发布-订阅常用的一些技术：
● Amazon SNS
● Google Pub/Sub  

P118

## 企业服务总线 (ESB)

企业服务总线 (ESB) 是一种架构模式，通过该模式，集中式软件组件执行应用程序之间的集成。 它执行数据模型的转换、处理连接、执行消息路由、转换通信协议，并可能管理多个请求的组合。 ESB 可以将这些集成和转换作为服务接口提供给新应用程序重用。

### 例子

以下是一些广泛使用的企业服务总线 (ESB) 技术：

● Azure Service Bus
● IBM App Connect
● Apache Camel
● Fuse ESB  

## Monoliths and Microservices  （单体和微服务）

### Monoliths  （单体/巨石）

单体应用程序是一个自包含且独立的应用程序。 它是作为一个单独的单元构建的，不仅负责特定任务，而且可以执行满足业务需求所需的每个步骤。

### Modular monoliths（模块化单体）

模块化单体是一种我们构建和部署单个应用程序（即单体部分）的方法，但我们构建它的方式是将代码分解为应用程序所需的每个功能的独立模块。这种方法减少了 模块的依赖关系，例如我们可以在不影响其他模块的情况下增强或更改模块。 如果做得好，从长远来看，这确实是有益的，因为它降低了随着系统增长而维护单体应用程序所带来的复杂性。

### 微服务

微服务架构由一组小型自治服务组成，其中每个服务都是自包含的，并且应该在有界上下文中实现单个业务功能。 有界上下文是业务逻辑的自然划分，它提供了领域模型存在的明确边界。

每个服务都有一个单独的代码库，可以由一个小型开发团队管理。 服务可以独立部署，团队可以更新现有服务，而无需重建和重新部署整个应用程序。

服务负责保存自己的数据或外部状态（每个服务的数据库）。 这与传统模型不同，在传统模型中，单独的数据层处理数据持久性。

#### 特征

#### 最佳实践

#### 陷阱

### 当心分布式单体

分布式单体是一个类似于微服务架构但自身紧密耦合的系统，就像一个单体应用程序。 采用微服务架构有很多优势。 但是在制作一个时，我们很有可能最终得到一个分布式单体。

### 微服务与面向服务的架构 (SOA)

你可能已经看到互联网上提到的面向服务的架构 (SOA)，有时甚至可以与微服务互换，但它们彼此不同，两种方法之间的主要区别归结为*范围（scope）*。

面向服务的架构 (SOA) 定义了一种通过服务接口使软件组件可重用的方法。 这些接口使用通用的通信标准，并专注于最大限度地提高应用程序服务的可重用性，而微服务则构建为各种最小的独立服务单元的集合，专注于团队自治和解耦。

### 为什么不需要微服务

这得看情况。 虽然每种方法都有自己的优点和缺点，但建议在构建新系统时从单体开始。 重要的是要理解，微服务不是灵丹妙药，相反，它们解决了组织问题。 微服务架构关乎你的组织优先事项和团队，就像它关乎技术一样。

如果你的应用程序不需要分解为微服务，则不需要此功能。 没有绝对必要将所有应用程序分解为微服务。

我们经常从 Netflix 等公司及其对微服务的使用中汲取灵感，但我们忽略了我们不是 Netflix 的事实。 他们在获得市场就绪的解决方案之前经历了很多迭代和模型，当他们确定并解决了他们试图解决的问题时，这种架构变得可以接受。

这就是为什么如果你的业务确实需要微服务，那么深入了解这一点至关重要。 我想说的是微服务是复杂问题的解决方案，如果你的业务没有复杂问题，你就不需要它们。

## 事件驱动架构 (EDA)

事件驱动架构 (EDA) 是关于使用事件作为在系统内进行通信的一种方式。 通常，利用消息代理异步发布和使用事件。 发布者不知道谁在消费事件，消费者彼此不知道。 事件驱动架构只是实现系统内服务之间松散耦合的一种方式。

### 组成

事件驱动架构具有三个关键组件：
● 事件生产者：向路由器发布事件。
● 事件路由器：过滤事件并将其推送给消费者。
● 事件消费者：使用事件来反映系统的变化。

### 模式

有几种方法可以实现事件驱动架构，我们使用哪种方法取决于用例，但这里有一些常见的例子：

- [Sagas](https://karanpratapsingh.com/courses/system-design/distributed-transactions#sagas)
- [Publish-Subscribe](https://karanpratapsingh.com/courses/system-design/publish-subscribe)
- [Event Sourcing](https://karanpratapsingh.com/courses/system-design/event-sourcing)
- [Command and Query Responsibility Segregation (CQRS)](https://karanpratapsingh.com/courses/system-design/command-and-query-responsibility-segregation)

### 例子

以下是一些广泛使用的用于实现事件驱动架构的技术：

- [NATS](https://nats.io/)
- [Apache Kafka](https://kafka.apache.org/)
- [Amazon EventBridge](https://aws.amazon.com/eventbridge)
- [Amazon SNS](https://aws.amazon.com/sns)
- [Google PubSub](https://cloud.google.com/pubsub)

## Event Sourcing

## Event sourcing vs Event-Driven Architecture (EDA)

事件溯源似乎经常与事件驱动架构 (EDA) 混淆。 事件驱动架构是关于使用事件在服务边界之间进行通信。 通常，利用消息代理在其他边界内异步发布和使用事件。

然而，事件溯源是将事件用作状态，这是一种存储数据的不同方法。 我们将存储事件，而不是存储当前状态。 此外，事件溯源是实现事件驱动架构的几种模式之一。

## 命令和查询职责分离 (CQRS)

命令查询职责分离 (CQRS) 是一种架构模式，它将系统的操作划分为命令和查询。 它首先由 Greg Young 描述。

在 CQRS 中，命令是指令，是执行特定任务的指令。 它是改变某些东西的意图，不返回值，只是成功或失败的指示。 而且，查询是对不改变系统状态或导致任何副作用的信息的请求。

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-III/command-and-query-responsibility-segregation/command-and-query-responsibility-segregation.png)

CQRS 的核心原则是命令和查询的分离。 它们在系统中扮演着根本不同的角色，将它们分开意味着每个都可以根据需要进行优化，分布式系统可以真正从中受益。

# API Gateway

API Gateway 是一个 API 管理工具，位于客户端和后端服务集合之间。 它是系统的单一入口点，封装了内部系统架构并提供为每个客户端量身定制的 API。 它还具有其他职责，例如身份验证、监控、负载平衡、缓存、节流、日志记录等。

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-III/api-gateway/api-gateway.png)

## 为什么我们需要 API 网关？

微服务提供的 API 粒度通常与客户端所需的不同。 微服务通常提供细粒度的 API，这意味着客户端需要与多个服务交互。 因此，API 网关可以为所有客户端提供单个入口点，并提供一些附加功能和更好的管理。

## 特点

- 认证和授权
- [服务发现](https://karanpratapsingh.com/courses/system-design/service-discovery)
- [反向代理](https://karanpratapsingh.com/courses/system-design/proxy#reverse-proxy)
- [缓存](https://karanpratapsingh.com/courses/system-design/caching)
- 安全
- 重试和[断路](https://karanpratapsingh.com/courses/system-design/circuit-breaker)
- [负载均衡](https://karanpratapsingh.com/courses/system-design/load-balancing)
- 日志、追踪
- API 组合
- [速率限制](https://karanpratapsingh.com/courses/system-design/rate-limiting)和节流
- 版本控制
- 路由
- IP白名单或黑名单

## 优点

让我们看看使用 API Gateway 的一些优势：

- 封装 API 的内部结构。
- 提供 API 的集中视图。
- 简化客户端代码。
- 监控、分析、跟踪和其他此类功能。

## 缺点

以下是 API 网关的一些可能缺点：

- 可能的单点故障。
- 可能会影响性能。
- 如果扩缩容不当，可能会成为瓶颈。
- 配置可能具有挑战性。

## Backend For Frontend (BFF) pattern

在 Backend For Frontend  (BFF) 模式中，我们创建单独的后端服务以供特定前端应用程序或接口使用。 当我们想要避免为多个接口定制单个后端时，这种模式很有用。 这种模式首先由 Sam Newman 描述。

此外，有时微服务返回到前端的数据输出的格式不准确，或者没有按照前端的需要进行过滤。 为了解决这个问题，前端应该有一些逻辑来重新格式化数据，因此，我们可以使用 BFF 将一些逻辑转移到中间层。

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-III/api-gateway/backend-for-frontend.png)

BFF的主要功能是从适当的服务中获取所需的数据，格式化数据，并将其发送到前端。

*[GraphQL](https://karanpratapsingh.com/courses/system-design/rest-graphql-grpc#graphql) performs really well as a backend for frontend (BFF).*

### 什么时候使用这种模式？

在以下情况下，我们应该考虑使用 (BFF) 模式：

- 必须使用大量开发开销来维护共享或通用后端服务。
- 我们希望针对特定客户的要求优化后端。
- 对通用后端进行了定制以适应多个接口。

## 例子

以下是一些广泛使用的网关技术：

- [Amazon API Gateway](https://aws.amazon.com/api-gateway)
- [Apigee API Gateway](https://cloud.google.com/apigee)
- [Azure API Gateway](https://azure.microsoft.com/en-in/services/api-management)
- [Kong API Gateway](https://konghq.com/kong)

# REST, GraphQL, gRPC

良好的 API 设计始终是任何系统的关键部分。 但选择正确的 API 技术也很重要。 因此，在本教程中，我们将简要讨论不同的 API 技术，例如 REST、GraphQL 和 gRPC。

## 什么是 API？

## REST

[REST API](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)（也称为 RESTful API）是一种应用程序编程接口，它符合 REST 架构风格的约束，并允许与 RESTful Web 服务进行交互。 REST 代表 Representational State Transfer，它由 [Roy Fielding](https://roy.gbiv.com/) 在 2000 年首次引入。

### 概念

让我们讨论一下 RESTful API 的一些概念。

**约束**

**HTTP Verbs**

HTTP 定义了一组请求方法来指示要对给定资源执行的所需操作。 尽管它们也可以是名词，但这些请求方法有时被称为 HTTP 动词。 它们中的每一个都实现了不同的语义，但是它们中的一组共享了一些共同的特征。

以下是一些常用的 HTTP 动词：

- **GET**: Request a representation of the specified resource.
- **HEAD**: Response is identical to a `GET` request, but without the response body.
- **POST**: Submits an entity to the specified resource, often causing a change in state or side effects on the server.
- **PUT**: Replaces all current representations of the target resource with the request payload.
- **DELETE**: Deletes the specified resource.
- **PATCH**: Applies partial modifications to a resource.

**HTTP 响应代码**

[HTTP 响应状态代码](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)指示特定 HTTP 请求是否已成功完成。

该标准定义了五个等级：

- 1xx - Informational responses.
- 2xx - Successful responses.
- 3xx - Redirection responses.
- 4xx - Client error responses.
- 5xx - Server error responses.

例如，HTTP 200 表示请求成功。

### 例子

这是对用户资源进行操作的 REST API 的示例用法。

| URI         | HTTP verb | Description         |
| ----------- | --------- | ------------------- |
| /users      | GET       | Get all users       |
| /users/{id} | GET       | Get a user by id    |
| /users      | POST      | Add a new user      |
| /users/{id} | PATCH     | Update a user by id |
| /users/{id} | DELETE    | Delete a user by id |

*There is so much more to learn when it comes to REST APIs, I will highly recommend looking into [Hypermedia as the Engine of Application State (HATEOAS)](https://en.wikipedia.org/wiki/HATEOAS).*

## GraphQL

[GraphQL](https://graphql.org/) 是一种用于 API 的查询语言和服务器端运行时，它优先向客户端提供他们请求的数据，而不是更多。 它由 [Facebook](https://engineering.fb.com/) 开发，后来在 2015 年开源。

GraphQL 旨在使 API 快速、灵活且对开发人员友好。 此外，GraphQL 使 API 维护人员可以灵活地添加或弃用字段，而不会影响现有查询。 开发人员可以使用他们喜欢的任何方法构建 API，而 GraphQL 规范将确保它们以可预测的方式对客户起作用。

*在 GraphQL 中，基本单元是查询。*

### Advantages

让我们讨论一下 GraphQL 的一些优点：

- 消除数据的过度获取。
- 强定义的模式。
- 代码生成支持。
- 有效载荷优化。

### Disadvantages

让我们讨论一下 GraphQL 的一些缺点：

- 将复杂性转移到服务器端。
- 缓存变得困难。
- 版本控制不明确。
- N+1 问题。

### Use cases

GraphQL 在以下场景中被证明是必不可少的：

- 减少应用程序带宽使用，因为我们可以在单个查询中查询多个资源。
- 复杂系统的快速原型设计。
- 当我们使用类似图形的数据模型时。

## gRPC

[gRPC](https://grpc.io/) 是一个现代开源的高性能[远程过程调用](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) 框架，可以在任何环境中运行。 它可以通过对负载平衡、跟踪、健康检查、身份验证等的可插拔支持有效地连接数据中心内和跨数据中心的服务。

### Concepts

**Protocol buffers**

Protocol buffers 提供了一种语言和平台中立的可扩展机制，用于以向前和向后兼容的方式序列化结构化数据。 它类似于 JSON，只是它更小更快，并且生成本地语言绑定。

**Service definition**

与许多 RPC 系统一样，gRPC 基于定义服务并指定可远程调用的方法及其参数和返回类型的思想。 gRPC 使用协议缓冲区作为[接口定义语言 (IDL)](https://en.wikipedia.org/wiki/Interface_description_language) 来描述服务接口和 payload 消息的结构。

### Advantages

让我们讨论一下 gRPC 的一些优点：

- 轻巧高效。
- 高性能。
- 内置代码生成支持。
- 双向流式传输。

### Disadvantages

让我们讨论一下 gRPC 的一些缺点：

- 与 REST 和 GraphQL 相比相对较新。
- 有限的浏览器支持。
- 更陡峭的学习曲线。
- 不是人类可读的。

### Use cases

以下是 gRPC 的一些很好的用例：

- 通过双向流进行实时通信。
- 微服务中的高效服务间通信。
- 低延迟和高吞吐量的通信。
- 多语言环境。

## REST vs GraphQL vs gRPC

### 哪种 API 技术更好？

好吧，答案是否定的。 没有灵丹妙药，因为这些技术中的每一种都有其自身的优点和缺点。 用户只关心以一致的方式使用我们的 API，因此在设计 API 时请务必关注你的领域和需求。

# Long polling, WebSockets, Server-Sent Events (SSE)

Web 应用程序最初是围绕客户端-服务器模型开发的，其中 Web 客户端始终是事务的发起者，例如从服务器请求数据。 因此，在没有客户端首先发出请求的情况下，服务器没有机制可以独立地向客户端发送或推送数据。 让我们讨论一些解决这个问题的方法。

## 长轮询

HTTP 长轮询是一种用于将信息尽快从服务器推送到客户端的技术。 因此，服务器不必等待客户端发送请求。

在长轮询中，服务器一旦收到来自客户端的请求，就不会关闭连接。 相反，服务器仅在有任何新消息可用或达到超时阈值时才响应。

![](System Design Learn how to design systems at scale and prepare for system design interviews.assets/long-polling.png)

一旦客户端收到响应，它立即向服务器发送一个新的请求，以有一个新的挂起连接向客户端发送数据，并重复该操作。 使用这种方法，服务器模拟实时服务器推送功能。

### Working

让我们了解下长轮询是如何工作的：

1、客户端发出初始请求并等待响应。
2、服务器接收请求并延迟发送任何内容，直到有可用更新。
3、一旦更新可用，就会将响应发送到客户端。
4、客户端收到响应并立即或在某个定义的时间间隔后发出新请求以再次建立连接。

### 优点

以下是长轮询的一些优点：

- 易于实施，适合小型项目。
- 几乎得到普遍支持。

### 缺点

长轮询的一个主要缺点是它通常不可扩展。 以下是其他一些原因：

- 每次都创建一个新连接，这在服务器上可能很密集。
- 可靠的消息排序可能是多个请求的问题。
- 由于服务器需要等待新请求，延迟增加。

## WebSockets

WebSocket 通过单个 TCP 连接提供全双工通信通道。 它是客户端和服务器之间的持久连接，双方可以使用它随时开始发送数据。

客户端通过称为 WebSocket 握手的过程建立 WebSocket 连接。 如果该过程成功，则服务器和客户端可以随时在两个方向交换数据。 WebSocket 协议能够以较低的开销实现客户端和服务器之间的通信，从而促进与服务器之间的实时数据传输。

![](System Design Learn how to design systems at scale and prepare for system design interviews.assets/websockets.png)

这是通过为服务器提供一种标准化的方式来实现的，该方式可以在不被询问的情况下向客户端发送内容，并允许在保持连接打开的同时来回传递消息。

### Working

1. 客户端通过发送请求来启动 WebSocket 握手过程。
2. 该请求还包含一个 [HTTP Upgrade](https://en.wikipedia.org/wiki/HTTP/1.1_Upgrade_header) 标头，该标头允许请求切换到 WebSocket 协议 (`ws://)`。
3. 服务器向客户端发送响应，确认 WebSocket 握手请求。
4. 一旦客户端收到成功的握手响应，就会打开 WebSocket 连接。
5. 现在客户端和服务器可以开始双向发送数据，实现实时通信。
6. 一旦服务器或客户端决定关闭连接，连接就会关闭。

### 优点

以下是 WebSocket 的一些优点：

- 全双工异步消息传递。
- 更好的基于来源的安全模型。
- 客户端和服务器的轻量级。

### 缺点

让我们讨论一下 WebSockets 的一些缺点：

- 终止的连接不会自动恢复。
- 较旧的浏览器不支持 WebSockets（becoming less relevant）。

## Server-Sent Events (SSE)

Server-Sent Events (SSE) 是一种在客户端和服务器之间建立长期通信的方式，使服务器能够主动向客户端推送数据。

![](System Design Learn how to design systems at scale and prepare for system design interviews.assets/server-sent-events.png)

它是单向的，这意味着一旦客户端发送请求，它只能接收响应，而无法通过同一连接发送新请求。

### Working

让我们了解 server-sent events 是如何工作的：

1. 客户端向服务器发出请求。
2. 客户端和服务器之间的连接已建立并保持打开状态。
3. 当有新数据可用时，服务器会向客户端发送响应或事件。

### 优点

- 客户端和服务器都易于实现和使用。
- 大多数浏览器都支持。
- 防火墙没有问题。

### 缺点

- 单向性可能会受到限制。
- 打开连接的最大数量限制。
- 不支持二进制数据。

# Geohashing and Quadtrees（地理哈希和四叉树）

## Geohashing

### Use cases

以下是 Geohashing 的一些常见用例：

- 这是一种在数据库中表示和存储位置的简单方法。
- 它也可以作为 URL 在社交媒体上共享，因为它比纬度和经度更容易共享和记住。
- 我们可以通过非常简单的字符串比较和有效的索引搜索来有效地找到一个点的最近邻居。

### Examples

Geohashing 被广泛使用，并得到流行数据库的支持。

- [MySQL](https://www.mysql.com/)
- [Redis](http://redis.io/)
- [Amazon DynamoDB](https://aws.amazon.com/dynamodb)
- [Google Cloud Firestore](https://cloud.google.com/firestore)

## Quadtrees

### 为什么我们需要四叉树？

纬度和经度还不够吗？ 为什么我们需要四叉树？ 虽然在理论上使用纬度和经度，我们可以使用[欧几里德距离](https://en.wikipedia.org/wiki/Euclidean_distance)来确定诸如点彼此之间的距离之类的事情，但对于实际用例，它根本无法扩展，因为它具有大型数据集的 CPU 密集型特性。

![](System Design Learn how to design systems at scale and prepare for system design interviews.assets/quadtree-subdivision.png)

四叉树使我们能够有效地搜索二维范围内的点，这些点被定义为纬度/经度坐标或笛卡尔 (x, y) 坐标。 此外，我们可以通过仅在某个阈值之后细分节点来节省进一步的计算。 并且随着 [Hilbert curve](https://en.wikipedia.org/wiki/Hilbert_curve) 等映射算法的应用，我们可以很容易地提高范围查询的性能。

### Use cases

以下是四叉树的一些常见用途：

- 图像表示、处理和压缩。
- 空间索引和范围查询。
- 基于位置的服务，如谷歌地图、优步等。
- 网格生成和计算机图形学。
- 稀疏数据存储。

# Circuit breaker（断路器）

断路器是一种用于检测故障的设计模式，它封装了防止故障在维护期间不断重复发生、临时外部系统故障或意外系统困难的逻辑。

![](System Design Learn how to design systems at scale and prepare for system design interviews.assets/circuit-breaker.png)

断路器背后的基本思想非常简单。 我们将受保护的函数调用包装在断路器对象中，该对象监视故障。 一旦故障达到某个阈值，断路器就会跳闸，并且对断路器的所有进一步调用都会返回错误，而根本不会进行受保护的调用。 通常，如果断路器跳闸，我们还需要某种监视器警报。

## 为什么我们需要断路？

软件系统对运行在不同进程中的软件进行远程调用是很常见的，可能在网络上的不同机器上。 内存调用和远程调用之间的一大区别是远程调用可能会失败，或者挂起而没有响应，直到达到某个超时限制。 更糟糕的是，如果我们有很多呼叫者联系一个无响应的供应商，那么我们可能会耗尽关键资源，从而导致跨多个系统的级联故障。

## 状态

让我们讨论一下断路器状态：

### 关闭

当一切正常时，断路器保持关闭状态，所有请求都照常传递到服务。 如果故障数量增加超过阈值，则断路器跳闸并进入打开状态。

### 打开

在这种状态下，断路器立即返回错误，甚至不调用服务。 经过一定的超时时间后，断路器进入半开状态。 通常，它将有一个监控系统，其中将指定超时。

### 半开

在这种状态下，断路器允许来自服务的有限数量的请求通过并调用操作。 如果请求成功，则断路器将进入关闭状态。 但是，如果请求继续失败，则它会返回到打开状态。

# 速率限制

速率限制是指防止操作的频率超过定义的限制。 在大型系统中，速率限制通常用于保护底层服务和资源。 速率限制一般在分布式系统中作为一种防御机制，使共享资源能够保持可用性。 它还通过限制在给定时间段内可以到达我们 API 的请求数量来保护我们的 API 免受意外或恶意过度使用。

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-IV/rate-limiting/rate-limiting.png)

## 为什么我们需要速率限制？

速率限制是任何大型系统的一个非常重要的部分，它可以用来完成以下任务：

- 避免因拒绝服务 (DoS) 攻击而导致资源匮乏。
- 速率限制通过对资源的自动扩展设置虚拟上限来帮助控制运营成本，如果不对其进行监控，可能会导致指数级的账单。
- 速率限制可以用来防御或缓解一些常见的攻击。
- 对于处理大量数据的 API，可以使用速率限制来控制该数据的流动。

## 算法

API 速率限制有多种算法，每种算法都有其优点和缺点。 让我们简要讨论其中一些算法：

### Leaky Bucket

Leaky Bucket 是一种算法，它提供了一种简单、直观的方法来通过队列进行速率限制。 注册请求时，系统会将其附加到队列的末尾。 队列中第一项的处理以固定间隔或先进先出 (FIFO) 进行。 如果队列已满，则丢弃（或泄露）其他请求。

### Token Bucket

这里我们使用桶的概念。 当请求进来时，必须从存储桶中获取一个令牌并进行处理。 如果桶中没有可用的令牌，请求将被拒绝，请求者将不得不稍后再试。 因此，令牌桶会在一定时间后刷新。

### Fixed Window

系统使用 `n` 秒的窗口大小来跟踪固定窗口算法速率。 每个传入的请求都会增加窗口的计数器。 如果计数器超过阈值，它将丢弃请求。

### Sliding Log

滑动日志速率限制涉及跟踪每个请求的时间戳日志。 系统将这些日志存储在按时间排序的哈希集或表中。 它还会丢弃时间戳超过阈值的日志。 当有新请求进来时，我们计算日志的总和来确定请求率。 如果请求将超过阈值速率，则将其保留。

### Sliding Window

滑动窗口是一种混合方法，它结合了固定窗口算法的低处理成本和 Sliding Log 改进的边界条件。 与固定窗口算法一样，我们为每个固定窗口跟踪一个计数器。 接下来，我们根据当前时间戳计算前一个窗口的请求率的加权值，以平滑流量的爆发。

## 分布式系统中的速率限制

当涉及分布式系统时，速率限制变得复杂。 分布式系统中速率限制带来的两个广泛问题是：

### Inconsistencies

当使用多个节点的集群时，我们可能需要强制执行全局速率限制策略。 因为如果每个节点都跟踪其速率限制，消费者在向不同节点发送请求时可能会超过全局速率限制。 节点数越多，用户越有可能超过全局限制。

解决这个问题的最简单方法是在我们的负载均衡器中使用粘性会话，以便每个消费者都被发送到一个节点，但这会导致缺乏容错和扩展问题。 另一种方法可能是使用像 [Redis](https://redis.io/) 这样的集中式数据存储，但这会增加延迟并导致竞争条件。

### Race Conditions

当我们使用简单的*“get-then-set”*方法时会发生此问题，在该方法中，我们检索当前速率限制计数器，将其递增，然后将其推回数据存储区。 该模型的问题在于，在执行完整的 read-increment-store 周期所需的时间内，可能会出现额外的请求，每个请求都试图用无效（较低）的计数器值存储增量计数器。 这允许消费者发送大量请求以绕过速率限制控制。

避免此问题的一种方法是在密钥周围使用某种分布式锁定机制，以防止任何其他进程访问或写入计数器。 虽然锁将成为一个重要的瓶颈并且不会很好地扩展。 更好的方法可能是使用*“set-then-get”*方法，允许我们快速递增和检查计数器值，而不会让原子操作妨碍。

# Service Discovery

服务发现是对计算机网络中服务的检测。 服务发现协议 (SDP) 是一种网络标准，它通过识别资源来完成对网络的检测。

## 为什么我们需要服务发现？

在单体应用程序中，服务通过语言级方法或过程调用相互调用。 但是，基于现代微服务的应用程序通常在虚拟化或容器化环境中运行，其中服务实例的数量及其位置会动态变化。 因此，我们需要一种机制，使服务的客户端能够向一组动态变化的临时服务实例发出请求。

## 实现

有两种主要的服务发现模式：

### Client-side discovery

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-IV/service-discovery/client-side-service-discovery.png)

在这种方法中，客户端通过查询负责管理和存储所有服务的网络位置的服务注册表来获取另一个服务的位置。

### Server-side discovery

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-IV/service-discovery/server-side-service-discovery.png)

在这种方法中，我们使用了一个中间组件，例如负载均衡器。 客户端通过负载均衡器向服务发出请求，然后将请求转发到可用的服务实例。

## Service Registry（服务注册表）

服务注册表基本上是一个数据库，其中包含客户端可以访问的服务实例的网络位置。 Service Registry 必须是高度可用的并且是最新的。

## Service Registration服务注册

我们还需要一种获取服务信息的方法，通常称为服务注册。 让我们看一下两种可能的服务注册方法：

### Self-Registration

使用自注册模型时，服务实例负责在 Service Registry 中注册和注销自己。 此外，如有必要，服务实例会发送心跳请求以保持其注册是活动的。

### Third-party Registration

注册表通过轮询部署环境或订阅事件来跟踪对运行实例的更改。 当它检测到一个新的可用服务实例时，它会将其记录在其数据库中。 服务注册中心还注销已终止的服务实例。

## Service mesh

服务到服务的通信在分布式应用程序中是必不可少的，但是随着服务数量的增长，在应用程序集群内和跨应用程序集群中路由这种通信变得越来越复杂。 Service mesh 支持在各个服务之间进行托管、可观察和安全的通信。 它与服务发现协议一起工作以检测服务。 [Istio](https://istio.io/latest/about/service-mesh) 和 [envoy](https://www.envoyproxy.io/) 是一些最常用的 Service mesh 技术。

## Examples

以下是一些常用的服务发现基础设施工具：

- [etcd](https://etcd.io/)
- [Consul](https://www.consul.io/)
- [Apache Thrift](https://thrift.apache.org/)
- [Apache Zookeeper](https://zookeeper.apache.org/)

# SLA, SLO, SLI

让我们简要讨论一下 SLA、SLO 和 SLI。 这些主要与事物的业务和站点可靠性有关，但很高兴知道。

## 为什么它们很重要？

SLA、SLO 和 SLI 允许公司定义、跟踪和监控对其用户的服务承诺。 SLA、SLO 和 SLI 应该共同帮助团队提高用户对其服务的信任，同时更加强调对事件管理和响应流程的持续改进。

## SLA

SLA 或 Service Level Agreement 是公司与其给定服务的用户之间达成的协议。 SLA 定义了公司就特定指标（例如服务可用性）向用户做出的不同承诺。

*SLA 通常由公司的业务或法律团队编写。*

## SLO

SLO 或 Service Level Objective 是公司就事件响应或正常运行时间等特定指标向用户作出的承诺。 SLO 作为包含在完整用户协议中的单独承诺存在于 SLA 中。 SLO 是服务为了遵守 SLA 必须满足的特定目标。 SLO 应始终简单、定义明确且易于衡量，以确定目标是否已实现。

## SLI

SLI 或服务水平指标（Service Level Indicator）是用于确定是否满足 SLO 的关键指标。 它是 SLO 中描述的指标的测量值。 为了始终遵守 SLA，SLI 的值必须始终达到或超过 SLO 确定的值。

# 灾难恢复

灾难恢复 (Disaster recovery，DR) 是在发生自然灾害、网络攻击甚至业务中断等事件后重新获得基础设施访问权限和功能的过程。

灾难恢复依赖于在不受灾难影响的外部位置复制数据和计算机处理。 当服务器因灾难而停机时，企业需要从备份数据的第二个位置恢复丢失的数据。 理想情况下，组织也可以将其计算机处理转移到该远程位置，以便继续运营。

*在系统设计面试中通常不会积极讨论灾难恢复，但对这个主题有一些基本的了解很重要。 你可以从 [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html) 了解有关灾难恢复的更多信息。*

# 虚拟机 (VMs) 和容器

# OAuth 2.0 and OpenID Connect (OIDC)

## OAuth 2.0

OAuth 2.0 代表开放授权，是一种标准，旨在代表用户提供对资源的同意访问，而无需共享用户的凭据。 OAuth 2.0 是一种授权协议而不是身份验证协议，它主要被设计为授予对一组资源（例如远程 API 或用户数据）的访问权限的一种方式。

### 概念

## OpenID 连接

OAuth 2.0 仅用于授权，用于授予对数据和功能的访问权限，从一个应用程序到另一个应用程序。 OpenID Connect (OIDC) 是位于 OAuth 2.0 之上的一个薄层，它添加了有关登录者的登录信息和个人资料信息。

当授权服务器支持 OIDC 时，它有时被称为身份提供者 (IdP)，因为它向客户端提供有关资源所有者的信息。 OpenID Connect 相对较新，与 OAuth 相比，最佳实践的采用率和行业实施率较低。

### 概念

OpenID Connect (OIDC) 协议定义了以下实体：

- **依赖方**：当前应用程序。
- **OpenID Provider**：这本质上是一种中间服务，向依赖方提供一次性代码。
- **Token Endpoint**：接受一次性代码 (OTC) 并提供一小时有效访问代码的 Web 服务器。 OIDC 和 OAuth 2.0 之间的主要区别在于令牌是使用 JSON Web 令牌 (JWT) 提供的。
- **UserInfo Endpoint**：依赖方与此端点通信，提供安全令牌并接收有关最终用户的信息



​		OAuth 2.0 和 OIDC 都易于实现并且基于 JSON，大多数 Web 和移动应用程序都支持这一点。 但是，OpenID Connect (OIDC) 规范比基本 OAuth 规范更严格。

# Single Sign-On (SSO)

单点登录 (SSO) 是一种身份验证过程，其中仅使用一组登录凭据为用户提供对多个应用程序或网站的访问权限。 这避免了用户单独登录到不同应用程序的需要。

用户凭证和其他识别信息由称为身份提供者 (IdP) 的集中式系统存储和管理。 身份提供者是一个可信系统，提供对其他网站和应用程序的访问。

基于单点登录 (SSO) 的身份验证系统通常用于员工需要访问其组织的多个应用程序的企业环境中。

## Components

让我们讨论一下单点登录 (SSO) 的一些关键组件。

### Identity Provider (IdP)

用户身份信息由称为身份提供者 (IdP) 的集中式系统存储和管理。 身份提供者对用户进行身份验证并提供对服务提供者的访问。

身份提供者可以通过验证用户名和密码或通过验证由单独的身份提供者提供的关于用户身份的断言来直接验证用户。 身份提供者处理用户身份的管理，以便将服务提供者从这一责任中解放出来。

### Service Provider

服务提供商向最终用户提供服务。 它们依靠身份提供者来断言用户的身份，并且通常有关用户的某些属性由身份提供者管理。 服务提供商还可以为用户维护一个本地帐户以及他们的服务所独有的属性。

### Identity Broker

身份代理充当中介，将多个服务提供者与各种不同的身份提供者连接起来。 使用身份代理，我们可以在任何应用程序上执行单点登录，而无需使用它所遵循的协议。

## SAML

Security Assertion Markup Language 是一种开放标准，允许客户端在不同系统之间共享有关身份、身份验证和权限的安全信息。 SAML 是使用可扩展标记语言 (XML) 标准实现的，用于共享数据。

SAML 特别支持身份联合，使身份提供者 (IdP) 可以无缝、安全地将经过身份验证的身份及其属性传递给服务提供者。

## SSO 是如何工作的？

## SAML vs OAuth 2.0 and OpenID Connect (OIDC)

SAML、OAuth 和 OIDC 之间存在许多差异。 SAML 使用 XML 传递消息，而 OAuth 和 OIDC 使用 JSON。 OAuth 提供更简单的体验，而 SAML 则面向企业安全。

OAuth 和 OIDC 广泛使用 RESTful 通信，这就是移动和现代 Web 应用程序发现 OAuth 和 OIDC 为用户提供更好体验的原因。另一方面，SAML 在允许用户访问某些网页的浏览器中丢弃会话 cookie。这对于短期工作负载非常有用。

OIDC 对开发人员友好且易于实施，从而拓宽了可能实施的用例。它可以通过所有常用编程语言的免费库快速从头开始实现。 SAML 的安装和维护可能很复杂，只有企业规模的公司才能处理好。

OpenID Connect 本质上是 OAuth 框架之上的一层。因此，它可以提供一个内置的权限层，要求用户同意服务提供商可能访问的内容。尽管 SAML 也能够允许同意流，但它通过由开发人员执行的硬编码来实现这一点，而不是作为其协议的一部分。

这两种身份验证协议都擅长它们的工作。与往常一样，很大程度上取决于我们的特定用例和目标受众。

## 优点

以下是使用单点登录的好处：

- 易于使用，因为用户只需要记住一组凭据。
- 无需经过漫长的授权过程即可轻松访问。
- 加强安全性和合规性以保护敏感数据。
- 通过降低 IT 支持成本和管理时间来简化管理。

## 缺点

以下是单点登录的一些缺点：

- 单一密码漏洞，如果主 SSO 密码被泄露，所有受支持的应用程序都会被泄露。
- 使用单点登录的身份验证过程比传统身份验证要慢，因为每个应用程序都必须请求 SSO 提供程序进行验证。

## 例子

这些是一些常用的身份提供者 (IdP)：

- [Okta](https://www.okta.com/)
- [Google](https://cloud.google.com/architecture/identity/single-sign-on)
- [Auth0](https://auth0.com/)
- [OneLogin](https://www.onelogin.com/)

# SSL, TLS, mTLS

让我们简要讨论一些重要的通信安全协议，例如 SSL、TLS 和 mTLS。 我想说，从“*大局*”系统设计的角度来看，这个话题不是很重要，但仍然很值得了解。

## SSL

SSL 代表安全套接字层（Secure Sockets Layer），它指的是一种用于加密和保护发生在 Internet 上的通信的协议。 它于 1995 年首次开发，但后来被弃用，取而代之的是 TLS（传输层安全）。

### 如果不推荐使用，为什么将其称为 SSL 证书？

大多数主要证书提供商仍将证书称为 SSL 证书，这就是命名约定保持不变的原因。

### 为什么 SSL 如此重要？

最初，网络上的数据以明文形式传输，任何人只要截获该消息就可以阅读。 创建 SSL 是为了纠正此问题并保护用户隐私。 通过加密在用户和 Web 服务器之间传输的任何数据，SSL 还可以防止攻击者篡改传输中的数据，从而阻止某些类型的网络攻击。

## TLS

传输层安全性（Transport Layer Security）或 TLS 是一种广泛采用的安全协议，旨在促进互联网通信的隐私和数据安全。 TLS 是从以前称为安全套接字层 (SSL) 的加密协议演变而来的。 TLS 的一个主要用例是加密 Web 应用程序和服务器之间的通信。

TLS 协议完成三个主要组件：

- **加密**：隐藏从第三方传输的数据。
- **身份验证**：确保交换信息的各方是他们声称的身份。
- **完整性**：验证数据没有被伪造或篡改。

## mTLS

Mutual TLS，或 mTLS，是一种相互身份验证的方法。 mTLS 通过验证他们都拥有正确的私钥来确保网络连接每一端的各方都是他们声称的身份。 它们各自的 TLS 证书中的信息提供了额外的验证。

### 为什么要使用 mTLS？

mTLS 有助于确保流量在客户端和服务器之间的双向安全和可信。 这为登录到组织网络或应用程序的用户提供了额外的安全层。 它还验证与不遵循登录过程的客户端设备的连接，例如物联网 (IoT) 设备。

如今，mTLS 常被微服务或分布式系统以[零信任安全模型](https://en.wikipedia.org/wiki/Zero_trust_security_model)用于相互验证。

**Chapter V**

# 系统设计面试

系统设计是一个非常广泛的主题，系统设计面试旨在评估你为抽象问题提供技术解决方案的能力，因此，它们不是为特定答案而设计的。 系统设计面试的独特之处在于候选人和面试官之间的双向性质。

不同工程级别的期望也大不相同。 这是因为具有丰富实践经验的人会与业内新手完全不同。 因此，很难想出一个单一的策略来帮助我们在面试过程中保持井井有条。

让我们看一下系统设计面试的一些常见策略：

## 需求澄清（Requirements clarifications）

系统设计面试问题本质上是模糊或抽象的。 询问有关问题的确切范围的问题，并在面试的早期澄清功能需求是必不可少的。 通常，需求分为三个部分：

### 功能要求（Functional requirements）

这些是最终用户作为系统应提供的基本功能而特别要求的要求。 所有这些功能都必须作为合同的一部分纳入系统。

例如：

- “我们需要为这个系统设计哪些功能？”
- “在我们的设计中，如果有的话，我们需要考虑哪些边缘情况？”

### 非功能性需求（Non-functional requirements）

这些是系统根据项目合同必须满足的质量约束。 实施这些因素的优先级或程度因项目而异。 它们也被称为非行为要求。 例如，可移植性、可维护性、可靠性、可扩展性、安全性等。

例如：

- “每个请求都应该以最小的延迟处理”
- “系统应该是高可用的”

### 扩展要求（Extended requirements）

这些基本上是“很高兴拥有”的要求，可能超出了系统的范围。

例如：

- “我们的系统应该记录指标和分析”
- “服务健康和性能监控？”

## 估计和约束（Estimation and Constraints）

估计我们要设计的系统的规模。 提出以下问题很重要：

- “这个系统需要处理的理想规模是多少？”
- “我们系统的读写比是多少？”
- “每秒多少个请求？”
- “需要多少存储空间？”



这些问题将帮助我们以后扩展我们的设计。

## 数据模型设计

一旦我们有了估计，我们就可以从定义数据库模式开始。 在面试的早期阶段这样做将有助于我们了解作为每个系统核心的数据流。 在这一步中，我们基本上定义了所有的实体和它们之间的关系。

- “系统中有哪些不同的实体？”
- “这些实体之间是什么关系？”
- “我们需要多少张表？”
- “NoSQL 在这里是更好的选择吗？”

## API设计

接下来，我们可以开始为系统设计 API。 这些 API 将帮助我们明确定义系统的期望。 我们不需要编写任何代码，只需一个简单的接口定义 API 要求，例如参数、函数、类、类型、实体等。

例如：

```
createUser(name: string, email: string): User
```

建议保持接口尽可能简单，稍后在涉及扩展需求时返回。

## 高级组件设计

​		现在我们已经建立了我们的数据模型和 API 设计，是时候确定解决我们的问题所需的系统组件（如负载均衡器、API 网关等）并起草我们系统的第一个设计。

- “设计单体架构还是微服务架构最好？”
- “我们应该使用什么类型的数据库？”
- 一旦我们有了一个基本的图表，我们就可以开始与面试官讨论系统将如何从客户的角度工作。

## 详细设计

​		现在是时候详细介绍我们设计的系统的主要组件了。一如既往地与面试官讨论哪个组件可能需要进一步改进。

​		这是展示你在专业领域的经验的好机会。介绍不同的方法、优点和缺点。解释你的设计决策，并用例子来支持它们。这也是讨论系统可能支持的任何附加功能的好时机，尽管这是可选的。

- “我们应该如何划分我们的数据？”
- “负载分配呢？”
- “我们应该使用缓存吗？”
- “我们将如何处理突然的流量高峰？”

​       此外，尽量不要对某些技术过于固执己见，诸如“我认为 NoSQL 数据库更好，SQL 数据库不可扩展”之类的陈述反映不佳。作为多年来面试过很多人的人，我的一点观点就是对你知道什么和你不知道什么保持谦虚。使用你现有的知识和示例来导航面试的这一部分。

## 识别和解决瓶颈

最后，是时候讨论瓶颈和缓解它们的方法了。 这里有一些重要的问题要问：

- “我们有足够的数据库副本吗？”
- “有单点故障吗？”
- “需要数据库分片吗？”
- “我们怎样才能让我们的系统更健壮？”
- “如何提高我们缓存的可用性？”

请务必阅读你正在面试的公司的工程博客。 这将帮助你了解他们正在使用什么技术栈以及哪些问题对他们很重要。

# URL Shortener

Let's design a URL shortener, similar to services like [Bitly](https://bitly.com/), [TinyURL](https://tinyurl.com/app).

## 什么是 URL Shortener?

URL 缩短服务为长 URL 创建别名或短 URL。 用户在访问这些短链接时会被重定向到原始 URL。

例如，下面的长 URL 可以更改为较短的 URL。

**Long URL**: https://karanpratapsingh.com/courses/system-design/url-shortener

**Short URL**: https://bit.ly/3I71d3o

## 为什么我们需要 URL 缩短器？

当我们共享 URL 时，URL 缩短器通常会节省空间。 用户也不太可能错误输入较短的 URL。 此外，我们还可以优化跨设备的链接，这使我们能够跟踪单个链接。

## 需求

## API 设计

### 为什么我们需要 API key？

您一定已经注意到，我们使用 API key 来防止滥用我们的服务。 使用此 API key，我们可以将用户限制为每秒或每分钟一定数量的请求。 这对于开发人员 API 来说是相当标准的做法，应该涵盖我们的扩展需求。

## 高级设计

## 详细设计

### 数据分区

### 数据库清理

### 缓存

**使用哪种缓存驱逐策略？**

正如我们之前所讨论的，我们可以使用 [Redis](https://redis.io/) 或 [Memcached](https://memcached.org/) 之类的解决方案并缓存 20% 的日常流量，但哪种缓存驱逐策略最适合我们的需求？

[Least Recently Used (LRU)](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU))  对我们的系统来说可能是一个很好的策略。 在此策略中，我们首先丢弃最近最少使用的密钥。

**如何处理缓存未命中？**

每当缓存未命中时，我们的服务器可以直接访问数据库并使用新条目更新缓存。

### 指标和分析（Metrics and Analytics）

记录分析和指标是我们的扩展要求之一。 我们可以在我们数据库中的 URL 条目旁边存储和更新元数据，例如访问者的国家、平台、观看次数等。

### Security

为了安全起见，我们可以引入私有 URL 和授权。 可以使用单独的表来存储有权访问特定 URL 的用户 ID。 如果用户没有适当的权限，我们可以返回 HTTP 401（未授权）错误。

我们还可以使用 [API 网关](https://karanpratapsingh.com/courses/system-design/api-gateway)，因为它们可以支持开箱即用的授权、速率限制和负载平衡等功能。

## 识别和解决瓶颈

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-V/url-shortener/url-shortener-advanced-design.png)

让我们识别并解决设计中的瓶颈，例如单点故障：

- “如果 API 服务或密钥生成服务崩溃了怎么办？”
- “我们将如何在组件之间分配流量？”
- “我们如何才能减少数据库的负载？”
- “如果KGS使用的密钥数据库出现故障怎么办？”
- “如何提高我们缓存的可用性？”

为了使我们的系统更具弹性，我们可以执行以下操作：

- 运行我们的服务器和密钥生成服务的多个实例。
- 在客户端、服务器、数据库和缓存服务器之间引入[负载平衡器](https://karanpratapsingh.com/courses/system-design/load-balancing)。
- 为我们的数据库使用多个只读副本，因为它是一个读取繁重的系统。
- 我们的关键数据库的备用副本，以防万一它失败。
- 我们的分布式缓存的多个实例和副本。

# WhatsApp

让我们设计一个类似于 [WhatsApp](https://whatsapp.com/) 的即时消息服务，类似于 [Facebook Messenger](https://www.messenger.com/) 和[微信](https://www.wechat.com/)等服务。

## 什么是WhatsApp？

WhatsApp 是一个聊天应用程序，为用户提供即时通讯服务。 它是地球上最常用的移动应用程序之一，连接了 180 多个国家的超过 20 亿用户。 WhatsApp 也可以在网络上使用。

## 需求

我们的系统应满足以下要求：

### 功能需求

### 非功能性需求

### 扩展性需求

- 发送、已发送和已读消息的回执。
- 显示用户的最后一次看到时间。
- 推送通知。

## 估计和约束

## API 设计

## 高级设计

现在让我们对系统进行高级设计。

### 架构

我们将使用[微服务架构](https://karanpratapsingh.com/courses/system-design/monoliths-microservices#microservices)，因为它可以更容易地横向扩展和解耦我们的服务。 每个服务都拥有自己的数据模型。 让我们尝试将我们的系统划分为一些核心服务。

**那么服务间通信和服务发现呢？**

由于我们的架构是基于微服务的，服务也将相互通信。 通常，REST 或 HTTP 性能良好，但我们可以使用更轻量级和高效的 [gRPC](https://karanpratapsingh.com/courses/system-design/rest-graphql-grpc#grpc) 进一步提高性能。

[服务发现](https://karanpratapsingh.com/courses/system-design/service-discovery)是我们必须考虑的另一件事。 我们还可以使用 service mesh 来实现各个服务之间的托管、可观察和安全通信。

*注意：详细了解 [REST、GraphQL、gRPC](https://karanpratapsingh.com/courses/system-design/rest-graphql-grpc) 以及它们之间的比较。*

### 实时消息

我们如何有效地发送和接收消息？ 我们有两种不同的选择：

**Pull model**

客户端可以定期向服务器发送 HTTP 请求以检查是否有任何新消息。 这可以通过[长轮询](https://karanpratapsingh.com/courses/system-design/long-polling-websockets-server-sent-events#long-polling)之类的方法来实现。

**Push model**

客户端打开与服务器的长期连接，一旦有新数据可用，它将被推送到客户端。 为此，我们可以使用 [WebSockets](https://karanpratapsingh.com/courses/system-design/long-polling-websockets-server-sent-events#websockets) 或[Server-Sent Events (SSE)](https://karanpratapsingh.com/courses/system-design/long-polling-websockets-server-sent-events#server-sent-events-sse)。

pull 模式方法不可扩展，因为它会在我们的服务器上产生不必要的请求开销，并且大多数时候响应将为空，从而浪费我们的资源。 为了最大限度地减少延迟，使用带有 [WebSockets](https://karanpratapsingh.com/courses/system-design/long-polling-websockets-server-sent-events#websockets) 的推送模式是一个更好的选择，因为这样我们就可以在数据可用时将数据推送到客户端，而不会有任何延迟，因为客户端的连接是打开的。 此外，WebSockets 提供全双工通信，这与仅单向的 [Server-Sent Events (SSE)](https://karanpratapsingh.com/courses/system-design/long-polling-websockets-server-sent-events#server-sent-events-sse) 不同。

*注意：了解有关 [Long polling, WebSockets, Server-Sent Events (SSE)](https://karanpratapsingh.com/courses/system-design/long-polling-websockets-server-sent-events) 的更多信息。*

### Last seen（最后一次露面）

为了实现最后一次看到的功能，我们可以使用[心跳](https://en.wikipedia.org/wiki/Heartbeat_(computing))机制，客户端可以定期对服务器进行 ping 指示，以指示其活跃度。 由于这需要尽可能低的开销，我们可以将最后一个活动时间戳存储在缓存中，如下所示：

| Key    | Value               |
| ------ | ------------------- |
| User A | 2022-07-01T14:32:50 |
| User B | 2022-07-05T05:10:35 |
| User C | 2022-07-10T04:33:25 |

这将为我们提供用户上次活动的时间。 此功能将由 Presence 服务结合 [Redis](https://redis.io/) 或 [Memcached](https://memcached.org/) 作为我们的缓存来处理。

实现这一点的另一种方法是跟踪用户的最新动作，一旦最后一个活动超过某个阈值，例如“用户在过去 30 秒内没有执行任何动作”，我们可以将用户显示为离线和最后 与最后记录的时间戳一起看到。 这将更像是一种惰性更新方法，并且在某些情况下可能会使我们受益于心跳。

### 通知

在聊天或群组中发送消息后，我们将首先检查收件人是否处于活动状态，我们可以通过考虑用户的活动连接和最后一次看到来获取此信息。

如果接收者未处于活动状态，聊天服务将向[消息队列](https://karanpratapsingh.com/courses/system-design/message-queues)中添加一个带有附加元数据的事件，例如客户端的设备平台，这些元数据将用于稍后将通知路由到正确的平台。

然后，通知服务将使用消息队列中的事件并将请求转发到基于客户端设备平台（Android、iOS、Web 等）的 [Firebase 云消息传递 (FCM)](https://firebase.google.com/docs/cloud-messaging) 或 [Apple 推送通知服务 (APNS)](https://developer.apple.com/documentation/usernotifications)。 我们还可以添加对电子邮件和 SMS 的支持。

**为什么我们使用消息队列？**

由于大多数消息队列都提供尽力而为的排序，这可确保消息通常以与发送消息相同的顺序传递，并且消息至少传递一次，这是我们服务功能的重要组成部分。

虽然这看起来像是一个经典的[发布-订阅](https://karanpratapsingh.com/courses/system-design/publish-subscribe)用例，但实际上并不是因为移动设备和浏览器都有自己处理推送通知的方式。 通常，通知是通过 Firebase 云消息传递 (FCM) 或 Apple 推送通知服务 (APNS) 在外部处理的，这与我们通常在后端服务中看到的消息扇出（fan-out）不同。 我们可以使用 [Amazon SQS](https://aws.amazon.com/sqs) 或 [RabbitMQ](https://www.rabbitmq.com/) 之类的东西来支持此功能。

### 已读回执（Read receipts）

处理已读回执可能很棘手，对于这个用例，我们可以等待来自客户端的某种[确认 (ACK)](https://en.wikipedia.org/wiki/Acknowledgement_(data_networks)) 来确定消息是否已传递并更新相应的 `DeliveredAt` 字段。 同样，一旦用户打开聊天，我们会将消息标记为已查看，并更新相应的 `seenAt` 时间戳字段。

### 设计

现在我们已经确定了一些核心组件，让我们进行系统设计的初稿。

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-V/whatsapp/whatsapp-basic-design.png)

## 详细设计

是时候详细讨论我们的设计决策了。

### 数据分区

### 缓存

在消息传递应用程序中，我们必须小心使用缓存，因为我们的用户期望最新数据，但许多用户将请求相同的消息，尤其是在群聊中。 因此，为了防止我们的资源使用高峰，我们可以缓存旧消息。

一些群聊可以有数千条消息，通过网络发送消息效率非常低，为了提高效率，我们可以在系统 API 中添加分页。 此决定对网络带宽有限的用户很有帮助，因为除非请求，否则他们不必检索旧消息。

**使用哪种缓存驱逐策略？**

**如何处理缓存未命中？**

每当缓存未命中时，我们的服务器可以直接访问数据库并使用新条目更新缓存。

*有关详细信息，请参阅[缓存](https://karanpratapsingh.com/courses/system-design/caching)。*

### Media access and storage

众所周知，我们的大部分存储空间将用于存储媒体文件，例如图像、视频或其他文件。 我们的媒体服务将处理用户媒体文件的访问和存储。

但是我们可以在哪里大规模存储文件？ 好吧，我们正在寻找[对象存储](https://karanpratapsingh.com/courses/system-design/storage#object-storage)。 对象存储将数据文件分解成称为对象的片段。 然后它将这些对象存储在单个存储库中，该存储库可以分布在多个网络系统中。 我们还可以使用分布式文件存储，例如 [HDFS](https://karanpratapsingh.com/courses/system-design/storage#hdfs) 或 [GlusterFS](https://www.gluster.org/)。

*有趣的事实：一旦用户下载了媒体，WhatsApp 就会删除其服务器上的媒体。*

对于这个用例，我们可以使用 [Amazon S3](https://aws.amazon.com/s3)、[Azure Blob Storage](https://azure.microsoft.com/en-in/services/storage/blobs) 或 [Google Cloud Storage](https://cloud.google.com/storage) 等对象存储。

### Content Delivery Network (CDN)

[内容分发网络 (CDN)](https://karanpratapsingh.com/courses/system-design/content-delivery-network) 提高了内容可用性和冗余度，同时降低了带宽成本。 通常，图像和视频等静态文件是从 CDN 提供的。 对于这个用例，我们可以使用 [Amazon CloudFront](https://aws.amazon.com/cloudfront) 或 [Cloudflare CDN](https://www.cloudflare.com/cdn) 等服务。

### API 网关

由于我们将使用 HTTP、WebSocket、TCP/IP 等多种协议，因此为每个协议分别部署多个 L4（传输层）或 L7（应用层）类型的负载均衡器会很昂贵。 相反，我们可以使用支持多种协议的 [API 网关](https://karanpratapsingh.com/courses/system-design/api-gateway)而不会出现任何问题。

API Gateway 还可以提供其他功能，例如身份验证、授权、速率限制、节流和 API 版本控制，这将提高我们的服务质量。

对于这个用例，我们可以使用 [Amazon API Gateway](https://aws.amazon.com/api-gateway) 或 [Azure API Gateway](https://azure.microsoft.com/en-in/services/api-management) 等服务。

## 识别和解决瓶颈

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-V/whatsapp/whatsapp-advanced-design.png)

为了使我们的系统更具弹性，我们可以执行以下操作：

- 运行我们每个服务的多个实例。
- 在客户端、服务器、数据库和缓存服务器之间引入[负载平衡器](https://karanpratapsingh.com/courses/system-design/load-balancing)。
- 为我们的数据库使用多个只读副本。
- 我们的分布式缓存使用多个实例和副本。
- 我们可以拥有 API 网关的备用副本。
- 恰好一旦分布式系统中的传递和消息排序遇到挑战，我们就可以使用专用的[消息代理](https://karanpratapsingh.com/courses/system-design/message-brokers)（例如 [Apache Kafka](https://kafka.apache.org/) 或 [NATS](https://nats.io/)）来使我们的通知系统更加健壮。
- 我们可以在媒体服务中添加媒体处理和压缩功能，以压缩类似于WhatsApp的大文件，这样可以节省大量存储空间并降低成本。
- 我们可以创建一个与聊天服务分开的群组服务，以进一步解耦我们的服务。

# Twitter

让我们设计一个类似于 [Twitter](https://twitter.com/) 的社交媒体服务，类似于 [Facebook](https://facebook.com/)、[Instagram](https://instagram.com/) 等服务。

## 需求

## 数据模型设计

### 我们应该使用什么样的数据库？

虽然我们的数据模型看起来非常像关系型数据库，但我们不一定需要将所有内容存储在单个数据库中，因为这会限制我们的可扩展性并很快成为瓶颈。

我们将在不同服务之间拆分数据，每个服务都拥有特定表的所有权。 然后，我们可以将 PostgreSQL 等关系数据库或 Apache Cassandra 等分布式 NoSQL 数据库用于我们的用例。

## API 设计

## 高级设计

### 架构

我们将使用[微服务架构](https://karanpratapsingh.com/courses/system-design/monoliths-microservices#microservices)，因为它可以更容易地横向扩展和解耦我们的服务。 每个服务都拥有自己的数据模型。 让我们尝试将我们的系统划分为一些核心服务。

### Newsfeed

说到新闻源，它似乎很容易实现，但是有很多事情可以成就或破坏这个功能。 所以，让我们把我们的问题分成两部分：

**生成**

**发布**

发布是根据每个特定用户推送提要数据的步骤。 这可能是一个非常繁重的操作，因为用户可能有数百万的朋友或追随者。 为了解决这个问题，我们有三种不同的方法：

- Pull Model (or Fan-out on load)

- Push Model (or Fan-out on write)

- Hybrid Model

  第三种方法是拉和推模型之间的混合模型。 它结合了上述两种模型的有益特性，并试图在两者之间提供一种平衡的方法。

混合模型只允许关注者数量较少的用户使用推送模型。 对于名人等追随者数量较多的用户，使用拉取模型。

### 排名算法

### 转发推文（Retweets）

### 搜索

有时传统的 DBMS 性能不够好，我们需要能够快速、近乎实时地存储、搜索和分析大量数据并在几毫秒内给出结果的东西。 [Elasticsearch](https://www.elastic.co/) 可以帮助我们处理这个用例。

[Elasticsearch](https://www.elastic.co/) 是一个分布式、免费和开放的搜索和分析引擎，适用于所有类型的数据，包括文本、数字、地理空间、结构化和非结构化数据。 它建立在 [Apache Lucene](https://lucene.apache.org/) 之上。

**我们如何识别热门话题？**

趋势功能将基于搜索功能。 我们可以缓存最近 N 秒内最常搜索的查询、主题标签和主题，并使用某种批处理作业机制每 M 秒更新一次。 我们的排名算法也可以应用于热门话题，赋予它们更多的权重并为用户个性化。

### 通知

推送通知是任何社交媒体平台不可或缺的一部分。 我们可以使用消息队列或消息代理（例如带有通知服务的 [Apache Kafka](https://kafka.apache.org/)）将请求发送到 [Firebase 云消息传递 (FCM)](https://firebase.google.com/docs/cloud-messaging) 或 [Apple 推送通知服务 (APNS)](https://developer.apple.com/documentation/usernotifications)，后者将处理向用户设备发送推送通知。

*有关更多详细信息，请参阅我们详细讨论推送通知的 [WhatsApp](https://karanpratapsingh.com/courses/system-design/whatsapp#notifications) 系统设计。*

## 详细设计

### 数据分区

### Mutual friends

对于相互的朋友，我们可以为每个用户建立一个社交图谱。 图中的每个节点将代表一个用户，而有向边将代表 followers and followees。 之后，我们可以遍历一个用户的关注者，找到并推荐一个共同的朋友。 这将需要一个图形数据库，例如 Neo4j 和 ArangoDB。

这是一个非常简单的算法，为了提高我们的建议准确性，我们需要将一个使用机器学习的推荐模型作为我们算法的一部分。

### 指标和分析

### 缓存

### Media access and storage

### Content Delivery Network (CDN)

## 识别和解决瓶颈

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-V/twitter/twitter-advanced-design.png)

# Netflix

让我们设计一个类似于 [Netflix](https://netflix.com/) 的视频流服务，类似于 [Amazon Prime Video](https://www.primevideo.com/)、[Disney Plus](https://www.disneyplus.com/)、[Hulu](https://www.hulu.com/)、[Youtube](https://youtube.com/)、[Vimeo](https://vimeo.com/) 等服务。

## 需求

### 功能性需求

### 非功能性需求

### 扩展性需求

- 某些内容应该被[地理封锁](https://en.wikipedia.org/wiki/Geo-blocking)。
- 从用户停止的点恢复视频播放。
- 记录视频的指标和分析。

## 估计和约束

## 数据模型设计

## API 设计

## 高级设计

### 架构

### 视频处理

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-V/netflix/video-processing-pipeline.png)

## 详细设计

### Geo-blocking

Netflix 和 YouTube 等平台使用地理封锁来限制某些地理区域或国家的内容。 这主要是由于 Netflix 在与制作和发行公司达成协议时必须遵守的法律发行法。 对于 YouTube，这将在发布内容期间由用户控制。

我们可以使用其个人资料中的 IP 或区域设置来确定用户的位置，然后使用支持地理限制功能的 Amazon CloudFront 等服务或使用 Amazon Route53 的地理定位路由策略来限制内容并将用户重新路由到错误页面 如果该内容在该特定地区或国家/地区不可用。

### 建议

## 识别和解决瓶颈

# Uber

让我们设计一个类似于 [Uber](https://uber.com/) 的叫车服务，类似于 [Lyft](https://www.lyft.com/)、[OLA Cabs](https://www.olacabs.com/) 等服务。

## 需求

## 数据模型设计

## API 设计

## 高级设计

### 架构

我们将使用微服务架构，因为它可以更容易地横向扩展和解耦我们的服务。 每个服务都拥有自己的数据模型。 让我们尝试将我们的系统划分为一些核心服务。

**乘车服务**

### 该服务如何运作？

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-V/uber/uber-working.png)

1. 客户通过指定来源、目的地、出租车类型、付款方式等来请求乘车。
2. 乘车服务注册此请求，查找附近的司机，并计算预计到达时间 (estimated time of arrival，ETA)。
3. 然后将该请求广播给附近的司机，让他们接受或拒绝。
4. 如果司机接受，客户会在等待取件时收到司机的实时位置以及预计到达时间 (ETA) 的通知。
5. 客户被接走，司机可以开始旅行。
6. 到达目的地后，司机会将行程标记为完成并收取费用。
7. 付款完成后，客户可以根据自己的喜好对旅行进行评分和反馈。

### 位置追踪

我们如何有效地从客户端（客户和司机）向我们的后端发送和接收实时位置数据？ 我们有两种不同的选择：

**Pull model**

**Push model**

### Ride Matching

我们需要一种有效存储和查询附近司机的方法。 让我们探索可以融入我们设计的不同解决方案。

**SQL**

我们已经可以访问客户的纬度和经度，并且使用 PostgreSQL 和 MySQL 等数据库，我们可以执行查询以在半径 (R) 内给定纬度和经度 (X, Y) 的情况下查找附近的司机位置。

```sql
SELECT * FROM locations WHERE lat BETWEEN X-R AND X+R AND long BETWEEN Y-R AND Y+R
```

但是，这是不可扩展的，并且在大型数据集上执行此查询将非常慢。

**Geohashing**

[Geohashing](https://github.com/karanpratapsingh/system-design/blob/main/courses/sytem-design/geohashing-and-quadtrees#geohashing) 是一种[地理编码](https://en.wikipedia.org/wiki/Address_geocoding)方法，用于将纬度和经度等地理坐标编码为短的字母数字字符串。 它由 [Gustavo Niemeyer](https://twitter.com/gniemeyer)于 2008 年创建。

Geohash 是使用 Base-32 字母编码的分层空间索引，geohash 中的第一个字符将初始位置标识为 32 个单元格之一。 该单元还将包含 32 个单元。 这意味着为了表示一个点，世界被递归地划分为越来越小的单元，每增加一个位，直到达到所需的精度。 精度因子也决定了单元格的大小。

![](https://raw.githubusercontent.com/karanpratapsingh/portfolio/master/public/static/courses/system-design/chapter-IV/geohashing-and-quadtrees/geohashing.png)

例如，坐标为 `37.7564、-122.4016` 的旧金山可以在 geohash 中表示为 `9q8yy9mf`。

现在，使用客户的 geohash，我们可以通过简单地将其与司机的 geohash 进行比较来确定最近的可用司机。 为了获得更好的性能，我们会将司机的 geohash 索引并存储在内存中，以便更快地检索。

**Quadtrees**

[Quadtree](https://github.com/karanpratapsingh/system-design/blob/main/courses/sytem-design/geohashing-and-quadtrees#quadtrees) 似乎非常适合我们的用例，每次我们从司机收到新的位置更新时，我们都可以更新 Quadtree。 为了减少四叉树服务器的负载，我们可以使用 Redis 等内存数据存储来缓存最新更新。 并且通过应用 [Hilbert curve](https://en.wikipedia.org/wiki/Hilbert_curve)等地图算法，我们可以执行有效的范围查询，为客户找到附近的司机。

**What about race conditions?**

当大量客户同时要求乘车时，很容易出现竞争状况。 为了避免这种情况，我们可以将出行匹配逻辑包装在 [Mutex](https://en.wikipedia.org/wiki/Lock_(computer_science)) 中以避免任何竞争条件。 此外，每个动作都应该是事务性的。

*有关更多详细信息，请参阅事务和分布式事务。*

**如何找到附近最好的司机？**

一旦我们从 Quadtree 服务器获得了附近司机的列表，我们就可以根据平均评分、相关性、过去的客户反馈等参数进行某种排名。这将使我们能够首先向最佳可用司机广播通知。

**应对高需求**

在需求量大的情况下，我们可以使用 Surge Pricing 的概念。 激增定价是一种动态定价方法，其中价格会因需求增加和供应有限而暂时上涨。 这个激增的价格可以添加到旅行的基本价格中。

*For more details, learn how [surge pricing works](https://www.uber.com/us/en/drive/driver-app/how-surge-works) with Uber.*

### 付款

大规模处理支付具有挑战性，为了简化我们的系统，我们可以使用第三方支付处理器，如 Stripe 或 PayPal。 支付完成后，支付处理器会将用户重定向回我们的应用程序，我们可以设置一个 [webhook](https://en.wikipedia.org/wiki/Webhook) 来捕获所有与支付相关的数据。

### 通知

## 详细设计

## 识别并解决瓶颈

# Next Steps