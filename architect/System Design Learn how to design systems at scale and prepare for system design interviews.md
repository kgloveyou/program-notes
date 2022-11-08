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

好吧，答案是否定的。 没有灵丹妙药，因为这些技术中的每一种都有其自身的优点和缺点。 用户只关心以一致的方式使用我们的 API，因此在设计 API 时请务必关注您的领域和需求。