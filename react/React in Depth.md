# React in Depth

源码：https://github.com/React-in-Depth/react-in-depth

```sh
git clone https://github.com/React-in-Depth/react-in-depth.git  

npm install

npm run dev -w chXX/YYY
```

P16

# 第1章 开发者指南：React 生态系统

本章内容涵盖  

- 理解 React 精通的概念  
-  探索 React 生态系统  
-  介绍 React 技术栈  
-  创建合适的 React 技术栈

欢迎来到《深入 React》！本书是开发者提升专业技能、紧跟 React 社区动态的重要指南。当你开启这段成长之旅时，请记住，掌握 React 不仅意味着理解基础知识，更要拥抱一系列高级方法论、最佳实践和不断演进的工具。

在本开篇章节中，我们将勾勒前方的探索版图。我会为你介绍 React 精通的概念，并引领你了解广阔的 React 生态系统。你将学习构成 React 技术栈的关键组件，同时初步了解这些元素如何相互作用以形成有效的解决方案。

尽管本章旨在奠定理解基础，但本书后续内容将带你更深入地探究如何为项目选择和打造合适的技术与库。通过将理论知识与实践见解相结合，我希望能为你提供必要的基础认知，助你以熟练的 React 开发者身份驾驭现代 Web 开发的复杂领域。 



## 1.1 开启 React 精通之旅

本书假定你已经扎实掌握了 React 知识，并能轻松构建简单应用程序。简单来说，你已经在图 1.1 中从 A 进展到了 B，而本书将带你从 B 前往 C。如图所示，在这一阶段的旅程中，你还有很多知识要学。 

当你达到 B 点时，你或许有能力获得一份初级或中级 React 开发者的好工作，甚至有可能从此晋升到高级水平。但为了加速你的进阶之路，更快地向前迈进，让我来为你介绍一下我所说的“React 精通”。

React 精通不仅仅是编写能运行的代码。它涉及理解最佳实践，设计具备可扩展性和可维护性的应用程序，以及在团队环境中高效协作。这需要对 React 及其生态系统有深入的了解，同时还要掌握构建现代 Web 应用程序的最新工具和技术。

从核心来讲，React 精通旨在构建易于理解、易于维护和易于扩展的应用程序，这意味着要编写干净、模块化的代码，这些代码能够轻松进行测试和重构。它意味着设计出能够满足不断增长的用户需求，同时又不牺牲性能或稳定性的应用程序。它还意味着与其他开发者协作，构建出能满足利益相关者和用户需求的应用程序。 

若想成为 React 大师，你需要对 React 的核心概念有扎实的理解，并且能够熟练使用各种库和工具。你要熟悉常见的设计模式和架构原则，还能将其应用于实际问题。此外，你也需要能在团队环境中高效协作，掌握版本控制系统和敏捷开发方法。

本书将教你所有这些内容。读完本书后，你将具备为各类规模、各个领域的组织构建、维护和协作开发高质量、可扩展的 React 应用的能力。

开篇章节会深入探讨本书存在的意义：为什么我认为这本书有必要诞生，以及你为什么需要阅读它。接着，我们会探讨生态系统和技术栈这两个在架构 React 应用时非常重要的概念。本章大部分内容将聚焦于生态系统，包括如何探索它、如何应用它，以及如何理解那些即便本书定稿（大概率会是纸质版，我觉得不太可能出版石刻版）之后仍必然会出现的新技术。

在本书其余部分，我们将探索成为 React 大师所需的关键概念和工具。我们会涵盖工具使用、强类型、数据管理、远程数据访问、单元测试和网站框架等主题。我们还会提供实际案例和真实场景模拟，帮助你在自己的工作中应用这些概念。那么，让我们开始踏上成为 React 大师的征程吧！ 

## 1.2 为何需要一本关于 React 精通的书？
实际情况是，目前有许多学习 React 的资源，比如优秀的书籍、在线教程以及官方文档。但这些资源中，很少有涉及使用 React 构建大型应用的实际操作方面的内容。

《深入 React》这本书旨在填补这一空白，提供全面的指导。无论你是希望提升 React 技能的前端开发者，还是正在构建复杂应用的全栈开发者，这本书都能为你提供有价值的内容。 

图1.2展示了造就一名全面发展的React开发者所需的关键知识领域。本书的独特之处在于涵盖了所有这些领域。

本书的一个主要目标是帮助你成为一名更高效、更出色的React开发者。我们将探讨一系列构建高质量React应用所必需的主题，从数据管理到测试再到网站框架。掌握这些主题后，你将能够开发出更具可扩展性、可维护性和健壮性的应用。

本书的另一个目标是提供团队环境中的实际工作指导。构建大型React应用需要与其他开发者、设计师和利益相关者协作。我们将介绍大型团队常用的编码规范和开发工具最佳实践，并引入TypeScript——一种越来越多团队采用的JavaScript新形态。

最后，本书旨在为持续学习和职业发展提供路线图。React生态系统在不断发展，新的工具和技术层出不穷。我将提供紧跟React最新发展动态的指导，并帮助你随着时间的推移提升技能。无论你是刚开始学习高级React，还是已经是有经验的开发者，本书都将助你更上一层楼。

## 1.3 本书如何助你掌握 React？

本书涵盖范围广泛，包含与 React 开发相关的多个主题：常与 React 搭配使用的库、数据管理、远程数据、单元测试、网站框架。我将详细讲解每个主题，为你提供应对实际项目所需的知识与技能。

本书重点在于实践操作。虽然我会提供各主题的一些背景知识和理论，但主要目标是帮助你通过实践来学习。每章包含一系列示例，全书最后包含三个复杂项目，让你能够应用所学知识，从零开始构建自己的 React 应用。

在本书中，我还会着重强调最佳实践以及需要避免的常见误区。我希望你不仅能更深入地理解 React，还能具备构建高质量、可维护应用的能力，从而应对实际开发中的各种挑战。你可以在图 1.3 中看到自己即将开启的学习之旅。



总体而言，本书旨在帮助你成为 React 开发领域的专家，为你配备所需的技能和知识，让你有信心从容应对任何项目。

## 1.4 React 生态系统

React 生态系统是由围绕 React 库构建的庞大库和工具集合。随着 React 的日益普及，开发者可用于提升工作流程、改进 React 应用性能与功能的工具和库数量也在不断增长。

使用 React 的一大显著优势就是可供选择的库数量极其丰富。这些库覆盖了从数据管理、路由到动画和测试等广泛的应用场景。其中许多库已成为 React 开发者工具包中的必备组件，理解它们的工作原理并掌握高效使用方法，是现代 React 开发的关键环节。

本书将深入探讨 React 生态系统中众多最流行、最实用的库和工具，内容涵盖从样式处理到状态管理等方方面面的库。

值得注意的是，并非 React 生态系统中的所有库都同等优秀，也不是每个项目都需要用到所有库。正因如此，我们将聚焦于最常用的库和工具，并指导你如何评估和选择最适合特定项目需求的库。

学完本书后，你将对 React 生态系统及其包含的各类库和工具有扎实的理解。你将能够自信地为项目选择合适的库，并具备构建复杂、高性能 React 应用所需的技能和知识。

### 1.4.1 生态系统包含哪些内容？

为了让你直观感受当前 React 生态系统的庞大规模，请参考图 1.4——该图列出了目前与 React 配套使用的 150 多种工具和库。

### 1.4.2 如何驾驭React生态系统

首先需要明确：你不需要掌握生态中的每一个工具（其实没人能做到，包括我本人）。但掌握所有工具类别及其用途，并了解每个类别中的典型技术，是非常有价值的。

实际开发中，你不会在每个项目里都用到所有类别的工具。但当遇到需要特殊功能的新项目时，提前了解整体生态布局会带来很大帮助。

建议培养逆向思维能力：当出现新技术时（这本书付印后马上就会出现，之后每周都会持续涌现），你要能快速分析其功能，并在脑海中定位到生态系统的对应位置。需要注意：同一类别的技术未必都是互相替代的关系。很多技术需要配合使用、相辅相成。一个项目可能同时使用某个类别下的多个工具——比如你完全可能在同一个项目中同时使用Jest（测试框架）、React Testing Library（React专用测试工具）、Puppeteer（无头浏览器测试工具）和Karma（测试运行器），它们都属于测试类别。

另一些时候，不同技术可能是直接竞争关系。例如Material UI和Ant Design就不适合同时选用，因为这两个UI组件库虽然实现方式不同但功能高度重叠，在应用中承担着基本相同的职责。不过对于大型项目，你可能会在不同模块使用不同库——这些库可能无法直接协作，但分开使用时至少不会产生严重冲突。

在评估新技术时，库如何组合在一起或独立运作的方式也是一个关键考虑因素。一项新技术可能会取代现有方案，例如zustand在数据管理类别中取代Redux（如果你想用zustand而不是Redux）。但它也可能是对现有库的新补充，例如Immer，它可以与zustand或Redux（或许多其他数据管理库）一起使用，因为它是一个用于在数据管理中编写更简单的不可变代码的工具，而不是完整的数据管理本身。

## 1.5 技术栈

在特定项目中使用的技术通常被称为该项目的"技术栈"、"解决方案栈"或简称"栈"。这是一个常用术语，你甚至可能在招聘信息或创业公司的网站中直接看到它被列出来。

我们将介绍"栈"这个概念的由来，前端React栈包含哪些内容，如何在加入现有项目时快速理解其技术栈，以及如何为新的应用程序创建自己的技术栈。

一个有趣的补充说明："技术栈"这个概念也是"全栈"一词的起源。全栈开发者指的是在特定项目中能够处理从前端到后端的整个技术栈的开发人员。

### 1.5.4 从零开始构建技术栈

为React项目选择合适的技术栈可能具有挑战性，因为生态系统中存在众多可选方案。本节将通过一些示例场景讨论选择技术栈组件时需要考虑的因素，并针对这些场景推荐具体的技术。

最重要的决策是确定应用程序的基础层。这个决策在开发后期最难更改（当然仍然可以改，所以不必过度纠结）。在这个基础之上，你可以逐步引入能以最简单方式解决特定痛点的技术。

在为新项目创建技术栈时，核心在于把握一个关键的平衡点：既看重熟悉度，也要接纳新技术。如果你的团队熟悉TanStack，那么即使某些其他数据获取库在技术上可能更适合某个新项目，也没必要更换。相比完全陌生的新库，团队在使用熟悉的库时工作效率会高得多。但另一方面，如果不主动挑战自我，团队就难以进步。随着技术逐渐过时或被淘汰，你将错失学习那些更新、更简单/更好/更快的替代工具的机会。

在这根平衡木上行走正是负责构建技术栈的团队架构师角色的核心所在。我们应该坚持使用已知技术，还是应该挑战自我？这些决策不仅仅存在于新项目诞生之时；它们会不断出现。有时，尽管引入新技术必然会带来成长之痛，你仍需用新技术替换技术栈中的现有技术，仅仅因为你必须与时俱进。让我们来看一些场景，看看如何通过良好的技术选择来解决这些问题。

**场景：中型电商平台**

你负责改造一个中型电商平台，以提升性能、可扩展性和用户体验。对于这类项目，你需要一个久经考验的技术栈，并希望快速推进开发。针对此类项目，一个不错的选择是我们称之为The Popular Stack的技术栈：

- Next.js作为基础框架

- RTK作为数据管理库

- TanStack作为数据获取库

- Material UI与MUI作为样式库

The Popular Stack提供了Next.js在服务端渲染方面的成熟可靠性、TanStack高效的数据获取能力、RTK专业的状态管理方案以及Material UI精心打磨的UI组件。该技术栈集成了提升平台速度和用户界面所需的所有工具，确保为用户提供卓越的购物体验。

**场景：个人作品集网站**
你是一名独立开发者，想要创建一个展示自身技能和项目的个人作品集网站。对于这类项目，你可以自由尝试各种技术，但同时也希望运用当下最新最优秀的工具，既能展现自己的技术实力，又能保持竞争优势。这类项目适用的技术栈会随时代不断变化，但其中一个可能的选择是我们称之为"The Indie Stack"的方案：

- Next.js作为基础框架
- Zustand作为数据管理库
- Tailwind CSS作为样式库

The Indie Stack非常适合这种场景。Vite提供极速的开发体验和极快的打包速度，Zustand简化了状态管理，Tailwind CSS则能实现快速且美观的样式设计。这个技术栈能让你高效且富有美感地展示自己的作品。

**场景：维护遗留企业级仪表盘**

你的团队负责维护一个使用旧技术构建的遗留企业级仪表盘。这类项目的技术栈是很久以前确定的，你只能继续沿用。由于项目规模庞大，将其重构为新架构几乎不可能。目前，你只能使用"传统技术栈"（The Old School Stack）：

- Create React App (CRA) 作为基础框架
- Redux 作为数据管理库
- Axios 作为数据获取库
- CSS Modules 作为样式库

