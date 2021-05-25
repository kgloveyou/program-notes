# GraphQL in Action

published 2021

# 第1部分 探索GraphQL  

# 第1章 介绍GraphQL  

- 了解GraphQL及其背后的设计理念

## 1.1 GraphQL是什么  ？

​	从前端数据APIs消费者的角度来看，GraphQL  是一个数据APIs查询语言；GraphQL  也是一个需要在后端实现的运行时层，该层使得前端消费者可以使用这种新的语言。

### 1.1.1 The big picture  

P6

## 1.2 为什么选择GraphQL？

standards  

efficiency  

使用GraphQL，你基本上可以将这种多请求复杂性转移到后端，让你的GraphQL运行时处理它。 客户端向GraphQL服务请求单个
问题，并获得客户端需要的确切的单一响应。

你可以自定义基于REST的API，以便为每个视图提供一个确切的endpoint，但这是不是常态。

GraphQL的另一个重大技术优势是可以与多个服务进行通信。When you have multiple clients requesting data from multiple data storage services (like PostgreSQL, MongoDB, and a Redis cache), a GraphQL layer in the middle can simplify and standardize this communication.  

我认为GraphQL另一个经常被低估的好处是它如何改善前端开发人员的体验。

**GraphQL is a translator**  

### 1.2.1 What about REST APIs?  

​		REST API的最大相关问题是客户需要与多个数据API endpoints进行通信。

​		此外，在REST API中，没有客户端请求语言。客户端无法控制服务器将返回什么数据，因为它们没有语言来传达它们的确切需求。

​		在纯REST API（而非自定义的REST API）中，客户端无法指定需要从该资源中的记录中返回哪些字段。REST API服务始终返回所有字段，无论客户端实际需要哪个字段。在GraphQL中，这种问题称为信息的*over-fetching*。这浪费了客户端和服务器的网络和内存资源。

​		REST API的另一个大问题是版本化。如果你需要支持多个版本，则通常意味着新的endpoints。而使用和维护这些endpoints，这会导致更多问题，这可能是造成服务器上代码重复的原因。

​		在这里需要指出REST APIs相对于GraphQL APIs具有一些优势。例如，缓存REST API响应比缓存GraphQL API响应更容易。而且，为不同的REST endpoints优化代码比为单个通用endpoint优化代码更容易。

### 1.2.2 The GraphQL way  

GraphQL背后的概念和设计决策.

- THE TYPED GRAPH SCHEMA  

- THE DECLARATIVE LANGUAGE  

- THE SINGLE ENDPOINT AND CLIENT LANGUAGE

- THE SIMPLE VERSIONING    

  这对于移动客户端尤其重要，因为你无法控制他们使用的API版本。一旦安装，移动应用程序可能会连续好几年都使用相同版本的API。在web上，可以很容易地控制API版本，因为你可以推送新代码并强制所有用户使用它。但是对于移动应用，这很难做到。

### 1.2.3 REST APIs 和GraphQL APIs 实战

out of the box：现成的。

## 1.3 GraphQL的问题

### 1.3.1 安全性

GraphQL API一个关键的威胁是资源耗尽攻击（也称为拒绝服务攻击）。

malignant：恶性的

​		你可以使用一些缓解措施。你可以事先对查询实施成本分析，然后对可使用的数据量进行限制。你可以还实施超时以终止需要太长时间才能解决的请求。此外，由于GraphQL服务只是任何应用栈中的一层，你可以在GraphQL 的更下层处理限速。

​		如果你尝试保护的GraphQL API endpoint不是公开的，并且是为客户端应用程序（web或移动应用）内部使用而设计，you can use an *allow-list* approach and preapprove queries the server can execute.  

​		身份验证和授权是你使用GraphQL时还需要考虑的其他问题。Do you handle them before, after, or during GraphQL’s fields resolving process?  

​		GraphQL仅仅是可以放在客户端和你的实际数据服务之间的一层。将身份验证和授权视为另一层。GraphQL不会帮助实际实现认证或授权逻辑。但是如果你想将这些层放在GraphQL后面，你可以使用GraphQL传递客户端与执行逻辑之间的访问token。这与通常在REST API中实现身份验证和授权的方式非常相似。

​		在第8章中，我们将介绍在GraphQL后面实现身份验证层的示例。

### 1.3.2 缓存和优化

 		GraphQL中一项更具挑战性的任务是客户端的数据缓存。REST API的响应由于其字典性质而更易于缓存。A specific URL gives certain data, so you can use the URL itself as the cache key.  

​		在GraphQL中，可以使用类似的基本方法：使用query text作为key，来缓存响应内容。但是这种方法是有限的，不是很有效，可能
导致数据一致性问题。多个GraphQL查询的结果很容易重叠，但是这种基本的缓存方法不会解决重叠问题。

​		这个问题有一个绝妙的解决方案。A graph query means a *graph cache*.  如果你将GraphQL查询响应标准化为a flat collection of records   ，并给出每个记录一个全局唯一ID，你可以缓存这些记录，而不是缓存全部的响应。