传统技术栈凭借CRA的稳定性、Axios的数据获取能力、Redux的状态管理功能以及CSS Modules的可维护样式方案，仍然是一个不错的选择。它既能确保与现有代码的兼容性，又为逐步现代化改造留有余地。

**场景：金融服务类Web应用**
你正在为一家金融服务公司开发一个综合性的Web应用。针对这种情况，你需要一套值得信赖、安全可靠且具备良好扩展性的技术方案，同时还要确保不会引起高层管理人员的反对。选择"企业级技术栈"（The Enterprise Stack）准没错：

- 原生React + TypeScript作为基础框架
- Apollo作为数据获取与管理库
- Styled-components作为样式库

企业级技术栈通过以下组合确保金融交易处理的安全可靠与可扩展性：React与TypeScript结合提供强类型支持、Apollo负责管理复杂的数据获取与存储、
  styled-components实现一致且易于维护的样式方案。

**场景：协作式任务管理工具的快速原型开发**  

你的创业团队正在开发一款协作式任务管理工具，需要快速原型化核心功能以吸引潜在投资者和用户。这种情况下，你需要一套内置"魔法"（开箱即用功能丰富）、能轻松扩展且开发速度极快的技术方案——界面设计是否原创并不重要，因为速度、功能实现以及让早期投资者对进度满意，远比独特的用户界面更重要。推荐使用"原型开发技术栈"（The Prototype Stack）：  
- **Remix** 作为基础框架  
- **Supabase** 作为后端解决方案  
- **Stale-While-Revalidate (SWR)** 作为数据获取库  
- **Ant Design** 作为样式库  

该技术栈的优势在于：  **Remix** 提供快速的服务器端渲染能力  ,**Supabase** 支持高效的后端开发  ,**SWR** 实现可扩展的数据获取方案  ,**Ant Design** 呈现精致且功能丰富的用户界面  ,借助这套技术栈，你能迅速构建出功能完备的原型，向利益相关者展示产品的实际潜力。  
# 第2章 高级组件模式

建筑世界中的项目，无论是高耸入云的摩天大楼，还是宁静的邻里住宅，都遵循着一套普适的原则。无论工程规模大小，在建筑与施工领域，人们始终坚守一些核心的工程原理，这些原理包括设计承重结构、选择合适的材料，以及确保整体的稳定性和安全性。

在数字世界中，React 开发同样恪守着自己的一套构建原则。尽管外在的表现形式和所使用的具体“材料”可能有所不同，但其底层的架构原则却是恒久不变的。

在 React 中，与软件设计整体一样，这些原则体现在设计模式之中。本章将深入探讨现代 React 应用中使用的三个基础性设计模式：

- Provider  

- Composite  

- Summary  

就像实体建筑中的蓝图和承重结构一样，如图 2.1 所示，这些模式为构建稳定且可扩展的 React 项目提供了基础框架。

## 2.1 Provider 模式（The Provider pattern  ）

在本节中，我们将深入探讨 **Provider 模式**，这一模式是在你已经掌握的 React Context 知识基础上进一步构建的。我们会学习如何利用 Provider 模式来管理多个相关的值，例如状态值及其对应的状态设置函数（setters）。这种做法（如图 2.2 所示）相比基础的 React Context 使用方式是一个重要的进阶，它能在状态管理方面提供更强的灵活性和更高的效率。

图 2.2 展示了使用 **Provider 模式** 来管理多个相关值的初始步骤。图中呈现了一个基础的 Context 设置：其中 **Provider（浅灰色背景）** 将多个状态值（state values）及其对应的状态更新函数（updaters，以虚线框表示）封装在一起，从而让我们清晰地看到，如何基于 React Context 的常规用法进行扩展，以支持更复杂的场景。位于组件树中 Provider 下方任意层级的 **Context 消费者（Consumer，深灰色背景）**，即便嵌套得很深，仍然可以轻松访问到由 Context 提供的那些状态值和更新函数（通过虚线箭头表示）。这种方式大大提升了状态在组件树中传递的灵活性和便利性。

我们的探索过程是循序渐进的，旨在通过以下阶段引导你通过动手实践来深入理解并掌握相关内容：

- **处理多个值的 Context**  
  我们将从一个简单的示例入手，展示如何将子组件包裹在一个 Provider 中，这个 Provider 负责管理多个相关的状态值（state values）及其对应的状态更新函数（setters）。这一步骤是基础性的，它展示了如何将 React Context 的使用从单一数据点，扩展到能够承载多个相关数据的场景。

- **专用的 Context 管理组件**  
  接下来，我们会进一步优化实现方式，创建一个专门用于管理 Context 的组件。这种改进方式能够更好地应对管理多个状态层面时所带来的复杂性，同时也展示了一种更加结构化、更易于维护的方式来处理复杂的 Context 逻辑。

- **通过选择性订阅优化性能**  
  最后，我们将在 Provider 模式中引入 **“可选择性”（selectability）** 的概念，这是一种高级技巧，其核心目标是 **最小化不必要的组件重新渲染**，尤其是对于那些内容相对稳定的组件。通过有选择性地传递数据，我们可以显著提升 React 应用的运行性能。

通过本节的完整学习，你不仅会对 React Context 有更深刻的理解，还将通过实际编码掌握 **Provider 模式在复杂状态管理中的应用**。从基础实现逐步过渡到高级技巧的这一学习路径，将赋予你优化 React 应用的能力，确保它们既具备良好的性能表现，又拥有清晰的代码结构和可维护性。

### 2.1.1 发明一个 Provider

一种常见的做法是，将 **Context** 用作承载 **有状态值（stateful values）及其对应的状态设置函数（setters）** 的传递机制。假设我们有一个网站，它支持深色模式（dark mode）和浅色模式（light mode），并且在页面头部有一个按钮，可以在这两种模式之间切换。所有相关的组件都会读取当前的模式状态，并根据该状态值来调整它们的样式设计。

我们希望将两个内容放入状态中：一个用于表示当前是否处于深色模式的值（`isDarkMode`）；一个允许按钮在深色模式与浅色模式之间切换的函数（`toggleDarkMode`）。我们可以将这两个值组合成一个对象，然后把这个对象作为 **value** 放入 Context 中。图 2.3 展示了这个系统结构，我们将在代码清单 2.1 中实现它。

```jsx
import { useContext, useState, createContext, memo } from "react";

const DarkModeContext = createContext({});

function Button({ children, ...rest }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const style = {
    backgroundColor: isDarkMode ? "#333" : "#CCC",
    border: "1px solid",
    color: "inherit",
  };
  return (
    <button style={style} {...rest}>
      {children}
    </button>
  );
}

function ToggleButton() {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return <Button onClick={toggleDarkMode}>Toggle mode</Button>;
}

const Header = memo(function Header() {
  const style = {
    padding: "10px 5px",
    borderBottom: "1px solid",
    marginBottom: "10px",
    display: "flex",
    gap: "5px",
    justifyContent: "flex-end",
  };
  return (
    <header style={style}>
      <Button>Products</Button>
      <Button>Services</Button>
      <Button>Pricing</Button>
      <ToggleButton />
    </header>
  );
});

const Main = memo(function Main() {
  const { isDarkMode } = useContext(DarkModeContext);
  const style = {
    color: isDarkMode ? "white" : "black",
    backgroundColor: isDarkMode ? "black" : "white",
    margin: "-8px",
    minHeight: "100vh",
    boxSizing: "border-box",
  };
  return (
    <main style={style}>
      <Header />
      <h1>Welcome to our business site!</h1>
    </main>
  );
});

export default function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((v) => !v);
  const contextValue = { isDarkMode, toggleDarkMode };
  return (
    <DarkModeContext.Provider value={contextValue}>
      <Main />
    </DarkModeContext.Provider>
  );
}
```



> **注意：**  
> 在 React 19 中，创建 Context Provider 时，你可以通过 JSX 直接写成 `<MyContext value={...}>`，而不再需要显式地写成 `<MyContext.Provider value={...}>`。  此外，Context 的消费方式也有所变化，现在可以使用新的 `use()` 函数来替代传统的 `useContext()` Hook。  不过需要注意的是，这个新的 `use()` 函数 **并不是一个常规的 Hook**，因此 **它不受 Hook 规则的限制** —— 比如，你可以**有条件地调用它**。但需要强调的是，**它并没有提供任何额外的功能**，只是提供了一种不同的 API 风格而已。  除了这些细微的语法简化之外，**在 React 19 中创建和使用 Context 的核心逻辑与之前版本基本一致**。  在本书中，我将始终使用 **旧的语法（即 `<MyContext.Provider>` 和 `useContext()`）** 进行讲解。

这里有几个关键点需要注意：首先，是在 **列表 2.1 中定义 `<App />` 组件时，我们如何为这个 Context 提供了两个不同的属性（即 `isDarkMode` 和 `toggleDarkMode`）**；其次，是在 **定义 `<Main />` 组件时，我们如何对 Context Provider 内部的第一个子组件进行了记忆化（memoization）处理**。

这种 **记忆化处理非常重要**，因为我们的主 App 组件会在每次 Context 发生变化时重新渲染——而 Context 变化的时机正是每次深色模式标志（`isDarkMode`）被切换的时候（也就是状态更新时）。然而，我们并不希望仅仅因为 Context 更新，就导致其他所有组件也都跟着重新渲染。在这个例子中，**`<Main />` 组件会消费（consume）这个 Context，所以它确实会在每次 Context 更新时重新渲染**；但是，**`<Header />` 组件并没有消费这个 Context，因此它不应该重新渲染**。得益于我们使用了记忆化技术，它确实没有重新渲染 —— 这正是我们想要的效果。

而且，这还不是终点。我们还可以 **在 Context 的 value 中放置大量的属性和函数**，以方便在应用的各个部分共享状态和行为。

### 2.1.2 创建一个专用的 Provider 组件

列表 2.1 中的深色模式应用的前一版是完全可用的，但我们还可以做得更好一些。主应用组件目前包含了状态值、切换函数以及 Context Provider，显得有些臃肿，所以我们来清理一下代码结构。我们将不再使用之前的那种写法，而是进行如下优化……

```jsx
export default function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((v) => !v);
  const contextValue = { isDarkMode, toggleDarkMode };
  return (
    <DarkModeContext.Provider value={contextValue}>
      <Main />
    </DarkModeContext.Provider>
  );
}
```

假设我们有如下代码：

```jsx
export default function App() {
  return (
    <DarkModeProvider>
      <Main />
    </DarkModeProvider>
  );
```

首先，第二个组件的写法要优雅得多。我们把关于实际上下文内容的逻辑从主应用中移除了，但同时我们还获得了一个额外的好处：这个新的 `<App />` 组件不包含状态，因此它永远不会重新渲染。由于它永远不会重新渲染，它也永远不会导致 `<Main />` 组件重新渲染。（**包含在<DarkModeProvider>中，当父组件重新渲染时，子组件还是会重新渲染的**）

之前，`<App />` 是一个有状态的组件，会导致 `<Main />` 组件重新渲染，因此我们不得不使用 `memo()` 包裹 `<Main />` 来避免不必要的重渲染。但现在我们不需要这么做了。另外，我们还可以做的一个额外优化是简化这些调用：

```jsx
const ... = useContext(DarkModeContext);
```

我们可以创建一个自定义 Hook，用来返回 Context 中的内容，这样这一行代码就可以变成：

```jsx
const ... = useDarkMode();
```

通过这两处改动，我们得到了如下代码清单中的结果。

```jsx
import { useContext, useState, createContext, memo } from "react";

const DarkModeContext = createContext({});

function Button({ children, ...rest }) {
  const { isDarkMode } = useDarkMode();
  const style = {
    backgroundColor: isDarkMode ? "#333" : "#CCC",
    border: "1px solid",
    color: "inherit",
  };
  return (
    <button style={style} {...rest}>
      {children}
    </button>
  );
}

function ToggleButton() {
  const { toggleDarkMode } = useDarkMode();

  return <Button onClick={toggleDarkMode}>Toggle mode</Button>;
}

const Header = memo(function Header() {
  const style = {
    padding: "10px 5px",
    borderBottom: "1px solid",
    marginBottom: "10px",
    display: "flex",
    gap: "5px",
    justifyContent: "flex-end",
  };
  return (
    <header style={style}>
      <Button>Products</Button>
      <Button>Services</Button>
      <Button>Pricing</Button>
      <ToggleButton />
    </header>
  );
});

function Main() {
  const { isDarkMode } = useDarkMode();
  const style = {
    color: isDarkMode ? "white" : "black",
    backgroundColor: isDarkMode ? "black" : "white",
    margin: "-8px",
    minHeight: "100vh",
    boxSizing: "border-box",
  };
  return (
    <main style={style}>
      <Header />
      <h1>Welcome to our business site!</h1>
    </main>
  );
}

function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((v) => !v);
  const contextValue = { isDarkMode, toggleDarkMode };
  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  return useContext(DarkModeContext);
}

export default function App() {
  return (
    <DarkModeProvider>
      <Main />
    </DarkModeProvider>
  );
}
```

### 2.1.3 避免渲染所有内容

在前面的示例中，上下文提供者（Context provider）存在一个小小的次优问题：当该上下文中的任何值发生变化时，所有消费该特定上下文的组件都会重新渲染。之所以会出现这种情况，是因为现在我们的上下文是一个包含多个属性的复杂对象，但 React 并不在意具体是哪个属性发生了变化；它只知道上下文的值整体发生了改变，因此每一个使用该上下文的组件都会被重新渲染。

然而，我们的切换组件（toggle component）却永远不需要重新渲染，因为它使用了一个可以被记忆化的函数，这个函数是完全稳定的。原因在于 toggleDarkMode 函数并不依赖于上下文的当前值。遗憾的是，我们无法告诉 React 只在上下文的某些特定属性更新时才重新渲染某个特定的组件。至少目前我们还做不到这一点。这个功能原本预计会随 React 19 的测试版推出，但最终并未实现；希望它能在未来的更新中到来。

如果我们想要避免每个上下文消费者都因不必要的上下文变化而重新渲染，我们就需要使用外部库。其中一个这样的库叫做 use-context-selector，它允许我们不必每次都使用整个上下文。相反，我们可以指定我们感兴趣的上下文的特定属性（即选择相关的属性——这也是该库名称中“selector”部分的由来）。然后，只有当该特定属性发生变化时，React 才会重新渲染我们的组件。

为了正确使用 use-context-selector 包，我们还需要使用该包来创建我们的上下文（Context）。我们不能使用 React 包中通过 createContext 创建的常规上下文，而是必须使用 use-context-selector 包提供的 createContext 函数。用于访问上下文的自定义 Hook 接受一个选择器函数（selector function），如下所示：

```javascript
function useDarkMode(selector) {
  return useContextSelector(DarkModeContext, selector);
}
```

我们将这个新参数 selector 直接传递给 useContextSelector Hook。这个自定义 Hook 仍然有其意义，因为它避免了每次都要显式引用上下文。接下来，让我们在下面的代码清单中实现这个经过更新、更优化的深色模式切换网站版本。

```jsx
import { useState, useCallback, memo } from "react";
import {
  createContext,
  useContextSelector,
} from "use-context-selector";

const DarkModeContext = createContext({});
function Button({ children, ...rest }) {
  const isDarkMode = useDarkMode((ctx) => ctx.isDarkMode);
  const style = {
    backgroundColor: isDarkMode ? "#333" : "#CCC",
    border: "1px solid",
    color: "inherit",
  };
  return (
    <button style={style} {...rest}>
      {children}
    </button>
  );
}

function ToggleButton() {
  const toggle = useDarkMode((ctx) => ctx.toggle);
  return <Button onClick={toggle}>Toggle mode</Button>;
}

const Header = memo(function Header() {
  const style = {
    padding: "10px 5px",
    borderBottom: "1px solid",
    marginBottom: "10px",
    display: "flex",
    gap: "5px",
    justifyContent: "flex-end",
  };
  return (
    <header style={style}>
      <Button>Products</Button>
      <Button>Services</Button>
      <Button>Pricing</Button>
      <ToggleButton />
    </header>
  );
});

function Main() {
  const isDarkMode = useDarkMode((ctx) => ctx.isDarkMode);
  const style = {
    color: isDarkMode ? "white" : "black",
    backgroundColor: isDarkMode ? "black" : "white",
    margin: "-8px",
    minHeight: "100vh",
    boxSizing: "border-box",
  };
  return (
    <main style={style}>
      <Header />
      <h1>Welcome to our business site!</h1>
    </main>
  );
}

function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggle = useCallback(() => setDarkMode((v) => !v), []);
  const contextValue = { isDarkMode, toggle };
  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode(selector) {
  return useContextSelector(DarkModeContext, selector);
}

export default function App() {
  return (
    <DarkModeProvider>
      <Main />
    </DarkModeProvider>
  );
}

```

最终得到的网站与之前功能完全相同，但现在 ToggleButton 组件永远不会重新渲染，因为它只使用了来自上下文的一个稳定值。由于该上下文值从未发生更新，因此没有必要重新渲染该组件。而另外两个监听上下文中 isDarkMode 标志的组件，在该标志每次更新时仍会重新渲染，因为在这两个组件的 useDarkMode Hook 中，我们选择了该具体的属性。

### 2.1.4 使用 recontextual 工具创建类型优美且可选择上下文

在前面的示例中，我们只使用了 JavaScript，而没有使用 TypeScript。关于 TypeScript，我将在第 5 章、第 6 章以及后续章节中详细讨论。目前，我只想说，其中一些模式在以优雅的方式进行类型定义时相当棘手。

为了使可选择上下文更易于进行类型定义，我创建了一个小型包 recontextual，它封装了 use-context-selector，并提供了一种简单的方式来创建类型良好且可选择上下文，同时只需最少的类型定义工作。在不深入过多细节的情况下，让我们看看以下示例中，使用这个新库时，TypeScript 中的暗黑模式应用是什么样子的。

### 2.1.5 Provider 模式有多实用？

Provider 模式看似只是一个微不足道的模式，可能仅在某些功能上使用起来比较聪明，但实际上它的作用远不止于此。你可以将这单一模式贯穿整个大型应用程序，作为在整个应用中分发和组织数据和功能的唯一方式。

你的应用可以拥有数十个位于不同层级、相互叠加工作的上下文，为应用的某部分或整体提供全局和局部功能。比如，你可以在一个上下文中管理用户授权信息（包括当前用户信息）以及登录和登出方法；在另一个上下文中存放应用数据；还可以在第三个上下文中管理控制 UI 的数据。

如果使用得当，这个模式将成为你 React 工具箱中最强大的工具之一，因为它几乎适用于所有类型的应用。在后续几章中，当我们构建更复杂的应用时，你会多次看到这个模式的使用。Provider 模式极其通用，具有足够的灵活性以适应任何场景，同时又足够可定制，能够满足多种架构需求。

## 2.2 组合模式（The Composite pattern  ）

在本节中，我们将深入探讨 React 中的复合组件（composite components），揭示它们如何帮助我们构建可扩展且易于维护的用户界面。你可以在图 2.5 中看到复合模式的高层概览。



作为一个关键案例，我们将研究单选按钮组（radio group）组件的演进过程。这个例子将展示它从单一组件发展为复合结构的过程，并突出每个阶段所面临的挑战与带来的好处。单选按钮组从一个简单的 UI 元素开始，逐渐变得复杂，是展示复合组件需求与应用的一个理想示例。以下列表详细说明了我们在探索该模式的优点和用例时将经历的步骤：



到本节结束时，你将对 React 中的复合组件有一个全面的理解，并掌握重构和优化自己应用的知识。单选按钮组的示例将为你提供一个蓝图，帮助你识别何时以及如何从单一组件过渡到复合组件，从而提升应用的可扩展性以及你的开发效率。

### 2.2.1 简单的开端

### 2.2.2 复杂性增加

总结这段新代码，我们发现自己正处在一个功能丰富但已濒临复杂边缘的领域中。每一个选项如今都自成一个包含众多属性和条件的小世界，为 RadioGroup 带来了其独特的风格。曾经简洁明了的组件已经演变为一个更加动态的实体，能够处理图标、受欢迎程度指示器、附加费用，甚至还有条件详情。

尽管该组件能够应对这种日益增长的复杂性，但它也在进行着一种平衡。JSX 的简洁性被丰富的 JavaScript 逻辑所取代——组件的个性与特色大多不再体现在 JSX 本身，而是在定义选项的准备阶段就已经确定。这种从以 JSX 为主导的结构向以 JavaScript 逻辑为主的重心转移，体现了 React 灵活性的一个关键方面，但也凸显了在设计时需要谨慎权衡的重要性。作为开发者，我们必须不断在功能丰富性与代码清晰度、可维护性之间进行权衡。

本质上，我们与 RadioGroup 组件共同经历的这一阶段，正是整个软件开发过程的一个缩影。它反映了**简洁与复杂之间的拉锯战，也体现了添加功能与保持代码清晰之间的持续权衡**。随着我们不断深入，对一种更结构化方法的需求——一种能够优雅应对复杂性的方式——变得越来越明显。而正是在这样的背景下，**复合组件（composite components）悄然登场，它们早已蓄势待发，准备为构建 React 组件引入一种全新的范式**。

### 2.2.3 理想的 JSX 写法  

如果我们不通过 JavaScript 数组来定义选项，而是将每个选项作为子组件传递给 RadioGroup，然后在这些子组件内部处理选项的所有复杂性呢？这样，我们就能回归到 React 中更理想的方式：**在 JSX 中（而非 JavaScript 中）处理结构、数据和内容**，这也是我们在 React 开发中通常采用的模式。  理想情况下，我们可以这样定义 RadioGroup：

### 2.2.4 使用复合组件的实现方式

你可能会思考该如何实现这个示例。有两点应该很明确：我们需要将信息从 RadioGroup 传递给每一个选项，同时还需要将信息从某个选项传递给其内部的详情组件（如果有的话）。  

实现这些通信的方式有多种，但最简单的解决方案是为每条信息流使用一个 **React Context**。你可以在图 2.8 中看到所需的信息传递流程。



ch02\radio-composite\src\radiogroup\RadioGroup.jsx

```jsx
import { useState } from "react";
import { RadioGroupContext } from "./contexts";
import { Option } from "./Option";
import { Details } from "./Details";

export function RadioGroup({ children, name, onChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const contextValue = {
    name,
    selectedValue,
    onChange: handleChange,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <RadioGroupContext.Provider value={contextValue}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}
//将组成组件作为主组件的属性重新导出，这样我们只需一次导入即可使用整个单选组。
RadioGroup.Option = Option;
RadioGroup.Details = Details;
```

通过这段代码，我们现在定义了所有的组件，并且每个组件都比之前那个复杂示例中的单一组件要简单得多——在那个旧例中，单个组件承担了所有的职责。**组合模式（Composite Pattern）的美妙之处在于，它允许不同的功能模块像一支和谐的交响乐团一样协同工作：每个功能都封装在自己独立的组件中，却又能够无缝地共同运作。**这种模块化的设计方式不仅让代码更加直观、更易于管理，同时也提升了代码的可扩展性。在这种新的架构下，每个组件只负责单选组行为中的一个特定方面，我们从原本那种庞大而僵化的单体结构，转变为了一种灵活且可扩展的架构。

在这个新模式中：**RadioGroup 扮演着指挥的角色**，通过上下文（Context）来协调数据与事件的流动；每个 **Option 和 Details 组件** 则各司其职，承担自己专注的职责；**RadioGroupContext 优雅地管理着选项之间共享的状态和行为**，确保用户获得连贯一致的体验；而 **RadioOptionContext 则提供了一个直接通向 Details 组件的通信通道**，使得我们能够根据选中状态动态渲染对应的内容。这种设计思路不仅清晰分离了关注点，还充分利用了 React 的组件化与上下文机制，实现了高内聚、低耦合的优质架构。

最终得到的 **RadioGroup 组件** 不仅功能丰富，而且使用起来和扩展起来都非常愉快。这正体现了将复杂界面拆分为多个更小、更易管理的组件——每个组件都有明确职责——所带来的强大力量。这种方式不仅简化了开发和维护工作，还为更具创意和复杂性的 UI 设计打开了大门，同时还能保持代码库的整洁与易懂。从最初的混乱与困惑，到如今的清晰与优雅，这一转变过程充分展现了 **组合模式（Composite Pattern）** 在 React 开发中所具有的变革性力量。

### 2.2.5 组合模式有多实用？

组合模式乍看之下可能只是组织组件的一种结构性便利手段，但它在 React 开发中的实用性远不止于此。该模式不仅仅是一种编写更清晰代码的工具，更是构建可扩展、可维护应用程序的一项基础策略。在大规模应用中，组合模式可以成为管理复杂组件层级结构的关键，从而实现模块化、灵活的架构。

试想你的应用程序是由一系列相互关联的组件构成的集合，每个组件都承担着特定的职责。借助组合模式，你可以通过以不同方式组合这些组件来构建复杂的用户界面，每个组件都像一块积木。例如，一个复杂的表单可以由各种输入组件、验证消息和控制按钮组成，它们各自独立定义，但却作为一个协调统一的整体协同工作。

有些开发者可能更倾向于使用直接的父子关系或其他状态管理技术来组织组件结构。然而，组合模式提供了一种更高层次的抽象和灵活性，这是其他方法通常所缺乏的。通过将子组件与其父组件解耦，组合模式使得各个组件更易于复用，也更容易单独修改。