​		但是，这不是一个简单的过程。 将会有记录引用其他记录，因此你将管理循环图。填充和读取缓存将需要查询遍历。你可能必须实现一个单独的层来处理此缓存逻辑。 但是，此方法比基于响应的缓存要有效得多。

​		使用GraphQL时可能会遇到的其他最著名的问题之一通常称为N + 1 SQL查询。

​		幸运的是，Facebook率先提出了一种解决此数据加载优化问题的解决方案：它称为DataLoader。顾名思义，DataLoader是一个实用程序，可用于从数据库读取数据并将其提供给GraphQL解析器功能。你可以使用DataLoader，而不是直接使用SQL查询从数据库中读取数据，并且DataLoader将充当你的代理，以减少你发送到数据库的SQL查询。

​		DataLoader结合使用批处理和缓存来完成此任务。如果相同的客户端请求导致需要向数据库查询多个问题，则DataLoader可以合并这些问题并从数据库中批量加载其答案。DataLoader还将缓存答案，并使答案可用于有关相同资源的后续问题。

​		我们将在第7章中探讨Data Loader的实际好处。

### 1.3.3 学习曲线

​		与其他替代方案相比，使用GraphQL的学习曲线更陡。 编写基于GraphQL的前端应用程序的开发人员必须学习GraphQL语言的语法。实现GraphQL后端服务的开发人员不仅需要学习更多语言，还需要学习更多知识：他们必须学习实现GraphQL的API语法。他们还必须了解schemas 和resolvers，以及GraphQL运行时特有的许多其他概念。

​		在REST API中，这不是问题，因为它们没有客户端语言或需要任何标准的实现。你可以自由实现自己想要的REST endpoits，因为你不必解析，验证和执行特殊语言的文本。

## 总结

- 在现实世界中表示数据的最佳方法是使用图形数据结构。 数据模型是相关对象的图形。 GraphQL接受了这一事实。

- GraphQL系统具有两个主要组件：查询语言，数据API的使用者可以使用查询语言来请求其确切的数据需求；后端的运行时层，它发布一个描述数据模型功能和需求的公共模式。 运行时层在单个端点上接受传入的请求，并使用可预测的数据响应来解析传入的数据请求。 传入请求是使用GraphQL查询语言编写的字符串。

- GraphQL旨在优化客户端和服务器之间的数据通信。 GraphQL允许客户端以声明的方式查询他们所需的确切数据，它使服务器能够以标准方式聚合来自多个数据存储资源的数据。

- GraphQL有一个官方规范文档，该文档定义了GraphQL运行时的所有实现者都必须遵守的标准规则和实践。

- GraphQL服务可以用任何编程语言编写，并且可以在概念上分为两个主要部分：用表示API功能的强类型模式定义的结构，以及使用称为解析器的功能自然实现的行为 。

- GraphQL模式是具有类型的字段图。 该图表示可以通过GraphQL服务读取（或更新）的所有可能的数据对象。 GraphQL模式中的每个字段都由解析器函数支持。

- GraphQL及其以前的替代方案之间的区别在于，它提供了以可维护和可扩展的方式实现API功能的标准和结构。 替代方案缺乏这样的标准。 GraphQL还解决了许多技术难题，例如必须进行多次网络往返并在客户端上处理多个数据响应。

- GraphQL面临一些挑战，尤其是在安全性和优化领域。 由于它提供的灵活性，保护GraphQL API需要考虑更多的漏洞。 缓存灵活的GraphQL API也比缓存固定API端点（如REST API）要困难得多。 GraphQL的学习曲线也比许多其他选择更陡峭。

# 第2章 探索GraphQL API

## 2.1 GraphiQL编辑器

GraphiQL  

az.dev/swapi-graphql  -------》https://graphql.org/swapi-graphql

## 2.2 GraphQL语言基础

## 2.3来自GitHub API的示例

https://docs.github.com/en/graphql/overview/explorer

### 2.3.3 内省查询（Introspective queries ）



# 第3章 定制和组织GraphQL操作

## 3.1使用参数自定义字段

https://docs.github.com/en/graphql/overview/explorer

### 3.1.1标识要返回的单个记录

Listing 3.1 Using field arguments  

```json
query UserInfo {
  user(email: "jane@doe.name") {
    firstName
    lastName
    username
  }
}
```

某些GraphQL API甚至对系统中的每个对象都有一个记录字段。在GraphQL世界中，这通常称为Node interface ：由Relay框架（也起源于Facebook）推广的概念。

### 3.1.2限制列表字段返回的记录数

```json
query First10Repos {
  organization(login: "jscomplete") {
    name
    description
    websiteUrl
    repositories(first: 10) {
      nodes {
        name
      }
    }
  }
}
```

### 3.1.3 对列表字段返回的记录排序

```json
query orgReposByName {
  organization(login: "jscomplete") {
    repositories(first: 10, orderBy: {field: NAME, direction: ASC}) {
      nodes {
        name
      }
    }
  }
}

```

### 3.1.4 记录列表分页

### 3.1.5 查询和过滤

### 3.1.6 为变更提供输入