当 UI 组件需要以多种方式进行复用和重组时，该模式便能大显身手，因而成为你 React 工具箱中不可或缺的利器。对于任何希望构建复杂、健壮的 Web 应用的 React 开发者来说，理解何时以及如何有效运用组合模式至关重要。

## 2.3 概要模式（The Summary pattern  ）

好的，让我们深入探讨第三个也是最后一个 React 设计模式：**概要模式（Summary Pattern）**。别被它看似简单的外表所迷惑；这个模式可是改变游戏规则的存在。它能让 React 组件更加简洁高效，尤其适用于 JSX return 语句之上的部分。可以把概要模式看作是一种巧妙的代码整理技巧，通过将逻辑封装进自定义 Hook 来让代码变得井井有条。使用这个模式，就像是为你的组件做了一次“整容手术”，让它看起来更精炼、更高级。而且，你的团队伙伴也会因此感谢你，因为这大大提升了协作的便捷性。

接下来就到了有趣的部分。我们将通过两个示例来展示概要模式的强大与便利。首先，我们会看到**单个自定义 Hook 是如何在简化组件方面发挥奇效的**，让一切变得轻松愉快，就像周日的早晨一样惬意。这个例子将向你展示，一个精心设计的 Hook 是如何让你的组件在视觉和功能上都更上一层楼。

接着，我们会进入一个更复杂的场景，其中会用到**两到三个自定义 Hook**。概要模式在这种复杂情况下展现出了它的真正实力。将逻辑拆分到多个 Hook 中，不仅能让你的组件结构更加清晰，还能带来更高的可复用性与灵活性，开启全新的开发体验。

图 2.9 是你直观了解 **概要模式（Summary Pattern）** 如何将传统组件结构转变为更精致、更高效的视觉指南。这个模式就像是 React 组件的“前后对比图”——清晰展现了优化前后的差异。那么，让我们继续深入，看看这个看似简单的模式是如何对你的 React 开发产生深远影响的。

<img src="React in Depth.assets/image-20250915121721244.png" alt="image-20250915121721244" style="zoom:50%;" />

图 2.9 以一个简洁的图表展现了 **概要模式（Summary Pattern）** 的精髓。  在应用该模式之前，组件的结构通常是：在 JSX 渲染代码之前有一大段逻辑代码，然后紧接着是 JSX 部分。  而在应用概要模式之后，组件变得更加简洁：在 JSX 之前只保留少量关键代码，其余的逻辑都被抽离并封装进了一个专门为该组件定制的自定义 Hook 中。

### 2.3.1 单个自定义 Hook

### 2.3.2 更多复杂度带来更好效果

让我们来看一个更复杂的组件，它依赖更多内容，并使用了更多的常规 Hook。这次，我们要构建一个用户资料组件；用户可以查看和编辑自己的用户数据，还可以更新他们的偏好设置（例如主题和通知）。最终效果如图 2.10 所示。（请想象它看起来很美观，带有一些专业的样式。）



这个组件短多了！我们将组件文件的行数从 58 行减少到了 34 行（忽略空行）。虽然我们确实增加了一个额外的文件，因此总行数有所上升，但每个文件都更短小精悍，功能单一明确——这是一个巨大的改进，也让组件更加清晰整洁。最棒的是，如果你是一位经验丰富的开发者，你甚至可能都不需要查看 useUserProfile 这个 Hook 的内部实现，因为根据它的返回值以及这些返回值的使用方式，你就能一眼明白它的作用——在代码审查的拉取请求中，这简直就是“LGTM”（Looks Good To Me，即“我觉得没问题”）的典范！

### 2.3.3 需要多个 Hook



### 2.3.4 汇总模式有多实用？

总结来说，**汇总模式（Summary pattern）**因其能够简化和组织 React 组件而脱颖而出。通过探索其在单个或多个自定义 Hook 中的应用，我们可以看到，这种模式是提升代码清晰度和可维护性的关键手段。

该模式的强大之处在于其灵活性与可扩展性。无论是通过一个简单的 Hook 来简化组件，还是协调多个 Hook 来应对更复杂的场景，它都能为管理组件逻辑提供量身定制的解决方案。这一模式不仅让代码更加简洁，还培养了复用性思维，使其在需要高度一致性的更大规模项目中显得尤为宝贵。

简而言之，汇总模式或许并不张扬，但它对创建高效、易管理的 React 应用所做出的贡献是不可否认的。它体现了这样一个原则：真正有效的解决方案，往往就藏在简洁与合理组织之中。

## 总结

- 有效的软件开发反映了建筑的核心原则，强调稳定性、结构性以及适当模式的使用。
- React 中的 Provider 模式集中并简化了数据管理，使其在复杂应用程序的全局状态控制中不可或缺。
- 通过使用 Provider 模式，React 开发人员可以高效地在组件层次结构中传递数据和函数，增强了组织性和功能性。
- React 中的组合模式（Composite pattern）提供了一种管理复杂 UI 结构的策略性方法，能够实现模块化和灵活的组件架构。
- 采用组合模式可以实现动态且复杂的 UI 设计，促进组件的重用性和结构完整性，提升 React 项目的可维护性。
- React 中的总结模式（Summary pattern）旨在通过将逻辑抽象到自定义 Hook 中来减少代码杂乱，从而产生更简洁、更易维护的组件。
- 实施总结模式可以增强 React 组件的可读性和可扩展性，有助于提高开发效率并促进团队协作的编码实践。
- 在 React 开发中，遵循如 Provider、Composite 和 Summary 等基础设计模式，确保了稳健且创新应用的创建。
- 掌握这些 React 设计模式为开发人员提供了构建多样且稳定的数字结构的工具，类似于物理建筑中的构造。

# 第3章 优化 React 性能

## 3.1 理解 React 渲染

要优化 React 渲染，我们首先需要理解它。一个函数组件会由于以下三种原因之一进行渲染：

- 组件刚刚被挂载。（它之前不在组件树中，现在加入了组件树。）
- 父组件刚刚重新渲染。
- 组件使用了某个 Hook，该 Hook 触发了此组件的重新渲染。

就是这样。如果以上三种情况都没有发生，你的组件将不会重新渲染，这是可以保证的。如果其中任何一种情况发生，组件一定会重新渲染。不过，React 可能会在多个事件发生后进行批量渲染。例如，如果一个状态值发生了变化并且父组件重新渲染，组件可能会重新渲染一次，也可能会渲染两次。这个过程由 React 控制，取决于一些微妙的时间细节。

你现在应该对这些内容有了比较好的理解，基于你对 React 的基础知识，所以我不会详细展开讨论。但我会讨论一些与此相关的误解。特别是，我将介绍以下两个常见的误区：

- **误区一**：React 会在属性改变时重新渲染组件。技术上来说，这个说法不准确，而这个技术细节非常重要。
- **误区二**：在 React 18 的严格模式（Strict Mode）中，React 会两次挂载每个组件。实际上情况稍有不同。

让我们讨论这两个误区，因为它们非常重要。

### 3.1.1 改变属性是无关紧要的

在 React 开发圈中有一个常见的误解，认为组件会因为属性（props）的变化而重新渲染，但实际上并非如此。我们可以通过两种方式来证明这一点：

- 我们可以创建一个属性发生变化但不会重新渲染的组件。
- 我们也可以创建一个多次使用相同属性渲染却每次都重新渲染的组件。

这两种情况都很容易想象。首先，我们需要一个能够清楚显示它是否重新渲染的组件。接下来，我们可以创建一个这样的组件，如以下代码所示。

## 3.2 通过最小化重新渲染来优化性能

**什么是记忆化**

**记忆化（Memoization）**是一种优化技术，它通过记住纯函数的上一次输入和输出来避免重复计算。如果下一次调用该函数时，输入与上次相同，记忆化会直接返回之前计算的结果，而不需要再次执行函数。

记忆化的关键是它仅适用于**纯函数**，即返回值完全取决于其输入，而不依赖任何外部信息或随机性。

虽然记忆化可以被看作是一种缓存，但与传统缓存不同，缓存通常存储多种输入和输出的对应关系，而记忆化通常只记住**最近一次**函数调用的输入和输出，随后比较下一次调用的输入是否相同，若相同则复用上次的结果。

在 React 中，有一个 `memo()` 函数可以用于记忆化组件，但它不适用于非组件的函数。如果你想记忆化常规函数（不仅限于 React 组件），可以使用像 `memoizee` 这样的包。例如：

```javascript
import memoize from 'memoizee';

const rawAddition = (a, b) => a + b;
const addition = memoize(rawAddition);
```

在这个例子中，如果多次调用未记忆化的函数 `rawAddition()`，即使传入相同的值，每次都会重新进行计算。但如果调用记忆化的 `addition()` 函数，并传入相同的值，则计算只会在第一次执行，随后相同的输入会直接返回缓存的结果，而不再进行重复计算。这可以大大提高性能，尤其是在处理计算密集型操作时。

### 3.2.1 Memoize a component  

我之前提到过一个你可能会觉得有点奇怪的现象：当一个组件渲染时，它的所有子组件也会重新渲染，无论它们是否发生了变化。这种强制性的子组件渲染包括那些完全自包含、不接收任何属性、只渲染一段静态 JSX 的子组件。此外，即使给接收属性的组件传入相同的属性值，它们仍然会重新渲染。

我们可以使用 React 模块中的 `memo()` 函数来对整个组件进行记忆（缓存）。这样，如果该组件再次以相同的属性（或没有属性）被调用，它就不会再次渲染，而是直接使用之前已经计算好的结果。

在这种情况下，React 会对你的组件与浏览器文档对象模型（DOM）之间的协调过程进行优化，并意识到并没有生成新的信息，因此甚至不需要将 DOM 与 JSX 进行比较。React 知道，由于 JSX 不仅仅是相似，而是完全相同，所以 DOM 已经是正确的了。这样的优化可以节省大量时间！

让我们创建一个待办事项应用程序，允许用户添加待办事项。当用户在输入框中输入内容时，我们将更新要添加的待办事项标题的内部状态。这种方式在受控输入框中很常见，但会导致大量的重新渲染。在我们的第一次尝试中，我们将实现一个**未使用记忆化（memoization）**的待办事项应用。

### 3.2.2 记忆化组件的部分内容

在前一节中，列表项是在一个单独的组件中渲染的，因此我们有一个便利的选择，即对整个组件进行记忆化处理。但我们并不总是有这个选择。有时，相关的 JSX 部分跨越了多个组件。

假设我们没有使用一个单独的 `Items` 组件，而是直接在 `Todo` 组件中渲染列表项。那我们该怎么办呢？

我们可以采取两种方法：

- 将组件中经常不变的部分提取到一个新的、独立的组件中，并对该组件进行记忆化处理，这实际上就直接回到了第 3.6 节的示例。
- 使用 `useMemo` 钩子直接在父组件中对 JSX 进行记忆化处理，如下一节所示。

```jsx
import { useMemo, useState } from "react";

function Todo() {
  const [items, setItems] = useState(["Clean gutter", "Do dishes"]);
  const [newItem, setNewItem] = useState("");
  const onSubmit = (evt) => {
    setItems((items) => items.concat([newItem]));
    setNewItem("");
    evt.preventDefault();
  };
  const itemsRendered = useMemo(
    () => (
      <>
        <h2>Todo items</h2>
        <ul>
          {items.map((todo) => (
            <li key={todo}>{todo}</li>
          ))}
        </ul>
      </>
    ),
    [items]
  );
  const onChange = (evt) => setNewItem(evt.target.value);
  return (
    <main>
      {itemsRendered}
      <form onSubmit={onSubmit}>
        <input value={newItem} onChange={onChange} />
        <button>Add</button>
      </form>
    </main>
  );
}

function App() {
  return <Todo />;
}

export default App;
```



### 3.2.3 Memoize properties to memoized components  

```jsx
<Items
  items={items}
  onDelete={(item) => setItems((ls) => ls.filter((i) => i !== item))}
/>
```

由于这个函数是在 JavaScript 中内联定义的，因此每次渲染都会创建一个新函数。你可能会认为每次渲染时它是同一个函数，因为每个函数的定义都相同，但这并不是 JavaScript 的工作方式。在使用记忆化时，每次渲染都传递新的属性是不可行的。为了让记忆化生效，我们的值必须在引用上是相同的。因此，需要将这个回调函数进行记忆化。使用专门为此目的设计的 `useCallback` 钩子是更好的选择。请参见以下代码示例。

```jsx
// Todo component
const onDelete = useCallback(
    (item) => setItems((list) => list.filter((i) => i !== item)),
    []
  );

<Items items={items} onDelete={onDelete} />

// Items component
const Items = memo(function Items({ items, onDelete }) {
  return (
    <>
      <h2>Todo items</h2>
      <ul>
        {items.map((todo) => (
          <li key={todo}>
            {todo}
            <button onClick={() => onDelete(todo)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
});
```



通常，当你开始对组件进行记忆化时，就会发现对属性进行记忆化也是必要的。属性记忆化主要针对内联创建的对象和数组，尤其是对函数更为重要，这也是 `useCallback` 钩子存在的主要原因以及在 React 中频繁使用的原因。

记忆化并不是等到项目末期、发现应用程序有些缓慢时才进行的工作。记忆化是在开发过程中就应该执行的，以确保平稳、优化的用户体验。使用本节中介绍的工具，你应该能够将这个示例应用于自己的项目中。

同时，过早优化也会带来问题。如果你优化了那些运行良好的部分，最终可能适得其反。调用优化函数本身会带来轻微的运行时开销，如果这些优化无法加速应用，反而会使其变慢。

如果你是新手开发者，不要过早优化。但如果你清楚自己在做什么，当你预测到优化会有所影响时，可以进行记忆化。

### 3.2.4 深入了解记忆化钩子

在本节中，我将详细介绍两个记忆化钩子的使用场景和最佳实践。简单来说，你可以使用 `useMemo` 来记忆化任何值，使用 `useCallback` 来特别记忆化函数。但什么时候应该进行记忆化？如何确保在必要时值能够正确更新？

**使用 `useMemo` 记忆化任何值**

这个钩子在渲染之间记忆化值，主要用于两个目的（也可以同时用于这两个目的）：

- 防止代价高昂的重新计算
- 保持引用相等

`useMemo` 接收一个函数和一个依赖项数组。如果自上次渲染以来依赖项数组中的任何值发生了变化，该函数就会执行，且函数的返回值将作为 `useMemo` 的返回值。如果自上次渲染以来依赖项数组中的值没有发生变化，那么 `useMemo` 会返回上一次渲染时的值（见图 3.4）。

**使用 useCallback 记忆化函数** 

useCallback 是 React 内置的最不必要的一个钩子之一，因为它只是 useMemo 的一个简单扩展。如果用 useMemo 来记忆化一个函数，它和 useMemo 做的事情是一样的。useCallback 完全可以用 useMemo 来定义，就像下面这样：

```javascript
function useCallback(fn, deps) {
  return useMemo(() => fn, deps);
}
```

这个定义甚至直接写在了 React 的官方文档中。那么为什么这两个钩子都存在呢？useCallback 用于创建具有引用相等性需求的记忆化回调函数，而它从来不是用来避免昂贵计算的。回调函数通常是在组件体内内联定义的，如下所示：

```jsx
const handleClick = useCallback((evt) => {
  // handle evt and do stuff
}, []);
```

如果我们想使用 useMemo 来定义同样的记忆化函数，可以这样做：

```jsx
const handleClick = useMemo(
  () => (evt) => {
    // handle evt and do stuff
  },
  []
);
```

第二行中的双箭头语法很容易被忘记——而一旦忘记，就会改变代码的含义。我们原本希望将一个函数赋值给 handleClick，但如果忘记了双箭头，实际上我们赋值的是调用该回调函数的结果，而这个结果很可能是 undefined，因为我们很少在事件处理函数中返回任何值。尽管这个钩子只能实现 useMemo 所能做的一部分功能，但在本书后续内容中，我们将更多地使用 useCallback 而非 useMemo，因为我们记忆化函数的频率要高于其他类型的值。



## 3.3 理解依赖数组  

我们之前已经多次使用依赖数组来控制各种钩子在何时触发。对于副作用钩子（effect hooks），我们会使用依赖数组。在副作用钩子中，空数组表示该钩子仅在组件挂载时运行，而非空数组则表示该钩子会在组件挂载时以及每次所列依赖项更新时运行。我们也对记忆化钩子（memoization hooks）使用依赖数组；例如，通过使用空依赖数组，我们可以创建稳定的值。

但在实际使用中，依赖数组是如何工作的呢？你应该如何在依赖数组中指定正确的元素？又如何确保这些依赖项不会过于频繁地更新？

首先，让我们重申一下哪些钩子使用这些依赖数组来定义它们应该在何时生效：useEffect、useCallback、useMemo 和 useLayoutEffect。这四个钩子，且只有这四个钩子，使用依赖数组来有条件地触发它们的副作用和/或执行。

依赖数组大致可以分为三类：完全不指定数组、指定空数组，或者指定非空数组。以下是对这三类情况的示例说明：

```jsx
useEffect(() => { ... });
useEffect(() => { ... }, []);
useEffect(() => { ... }, [id]);
```

如果你没有指定依赖数组，那么无论钩子内部（如果有的话）哪些值发生了更新，该钩子都会在每次渲染时都被触发。如果你指定了一个空数组，那么你的钩子只会在组件挂载时触发一次，之后再也不会触发（清理函数除外，它会在组件卸载时触发，但那不是你的钩子本身触发的，而是运行你的钩子所产生的一种副作用）。

如果你指定了一个非空数组，钩子会在渲染时检测数组中任何一个值的变化。任何单个值的变化都会触发该钩子。React 使用**引用相等性**来判断值是否发生了变化。

>**引用相等性**
>
>在 JavaScript（以及许多其他语言）中，值分为两类：**基本类型**和**复杂对象**。JavaScript 有七种基本类型（`number`、`bigint`、`Boolean`、`string`、`symbol`、`null` 和 `undefined`）以及一种复杂类型（`object`）。也许你会想，类、正则表达式、数组和函数呢？这些也被认为是对象（尽管在某种意义上类和函数可以视为函数，而函数是对象的一个子类型）。
>
>你可以使用三等号运算符 `===` 来比较值是否严格相等。普通的双等号运算符 `==` 会进行类型转换，因此 `"1" == 1` 为 `true`，而严格相等要求类型也相同。
>
>在比较两个基本类型的值时，如果它们代表相同的数据，即使是不同变量，它们也会被认为是严格相等的。例如，`2 === 1+1` 是 `true`。
>
>但对于复杂类型来说，严格相等表示**引用相等**。只有当对象是同一个对象时，才会被认为是相同的，更新其中一个也会同时更新另一个。因此，`{} !== {}` 和 `[] !== []`，即使我们分别比较的是两个空对象和空数组。它们不被认为是严格相等的，因为它们不是同一个对象（或数组），只是相似的数据结构。
>
>当我们说 React 使用**引用相等性**时，我们的意思是 React 会使用严格相等运算符（`===`）来比较值。因此，只有当对象或数组是指向同一个对象的引用时，React 才会认为它们是相同的，而不仅仅是包含相似数据的两个不同值。

### 3.3.1什么是依赖项？

钩子的依赖项是钩子中使用的所有变量和引用的一个子集。依赖项指的是任何在组件作用域内本地存在的变量，而不是组件作用域外也存在的变量。图 3.6 显示了一些示例。

依赖项包括在组件中定义的任何变量（如 `const`、`let` 或 `var`）、在组件内部定义的任何函数，以及传递给组件的任何参数（主要是属性，但也可能是转发的引用）。任何在组件外部定义或从其他文件导入的函数或变量对于钩子来说都不是相关的依赖项。最后，在钩子内部定义的任何变量也不是依赖项，因为它们不在外部组件中存在。

### 3.3.2 通过省略依赖数组，在每次渲染时都运行

假设你希望你的副作用在每次渲染时都运行，而不管组件是因为什么原因重新渲染的。也许你是为了追踪或统计目的，想要记录所有的渲染情况。你可以添加一个依赖数组，列出所有存在的属性和状态值——只要其中任何一个值发生变化，这个副作用就会运行。

但请记住，你的组件也会因为其父组件重新渲染而重新渲染，而这种由父组件触发的渲染可能并不会伴随任何属性或状态值的变化。因此，无论你在依赖数组中放入多少个值，你的副作用都不会在每一次可能的渲染中都运行。

你有一个简单的解决方案：不使用依赖数组。完全不传入任何依赖数组，这样你的副作用就会在每次渲染时都运行，而不论渲染是由什么原因触发的：

```javascript
function Component({ ... }) {
  useEffect(() => track('Component rendered'));
  ...
}
```

请注意，我们只向 `useEffect` 函数提供了一个参数。我们只是忽略了传递第二个参数。

你可能会问，为什么非要在钩子中运行这个副作用呢？为什么不直接内联写这段代码，就像下面这样？

```javascript
function Component({ ... }) {
  track('Component rendered');
  ...
}
```

建议在副作用钩子中执行追踪函数，这样做有助于优化性能。前面的 track 函数可能执行较慢，而该函数的调用响应速度不应该阻塞组件的渲染。因此，通过在副作用中运行该函数，你可以将副作用的执行与组件的渲染解耦。

**没有依赖项的缓存/记忆化是没有意义的  **

你会为了使用缓存钩子而跳过依赖数组吗？如果缓存钩子的函数体在每次渲染时都会执行，那么对值进行缓存的额外开销就没有任何意义。所以你绝不会这么做，因为这样的代码毫无用处。如果你写了这样的代码：  
```javascript
const value = useMemo(() => someCalculation());
```
那你还不如直接使用下面这段效率更高且功能完全相同的代码：  
```javascript
const value = someCalculation();
```

**没有依赖数组和空依赖数组是不同的**  

请注意，缺少依赖数组和空依赖数组是完全不同的。在依赖数组的上下文中，这两种情况截然相反。带有空依赖数组的钩子仅在组件初次挂载渲染时执行一次，之后永远不会再次执行；而没有依赖数组的钩子会在组件的每一次渲染时都执行，无论渲染的原因是什么。

### 3.3.3 跳过稳定的变量作为依赖项

如果你格外细心，可能会意识到我们有时候会“偷懒”。我们并没有始终遵循“将钩子中使用的所有变量都列入依赖数组”这一最佳实践。在列表 3.10 中，我们就跳过了这一步骤。能发现这一点，你值得额外获得一颗金星！不过我当时其实有指出这一点，所以也许你只能得一颗银星了。以下是列表 3.10 中该组件的相关部分：

```jsx
const onDelete = useCallback(
  (item) => setItems((list) => list.filter((i) => i !== item)),//这里，我们使用了变量 setItems，它明确定义在 effect 之外，但在组件之内。
  []	//但我们仍然指定了一个空依赖数组。这样不允许，对吧？
);
```

这里发生了什么？我们可以不把变量列入依赖项吗？是的，如果该变量是一个**稳定的变量**。“稳定的变量”这个概念本身其实有点自相矛盾，因为它指的是一个**不会变化的变量**。如果某个变量在你的组件每次渲染时都保持相同的值，那么把它放进依赖数组就无关紧要了，因为我们知道它永远不会改变。这也是为什么来自组件外部的值通常不需要放进依赖数组的部分原因。如果我们**在组件外部定义了一个常量**，或者**从其他文件导入了一个常量**，我们就知道它在组件的每一次渲染中都是同一个常量，因此即使我们依赖它，也不需要把它当作一个可能变化的值来对待。

同样地，我们的组件内部也可能存在一些我们知道是稳定的变量——也就是那些永远不会改变的变量。当涉及到函数和对象时，稳定的值就显得尤为重要，因为即使一个函数每次的内容都相同，这也并不意味着它的值就是相同的。

当谈到 Hooks 时，React 定义并明确将某些返回值列为**稳定的**。如果你比较某些 Hook 的返回值，就会发现它们不仅返回相似的函数或对象，而是**完全相同的函数或对象**。我们可以忽略将这些值添加到依赖项中，从而使我们的组件和 Hook 更易于阅读和理解。

这就是由 useState 返回的 setter 函数的情况。虽然每次渲染时返回的值可能会变化，但 setter 函数始终是同一个函数引用，这就是为什么我们不需要将它包含在依赖数组中。

useRef 返回的对象也是如此。该对象始终是同一个，但其 current 属性的值是动态变化的。

如果你在 useEffect（或记忆化钩子）中使用了一个 useRef 引用或 useState 的 setter，你可以将其添加到依赖数组中，但并不是必须的。你和 React 都知道，这个引用和 setter 都是稳定的，它们永远不会改变，因此也绝不会导致钩子的执行发生变化。将它们列为依赖项是可选的。为了保持一致性，我建议你要么始终包含这些已知稳定的值，要么永远不包含。（我自己从来不包含。）开发团队通常会在编码规范中明确规定他们在这方面的选择。

你也可以自己创建稳定的变量，从而让你的组件更易于阅读和理解——无论是对你自己作为开发者而言，还是对团队的其他成员来说。如果你在组件中使用某个 Hook 来记忆化一个值，并传入一个空的依赖数组，那么返回的值就是稳定的。一个带有空依赖数组的记忆化 Hook 总是返回相同的值，因此可以认为它是稳定的。

想象一下这段代码，它来自一个未完成的组件，其中我们把所有依赖项都列了出来，即使其中一些是已知稳定的。这样一来，代码就会变得更冗长，牺牲了简洁性和可读性。

```jsx
function Panel() {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((open) => !open), [setOpen]);
  useEffect(() => {
    // Some effect here
    toggleOpen();
  }, [toggleOpen]);
  // ...
}
```

在这里，我们把 setOpen 列为了依赖项，尽管（正如刚才讨论过的）我们可以跳过它，因为它是已知稳定的，永远不会改变。然而，如果你查看前面那个组件中的代码，由于存在一个依赖数组，你并不能一眼看出这个副作用只在挂载时运行。你必须去追踪这个依赖项，检查它的来源，而这可能又会迫使你去查看另一组依赖项。

如果我们从 useCallback 钩子中省略掉 setOpen 这个依赖项，就会发现 toggleOpen 现在是一个稳定的值，因为它是在一个带有空依赖数组的记忆化钩子中被定义的。这个值在整个组件的生命周期内也永远不会改变，因此我们也可以从 effect 钩子的依赖数组中省略掉 toggleOpen。我们可以像下面这样大幅简化这个组件：

```jsx
function Panel() {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((open) => !open), []);
  useEffect(() => toggleOpen(), []);
  // ...
}
```

这个版本更容易阅读和理解，因为你一眼就能看出这两个 Hook 由于依赖数组为空，都只会运行一次。

### 3.3.4 获取帮助以维护依赖数组

维护依赖数组可能会相当麻烦。比如说，你在编辑某个副作用时，引用了组件接收到的某个属性，但却忘记更新依赖数组——整个组件就会开始出现奇怪的行为。

在第4章中，我们会讨论开发者工具。其中有一个工具叫ESLint，它有一条非常实用的规则，可以帮助你保持依赖数组的更新。如果你忘记将本应包含的依赖项添加进去，ESLint会直接在你的编辑器中报错。这个功能默认是开启的，所以只要安装该工具包就可以直接使用了。



# 4、使用开发者工具进行更好的代码维护

### 4.1.3 如何开始使用 ESLint

## 4.2 使用格式化工具提高生产力

### 4.2.1 Prettier 解决的问题

### 4.2.3 如何开始使用 Prettier

**步骤 1：将 Prettier 添加为一个包**

**步骤 2：添加一个配置文件（可选）**

**步骤 3：在编辑器中强制格式化**

**步骤 4：在代码提交时强制格式化（可选）**

请注意，这一步是可选的；并非每个项目都需要它。根据你的设置和工具栈中的其他工具，有多种方法可以实现这一任务，其中最简单的方法之一是使用一个名为 **lint-staged** 的工具。

如果你已经在项目中运行了安装 **lint-staged** 的命令，它会自动检测到你已经设置了 Prettier，并会开始根据 Prettier 的规则验证更改的文件。如果还未安装，可以使用以下命令来安装 **lint-staged**：

```bash
npm install --save-dev lint-staged
```

**小贴士**：查看在提交前钩子中使用 Prettier 的其他选项列表，请参见此页面：[Prettier Precommit Options](https://prettier.io/docs/en/precommit.html)。

### 4.4.4 Using the profiler in React Developer Tools

117

# 5、TypeScript：高级 JavaScript

### 5.3.2 Typing children  

```tsx
import { type PropsWithChildren } from 'react';

function Heading({ children }: PropsWithChildren) {
...
}
```

### 5.3.3 Extending interfaces  

我们甚至可以通过传入多个字符串的联合类型来省略多个属性：

```typescript
Omit<ButtonProps, "size" | "color">
```

我们也可以反过来：只选择几个属性，这可能比省略多个属性更简单。假设我们只想从按钮组件中扩展 `color` 属性。我们可以通过省略 `size`、`onClick`、`disabled` 和 `className` 属性来实现这一点。但更简单的方法是只选择 `color` 属性，如下所示：

```typescript
Pick<ButtonProps, "color">
```

`Pick` 也是 TypeScript 提供的一个内置接口。在所有这些示例中，我们通过直接引用描述这些属性的接口来扩展另一个组件的属性。但是，如果我们没有该属性接口的引用，只有组件本身呢？请看下一节内容（通过一个小小的绕行）。

### 5.3.4 Spreading props in general  

有一个更好的方法：`ComponentProps`，它是 React 内置的。`ComponentProps` 是一个泛型接口，我们需要提供一个类型参数。这个类型参数是我们希望获取属性接口的组件类型。在我们的例子中，该组件是 `img`，因此我们将其作为字符串传入：

```typescript
import { type ComponentProps } from 'react';

interface UserImageProps extends ComponentProps<"img"> { ... }
```

然而，我们遇到了一个小问题：对于所有组件，这个接口还允许 `ref` 属性，但引用在组件内部并不是作为常规属性接收的（至少在 React 19 之前不是）。因此，将组件接收到的属性类型化为包含 `ref` 属性并不合理。我们将在 5.3.8 节中详细讨论引用的类型。稍微更长一些的接口 `ComponentPropsWithoutRef` 则正好解决了这个问题：

```typescript
import { type ComponentPropsWithoutRef } from 'react';

interface UserImageProps extends ComponentPropsWithoutRef<"img"> { ... }
```

现在，我们的组件可以完全正常运行，并接收正确的属性。请记住，我们也可以从该接口中使用 `Pick<>` 或 `Omit<>` 来允许或禁止特定属性。例如，如果我们不希望开发人员传入 `alt` 属性，因为我们将自己设置它：

```tsx
import { type ComponentPropsWithoutRef } from 'react';
interface UserImageProps extends
  Omit<ComponentPropsWithoutRef<"img">, "alt"> {
  name: string;
  title: string;
}

function UserImage({ name, title, ...rest }: UserImageProps) {
  return (
    ...
    <img
      alt={`Profile image for ${name}`}
      {...rest}
    />
    ...
  );
}
```

但是，如果我们正在扩展一个自定义组件，该怎么办？我们还能使用 `ComponentPropsWithoutRef` 吗？假设我们有一个第三方库的 `<Rating />` 组件，该组件接受类似于以下示例的属性（并且可能接受更多属性）：

```javascript
<Rating icon="♥" max={6} value={4.3} label="4.3 hearts" />
```

我们想创建一个新的 `BookReview` 组件，希望能够传入一些特定于书籍的信息，同时也传入一些 `Rating` 组件使用的相同属性，例如 `value`、`label` 和 `icon`。我们希望能够这样做：

```tsx
import { Rating, type RatingProps }
  from 'cool-rating-library';
interface BookReviewProps extends
  Pick<RatingProps, "value" | "label" | "icon"> {
  title: string;
  reviewer: string;
  body: string;
}

function BookReview({ ... }: BookReviewProps) {
...
```

在这个例子中，我们依赖外部库提供组件属性的类型。如果没有提供该类型，我们能使用 `ComponentPropsWithoutRef` 吗？直接使用是不行的，因为 `ComponentPropsWithoutRef<Rating>` 没有意义。这里 `Rating` 是一个真正的 JavaScript 变量，而不是一个 TypeScript 类型。

不过，我们可以采取一种简单的方法，使用 `typeof`：

```tsx
import { type ComponentPropsWithoutRef } from 'react';
import { Rating } from 'cool-rating-library';
type RatingProps =
  ComponentPropsWithoutRef<typeof Rating>;
interface BookReviewProps extends
  Pick<RatingProps, "value" | "label" | "icon"> {
...
```

让我们将这段代码扩展成一个完整的示例，以便可以进行实验。我们将自己创建两个组件，但不会对外公开 `Rating` 组件的 `props` 类型。此外，我们还会使用一些 CSS 来制作一个漂亮的评分显示。首先，我们从 `Rating` 组件开始。

### 5.3.5 Restricting and loosening types  

当我们扩展一个接口时，可以对接口进行约束，但不能放宽它。例如，如果我们有以下接口：

```typescript
interface Style {
  width: number | string;
}
```

可以通过扩展该接口并对其进行约束，例如限定为仅数字类型：

```typescript
interface NumberStyle extends Style {
  width: number;
}
```

但不能反向操作，放宽其定义为更广泛的类型：

```typescript
interface AnyStyle extends Style {
  width: number | string | null;
}
```

上述代码会导致以下 TypeScript 错误消息：

```
Interface 'AnyStyle' incorrectly extends interface 'Style'.
	Types of property 'width' are incompatible.
		Type 'string | number | null' is not assignable to type
		'string | number'.
			Type 'null' is not assignable to type 'string | number'.
```

### 5.3.6 Using optional and required properties  

在前面的示例中，我讨论了对类型的约束或放宽，并提到了向联合类型中添加或减少可选项。但我们还可以切换属性的另一个方面，即它是否为必需项。可以通过省略问号来创建一个必须提供的字符串输入：

```typescript
interface StringInputProps extends ComponentPropsWithoutRef<"input"> {
  value: string;
}
```

但反过来却行不通。假设我们想扩展之前的 `Rating` 组件，但使 `BookReview` 组件的 `value` 属性可选：

```typescript
interface BookReviewProps extends PickedRatingProps {
  value?: number;
}
```

此代码会导致类似于第 5.3.5 节中的 TypeScript 错误消息，因为我们实际上将类型扩展为了 `number` 或 `undefined`，这种放宽是不允许的，因此我们需要在重新定义之前先省略该属性。

有时，我们只想将特定属性设置为必填，而不是可选，但不希望更改类型的其他内容。假设我们想添加一个按钮，并必须定义 `onClick`。按钮的 `onClick` 属性的内置可选类型相当长：

```typescript
// 按钮 onClick 属性的内置类型
onClick?: React.MouseEventHandler<HTMLButtonElement>;
```

我们不想重复整个定义，只是去掉问号。所以可以直接引用旧定义，通过 `ComponentPropsWithoutRef` 来获取：

```typescript
type ButtonProps = ComponentPropsWithoutRef<"button">;
interface ButtonWithClickProps extends ButtonProps {
  onClick: ButtonProps["onClick"];
}
```

不过，这段代码会导致大量的输入，如果我们想对多个属性做同样的事情：

```typescript
type ButtonProps = ComponentPropsWithoutRef<"button">;
interface HoverButtonProps extends ButtonProps {
  onMouseOver: ButtonProps["onMouseOver"];
  onMouseMove: ButtonProps["onMouseMove"];
  onMouseOut: ButtonProps["onMouseOut"];
}
```

有一种更聪明的方法。TypeScript 有一个内置接口 `Required<>`，它使另一个类型的所有属性都变为必填。虽然这种行为并不是我们想要的，但我们可以用它来创建自己的工具接口，使某些属性变为必填：

```typescript
type RequireSome<T, K extends keyof T> = T & Required<Pick<T, K>>;
```

然后，我们可以更加优雅地创建 `HoverButtonProps`：

```typescript
type ButtonProps = ComponentPropsWithoutRef<"button">;
type RequireSome<T, K extends keyof T> = T & Required<Pick<T, K>>;
type HoverButtonProps = RequireSome<
  ButtonProps,
  "onMouseOver" | "onMouseMove" | "onMouseOut"
>;
```

你可能开始意识到 TypeScript 的强大。你可以仅通过使用类型来进行编程！

### 5.3.7 Using either/or properties  

146

### 5.3.8 Forwarding refs  

148

# 6、Mastering TypeScript with React  

## 6.1 在 TypeScript 中使用 React Hooks 

### 6.1.1 为 useState 添加类型

useState 钩子在进行类型标注时需要一条信息：即该钩子所存储状态的类型。有时这条信息很简单明了；但有时存储的数据类型会随时间变化，这时我们需要在初始化时告知钩子所有可能的类型，以便能够以类型安全的方式使用它。

### 6.1.2 为 useRef 添加类型

如果按照 6.1.1 节中的做法，这段代码基本上会按预期工作。但是，`useRef` 有一些意外之处。我们可以更简单地为第一个示例定义类型：

```javascript
const stringOrNullRef = useRef<string>(null);
```

`useRef` 针对特定情况有一个类型重载：如果类型参数中不包含 `null`，但初始化器为 `null`，则 `useRef` 会隐式地将类型参数扩展为允许 `null`。

但这里的陷阱在于，后者的定义是一个不可变引用。不可变引用可以传递给元素，因此类似下面的代码是可行的：

```javascript
const inputRef = useRef<HTMLInputElement>(null);
...
return <input ref={inputRef} />;
```

这个示例是 `useRef` 特殊重载的常见用例。我们可以在类型参数中省略 `| null`，并用 `null` 初始化 ref，一切都能如预期工作。但是，如果我们为可变状态创建引用，并希望直接更新该状态，例如在 effect 或回调中，这种方法将不起作用。

假设我们想创建一个组件，在光标位于组件内部时记录其位置，并在鼠标离开时清除该引用。我们可以实现如下组件：

```javascript
function MouseTracker() {
  const position = useRef<{ x: number; y: number } | null>(null);

  const onMouseLeave = () => {
    position.current = null;
  };

  const onMouseMove = (evt: MouseEvent) => {
    position.current = { x: evt.clientX, y: evt.clientY };
  };

  return (
    <div onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
      ...
    </div>
  );
}
```

请注意，我们在类型参数中使用了显式的 `| null` 来初始化该引用。如果我们省略这一部分，示例将无法正常工作——并非因为不允许 `null`，而是因为该引用将是不可变的，不允许直接更新，并会报以下错误：

```
Cannot assign to 'current' because it is a read-only property.
```

最好在类型参数中明确可变引用的可能值，以避免这种奇怪的行为。

### 6.1.3 为 Context 和 useContext 添加类型  

### 6.1.4 为 effects  添加类型

副作用（Effects）的类型定义非常简单，因为副作用本质上是一个不接收任何参数、且返回一个函数或什么都不返回的函数。所有的副作用 Hook 都不需要传入任何类型参数，因为实际上永远用不到：

```tsx
useEffect(() => {
  // 在这里编写副作用逻辑 —— 任何地方都不需要显式声明类型！
}, []);
```

在 TypeScript 和 JavaScript 中，你可以以完全相同的方式使用 `useEffect` 和 `useLayoutEffect`。唯一需要注意的与类型相关的事情是：**副作用函数只允许返回 `undefined` 或一个函数（即清理函数）**。如果你返回了其他任何值，TypeScript 就会提示你出错了。

假设我们有一个定时器组件，当定时器处于运行状态时，该组件会通过一个副作用（Effect）来启动一个定时器（interval）。在常规的 JavaScript 中，你可能会这样编写代码：





### 6.1.5 为 reducers  添加类型

一个行为良好的 Reducer 很容易进行类型定义，因为它的结构非常清晰。`useReducer` 这个 Hook 的类型声明也直接遵循 Reducer 的结构，逻辑上非常直观。不过，对于泛型（generic）Reducer 而言，需要一个小技巧，因为 `useReducer` 在某些情况下会“忘记”泛型参数。

> **注意**：在 React 19 中，这个问题已经修复！你不再需要任何小技巧，即使在使用泛型时，为 `useReducer` 添加类型提示也不是必须的。

假设我们正着手开发一款革命性的音乐流媒体应用，目标是向全球用户提供数百万首歌曲。作为我们应用的核心功能之一，我们希望赋予用户创建个人音乐播放列表的能力，让他们能够将自己喜爱的曲目整理成个性化的歌单。打造无缝的用户体验至关重要：用户应该能够轻松地重新排列歌单中歌曲的顺序，把最喜欢的曲目放到最前面，或者根据自己的喜好将其他歌曲移到后面。

为了实现这一功能，我们需要在应用程序的前端管理这些播放列表的状态。与其在每个组件或场景中都重新造轮子，不如创建一个专门用于管理可重排序列表的自定义 Hook，这将极为有益。这个 Hook 会封装移动歌曲（上移、下移或移动到播放列表中特定位置）所需的逻辑，从而确保整个应用中用户体验的一致性和高效性。通过构建这样一个我们称之为 useReorderable 的 Hook，我们可以让应用离为用户提供无与伦比的音乐整理体验更近一步。

我们完全可以专门为播放列表数组中的歌曲项创建这个 Hook 来实现重排序，但为什么不将它设计为泛型的呢？这样它就可以对任意类型元素的列表进行重排序了。我们就这么做吧。首先，我们定义 Reducer 的状态，也就是元素列表。

```tsx
type State<T> = T[];
```

接下来，我们需要将操作定义为可辨识联合类型（discriminated union）。

```typescript
export type Action =
  | { type: "up"; index: number }
  | { type: "down"; index: number }
  | { type: "first"; index: number }
  | { type: "last"; index: number };

export type ActionType = Action["type"];
```

你定义了一个 TypeScript 类型 `Action`，它是一个联合类型，包含四种不同类型的动作对象。每种动作对象都有一个 `type` 属性和一个 `index` 属性。接着，你定义了一个 `ActionType` 类型，它是 `Action` 类型中 `type` 属性的所有可能值的联合类型。

### 定义 `Action` 类型
```typescript
export type Action =
  | { type: "up"; index: number }
  | { type: "down"; index: number }
  | { type: "first"; index: number }
  | { type: "last"; index: number };
```

### 提取 `type` 属性的值
```typescript
export type ActionType = Action["type"];
```

### 解释
- `Action` 类型是一个联合类型，包含四种不同的动作对象。
- `Action["type"]` 是一个索引类型查询，它提取 `Action` 类型中所有成员的 `type` 属性的值。
- `ActionType` 是这些 `type` 属性值的联合类型，即 `"up" | "down" | "first" | "last"`。

### 6.1.6 类型化记忆化（Memoization）Hooks  

React 提供了三个用于记忆化的 Hooks，但从 TypeScript 的角度来看，其中只有 useCallback 是比较值得关注的。useMemo 和 useDeferredValue 在 TypeScript 中的类型使用方式与在纯 JavaScript 中几乎完全一致。

`useDeferredValue` 是 React 18 引入的一个 Hook，用于优化用户体验，特别是在处理大量数据或高频率更新的场景中。`useDeferredValue` 允许你延迟某些计算或渲染，从而让更重要的更新优先处理。

### 6.1.7 为其余的 Hooks 添加类型

React 中的其他 Hooks 使用频率较低，从类型的角度来看，它们要么极其简单，要么相当复杂，因此我们暂时跳过它们。在极少数情况下，如果你确实需要在 TypeScript 项目中使用它们，可以查阅 React 官方文档，通常你应该能够理解并正确地为它们添加类型。

## 6.2 泛型分页：一个示例

到目前为止，我们已经看到了大量使用泛型来让函数更加通用的例子。Hooks 中也经常用到泛型。但组件本质上也是函数，那么组件是否也可以做成泛型的呢？当然可以。

为了通过使用泛型组件来构建一个实用的 React 应用程序，我们将创建一个包含多个组件的应用，所以它并不是完全简单的。要完全理解其中的原理需要付出更多努力，但最终的结果绝对值得。

我们想要创建一个组件，它可以显示一个项目列表，如果项目数量很多，就提供分页功能。我们希望每页显示四个项目，如果超过四个，就在组件下方显示一些小数字，让用户可以点击跳转到第 1 页、第 2 页等结果页面（如图 6.3 所示）。



请注意，这段代码比较复杂。如果你没有完全理解它，也没关系——这里涉及的内容很多。这个示例的目的只是为了启发你去进一步探索和学习。正如我之前提到的，我甚至可以把整本书都用来讲 TypeScript，那样也会同样详尽且全面。

而且，这其中的深度远不止于此。TypeScript 提供了一些非常强大的功能，允许你在类型系统中使用一种类似编程的语法来定义类型，从而实现动态、可扩展的类型系统。请记住，TypeScript 最终并不会在浏览器中运行；它只会在你的编辑器和编译器中运行，以确保你的代码能够正确执行。TypeScript 能做到的事情，以及它能为你做的事情，真的非常令人惊叹。

像 Paginable 这样的泛型组件有一个小陷阱：React 核心 API 中的两个内置函数与泛型组件配合得不太好，你需要稍微绕一下来解决这个问题（或者寄希望于它在未来的版本中被修复，而这很可能会发生）。

如果你对泛型组件进行 **memo 化（记忆化）** 或者 **转发引用（forwardRef）**，该组件的类型参数将会被“遗忘”。遗憾的是，我们必须自己手动修复这个问题，才能恢复我们想要的泛型功能。

### 6.2.1 向泛型组件转发引用

问题在于，`forwardRef` 并不会返回一个与你传入的组件具有相同类型的组件。我们并不要求返回的类型完全一致，但仅仅因为我们想向组件传递引用，并不意味着我们想改变其他任何东西。

有两种解决方案可供选择。第一种方案适用于一次性（或者可能两三次）的情况，但如果你有很多泛型组件，第二种方案可能是你更常用的方式：

- 在应用 `forwardRef` 之后，将组件强制转换为正确的类型。

- 在你的应用程序中，全局地扩展 React 的类型定义，以增强 `forwardRef` 的类型。

为了进行类型转换（即类型断言），我们需要思考一个没有使用 `forwardRef` 的组件与使用了 `forwardRef` 的组件之间有何不同。唯一的区别在于：**带有 ref 的组件接收所有相同的属性（props），并返回相同的值，但它还额外接收一个 `ref` 属性，该属性的类型是指向特定元素类型的引用**。为了给这样一个函数（仍然带有泛型类型）进行类型标注，我们需要使用以下复杂的类型表达式：



这段代码看起来有些笨重，主要是因为它过于复杂，而且似乎凭空出现。但尽管代码写法看起来不太友好，它确实能正常工作。如果你需要多次为代码添加这种类型断言，就会变得有点烦人，而且你可能还会忘记怎么写。此外，对于新加入项目的开发者来说，这样的代码也可能让人感到困惑，因此你应该加上注释，解释这里到底发生了什么。

除了在每个使用了 `forwardRef` 的泛型组件中都手动添加这种类型断言之外，还有另一种替代方案，那就是**扩展 React 命名空间的类型定义（即类型增强，type augmentation）**。是的，我们是可以这么做的。我们可以重新定义外部库（包括 React）的类型，因为我们“比 React 更了解自己的使用场景”。React 团队在类型定义上可能犯了一个小错误，而我们有能力、也允许去修正它。

要进行类型增强，我们需要**在源码树的某个位置创建一个 TypeScript 类型定义文件（*.d.ts），比如 `<root>/react-augmented.d.ts`**。注意，我们只需要全局做一次这样的操作，之后它就应该对所有组件都生效了。

在这个文件中，我们需要包含如下内容：（接下来应该会展示具体的类型增强代码）


### 6.2.2 Memoizing a generic component  

## 6.3 使用 TypeScript 的缺点

## 6.4 TypeScript 资源  

# 7、CSS in JavaScript  

### 7.1.4 Why not inline styles?

disabled 按钮样式

```jsx
const DISABLED_STYLES = {
  opacity: 0.5,
  pointerEvents: "none",
};
```

190

### 7.3.3 Implementation with class names  

```jsx
  const classNames = [
    "button",
    outline ? "button--outline" : "",
    className,
  ].filter(Boolean);
```

这段代码定义了一个名为 `classNames` 的常量，用来动态组合 CSS 类名。以下是代码的解析：

### 代码功能

1. **类名数组：**

   ```javascript
   [
     "button",
     outline ? "button--outline" : "",
     className,
   ]
   ```

   - `"button"`：基础类名，始终存在。
   - `outline ? "button--outline" : ""`：根据 `outline` 的值是否为真，动态决定是否添加 `"button--outline"` 类名。如果 `outline` 为 `false`，则添加空字符串（即什么都不添加）。
   - `className`：外部传入的自定义类名，允许额外的类名动态传入。

2. **`.filter(Boolean)`：**

   - 过滤掉数组中的假值（如 `false`、`null`、`undefined`、空字符串等）。
   - 仅保留有效的类名，确保最终生成的类名字符串中没有多余的空格或无效值。

### 示例用法

假设：

- `outline` 为 `true`。
- `className` 为 `"custom-class"`。

则 `classNames` 的结果为：

```javascript
["button", "button--outline", "custom-class"]
```

最终可以通过 `join(" ")` 转换为：

```javascript
"button button--outline custom-class"
```

### 总结

这段代码是动态生成类名的一个常见模式，确保代码简洁且易于维护，是处理条件类名组合的优雅方案。

## 7.4 方法 2: CSS Modules  

这种方法是对常规 CSS 文件和类名方法的小扩展，解决了我在第 7.3.5 节中提到的一些问题。这个概念被称为 **CSS Modules**，它主要处理组件化和命名冲突的问题。CSS Modules 仍然使用 CSS 文件，编写方式与通常的 CSS 文件相同。但这些文件会被解析，类名会被提取并重新生成为新的唯一名称。其他方面的操作保持不变。

### 7.4.1 CSS Modules 是如何工作的

apulis 前端项目就是使用的这种方案。

```jsx
import styles from './index.less';

<Spin spinning={loading} delay={300}>
    <Tabs className={styles.tabs} onChange={onTabChange}>
        {panes}
    </Tabs>
</Spin>
```

### 7.4.2 CSS Modules 项目的设置

对 CSS Modules 的支持默认内建于任何 Vite 设置中。你所需要做的就是将你的 CSS 文件命名为 *.module.css，然后就可以正常使用了。
如果你没有使用基于 Vite 的设置，你需要找到一个与你的打包工具兼容的 CSS Modules 插件。对于 webpack，你可以使用 css-loader 插件，
而对于其他所有情况，你可以使用 postcss 和 postcss-modules 插件。

- css-loader—https://github.com/webpack-contrib/css-loader
- postcss—https://github.com/postcss/postcss
- postcss-modules—https://github.com/madyankin/postcss-modules  

## 7.5 方法 3: Styled-components  

Styled-components 是 CSS Modules 的自然延伸，将这一概念推进到了下一步。CSS Modules 使用 CSS 文件和类名，但这些类名是局部变量，而不是最终 CSS 中的类名。那么为什么不跳过类名这一步，直接创建已经应用了一组给定样式的元素，并在组件中直接使用这些元素呢？

### 7.5.1 Styled-components 是如何工作的

https://styled-components.com  



### 7.5.2 styled-components  项目的设置

对 styled-components 的支持并未内置在 Vite 中，但安装起来仍然非常简单。你只需要使用 npm 安装该模块：

```sh
$ npm install --save styled-components
```

然后你可以开始从该包中导入并在项目中使用它，就像我们在第 7.5.1 节中看到的那样。

### 7.5.3 Source code with styled-components  

### 7.5.4 styled-components  的优点

### 7.5.5 styled-components  的缺点

### 7.5.6 什么时候（不）使用 styled-components

Styled-components 非常适合具有许多一次性组件的复杂设计，但对于组件库或拥有统一和精简设计的网页应用程序（如仪表板和管理界面）来说，通常被认为不太理想。这个库非常多功能且受欢迎，所以使用它不会错，但在大型项目中承诺使用它之前，你可能想要考虑一下其他替代方案。

## 7.6 One problem, infinite solutions  

# 8、React 中的数据管理

# 9、Remote data and reactive caching  

Mock Service Worker (MSW for short)  

为了模拟真实的网页体验，我们将引入一个小但明显的服务器响应延迟。最初的简单解决方案虽然因为明显的延迟而不太理想——在延迟期间没有任何事情发生，但它确实可以工作。稍后，我们将讨论为什么反应式缓存可能是一个更好的解决方案，并最终使用 TanStack Query 重新实现整个应用程序，TanStack Query 是一个为 React 设计的反应式缓存和数据管理库。我们将从使用默认的基础设置来实现这个工具开始。最后，我们将介绍客户端缓存原则，这些原则将使依赖服务器的体验对用户来说更加流畅。

## 9.2 Adding a remote server to do goal tracking  

273

# 10、React单元测试

Vitest + React Testing Library.  

你可以使用多种工具来实现不同目标和层次的测试。在本章中，我们将讨论如何使用 Vitest 作为测试运行器，以及如何使用 React Testing Library 作为组件的黑盒测试框架。Vitest 是一个经常与 Vite 一同使用的较新的库，我们在示例中也使用了 Vite。Jest 是另一个测试库，在 React 测试中可能更为常用，但 Vitest 的 API 几乎与 Jest 完全相同，并且由于它与 Vite 的紧密集成而获得了大量关注。Vitest 和 Jest 都可以在没有 React Testing Library 的情况下独立使用，但 React Testing Library 已迅速成为标准，因为它配备了一套更好的工具和实用函数，并基于更优良的原则构建。我们将在第 10.1.3 节中重新审视这些原则。

所以，1-2-3 测试！

## 10.1 Testing a static component  

### 10.1.3 测试弹性



## 10.2 测试交互式组件  

### 10.2.1 测试有状态的组件

### 10.2.2 测试回调

### 10.2.3 测试表单

### 10.2.4 测试 a hook

## 10.3 Testing a component with dependencies  

### 10.3.1 模拟浏览器 API  

使用这种方法，你可以模拟组件可能从浏览器使用的任何 API，包括本地存储、网络请求（如 fetch）、电池状态和屏幕捕获。

### 10.3.2 Mocking a library  

**注意**：对于网络库，我建议使用 **Mock Service Worker (MSW)** 来模拟整个后端，而不是模拟网络库本身。这种方法更可靠且更具前瞻性，能更好地模拟 API 层。你可以回到第 9 章，了解 MSW 的工作原理。不过，本节介绍的方法仍然有效且有用。

### 10.3.3 Mocking a context  

# 11、React 网站框架

React 网站框架允许我们在服务器上运行 React。你可能会疑惑为什么想要这样做，而无论是简短的答案还是详细的解释都是：速度和性能。页面渲染得更快，网站的整体性能也变得更好。这些改进有助于访客留存、搜索引擎优化以及整体用户体验——并且很可能对你（或你的雇主）的经济效益也有正面影响。

在本章中，我将详细讲解这些技术细节，并讨论是什么使得 React 的服务器端渲染（SSR）通常更快。接着，我将演示如何使用两个流行的 React 网站框架——Next.js (https://nextjs.org) 和 Remix (https://remix.run)，来创建一个服务器端渲染的天气应用程序。

## 11.1 什么是网站框架?  

React 是一个 JavaScript 框架，而浏览器运行 JavaScript，因此浏览器可以运行 React。但除了浏览器之外的其他环境也可以运行 JavaScript，因此像网页服务器上的 Node 这样的其他环境也可以运行 React。

能够在任何支持 JavaScript 的环境中运行 React 是 React 网站框架的基石。你可以在服务器上运行 React，从而使用 React 作为模板语言在服务器端生成 HTML。在服务器上运行 React 给你带来了多个好处，包括但不限于以下几点：

- **全栈开发**：这种类型的开发使你能够在一个应用程序中构建整个网站，前端和后端合并在一起。你不需要有两个不同的项目、代码库，甚至不需要两个需要协调的不同团队。所有内容都一起构建，因此你可以获得最优的共存。你可以在单个文件中直接更改从数据库加载的内容以及它在最终 HTML 中的位置，即使这些事情分别发生在后端和前端。
  
- **服务器端渲染（SSR）**：通过 SSR，HTML 可以立即从服务器提供，这可以改善页面加载时间，进而可能提高访客留存率和搜索引擎排名。

- **动态内容**：由于你控制了整个堆栈，你可以无缝地将任何内容集成到你的网站中。你可以从数据库或外部 API 加载内容，甚至是那些通常不会放在前端应用程序中的某些秘密信息。框架会确保你的内容正确地从前端传递到后端；你无需做额外的工作。

- **URL 路由**：URL 路由允许你将 URL 用作导航的来源。大多数框架内置了复杂的路由规则，使得创建页面变得简单。

但这些好处附带了一个特定的要求：hydration（水合）。当客户端首次渲染 React 输出时，每一个字节的输出都必须与服务器端渲染的结果相匹配。

本节的其余部分将总体上涉及到这些概念。当我们理解了使一个 React 网站框架运转的关键因素后，我们将在第 11.2 节讨论两个候选框架。

### 11.1.1 Fullstack React as a concept  

当你引入全栈 React 时，你消除了所有这些问题，因为 React 同时运行在前端和后端。这些问题突然间消失了：

- 你可以将前端和后端作为一个单一的应用程序来开发，因此不需要花费太多时间考虑如何访问数据库或保存文件到永久存储。
- 你可以轻松地标记代码的哪些部分仅在客户端或仅在服务器端运行，因此可以毫不费力地将你的 API 密钥隐藏在服务器上。
- API 的担忧不复存在，因为你实际上是在同一个文件中使用数据编写前端和提供数据的后端。
- 深度链接变得微不足道，并且已经内置到平台中。

### 11.1.2 在服务器端渲染 HTML

使用服务器端渲染（SSR），我们在服务器上渲染完整的 HTML，这意味着我们运行整个 React 应用程序，并将所有正确的数据放入所有正确的组件中，然后对生成的 HTML 进行快照，并将这个 HTML 返回给浏览器。

幸运的是，答案是否定的。服务器端渲染只发生在第一个页面。之后，只有数据是从服务器加载的。因此，当我们为 SSR 编写组件时，我们将它们作为两个独立的部分来编写：一个组件和一个数据包。对于访问的第一个页面，这两个部分在服务器上结合，并与 JavaScript 应用程序一起返回。但对于后续的页面访问，每个页面只需要请求数据包，因为我们已经在浏览器中拥有了 React 应用程序（包括组件），所以我们只需要每个页面的数据。图 11.3 展示了一次网站访问的过程。

这个概念——每个页面都有两部分，即数据和 React 组件——是 React 网站框架运作方式的核心。那个数据部分可以包含各种动态内容，我们将在接下来的内容中讨论这一点。

### 11.1.3 动态内容

Prisma 是一个对象关系映射（ORM）库。本质上，这样的库是构建在 SQL（甚至是 NoSQL）之上的抽象层，它屏蔽了编写 SQL 查询的复杂性，而是使用简单的对象表示法来向数据库写入数据和从数据库检索数据。

Remix 强烈推荐使用 Prisma 作为数据库引擎，并且在许多可用的 Remix 示例应用程序中已经预安装了 Prisma。Next.js 则稍微开放一些，拥有使用其他框架的示例应用程序，但 Prisma 仍然是一个强烈推荐的选择，因此在本章以及第 12 章中，我们将使用 Prisma。

https://www.prisma.io  

### 11.1.4 Hydration is necessary  

图 11.4 中的步骤，即 React 同样渲染页面并将渲染的 HTML 与服务器生成的 HTML 进行比较的过程，被称为水合（hydration）。这个步骤对于获得服务器端渲染（SSR）所提供的性能提升非常重要。我们将在接下来的几个部分中讨论这些影响。

**ONLY PERFECT HYDRATION IS ALLOWED**  

为了确保水合（hydration）能够正确工作，必须保证服务器端和客户端的输出完全相同，精确到每一个字节。任何差异都会导致 React 报错。这种情况带来了几个后果，最明显的是你不能在应用程序中生成任何随机内容，因为这会影响输出的一致性。

例如，如果你想在一个英雄横幅中显示随机名言（或在你的博客上显示随机广告），你不能让 React 来做这个随机选择。这个随机选择必须在服务器端、React 之外进行，并以确定性的方式传递给 React。你需要将随机选择的结果包含在数据包中，而不是让 React 来选择（参见图 11.5）。

**WHAT'S THE PROBLEM WITH NONPERFECT HYDRATION?**  

你可能会疑惑为什么水合（hydration）必须做到像素级别的精确——为什么某些部分稍微不同就不能工作。这是因为 React 的设计就是这样；它是一个要么全部正确要么全部不正确的概念。

如果打破了这一原则，应用程序会崩溃吗？不会，应用程序不会因此崩溃。水合仍然会工作，但会带来性能上的惩罚。让我解释一下为什么会发生这种惩罚。

如果水合成功，React 启动得比平常更快，因为它不需要渲染到文档对象模型（DOM）——只需要检查差异（这比重新渲染要快）。但如果水合失败，React 会清除文档并从空白页面重新渲染整个页面，但这是在检查差异之后进行的，这使得过程变慢了——虽然不会慢很多，但确实更慢。另一个因素是 HTML 文件的大小。在传统的设置中，HTML 文件非常小，因为它几乎是空的。但是当它经过服务器端渲染后，如果页面复杂，HTML 文件可能会变得相当大。因此，只有当水合正确工作时，服务器生成的 React 才能获得性能提升。参见图 11.6 中的对比。

**关于部分水合（Partial Hydration）**

部分水合是一个相对较新的概念，它涉及到将内容拆分成更小的部分，这些部分可以独立地进行水合或不进行水合。这一主题相当复杂，超出了本书的讨论范围，但我想提一下，以防你有兴趣深入研究。

现代 React 开发中有许多进展都在这个领域，但它非常复杂，需要更多的介绍，而这些超出了本章能够提供的内容。诸如 React Server Components、流式内容交付、服务器端动作、污染对象等话题都是前沿 React 框架的一部分，而这些新功能大多归结于部分水合带来的好处。

**注**： React 18 中的一些新特性也与服务器端动作相关，随着 React 18 的采用，我们将看到 React 网站框架性能的重大改进。本书不会讨论这些新特性，而是专注于全水合。

## 11.2 实践

### 11.2.1 Next.js  

https://nextjs.org  

### 11.2.2 Remix  



### 11.2.3 Environment values and API keys  

341

### 11.3.3 存储本地数据

但 `localStorage` 仅在浏览器中工作，不在服务器上工作。

相反，我们可以使用 cookies。Cookies 在客户端和服务器端都能工作，因为它们在每次请求中都会被发送到服务器并从服务器接收。在每次请求中发送数据看起来似乎有些浪费，因此你能够存储的数据量比 localStorage 中要少很多。我们的示例中将待办事项数据存储在 localStorage 中的做法可能无法用 cookies 实现，因为我们很快就会超出 cookies 的存储空间。

使用 cookies，你会得到如图 11.15 所示的流程。

Cookie 在客户端和服务器端都可以被设置、读取、编辑和删除，因此它们非常适合我们的示例。在任意一端手动设置 Cookie 略显繁琐，但幸运的是，我们使用的两个框架都带有出色的工具来操作 Cookie。在 Remix 中，这一功能内置在核心中，而在 Next.js 中，一个名为 cookies-next 的实用库能完美地完成这项工作。

**COOKIES IN NEXT.JS**  

**COOKIES IN REMIX**  

### 11.3.4 Creating an API  

356

## 11.4 基于 React 的替代网站框架