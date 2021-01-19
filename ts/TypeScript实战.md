# 第1章 TypeScript基础

## 1.3 安装TypeScript

​	npm安装的报分为本地（local）和全局（global）两种。本地安装的模块需要通过require()来引入。全局安装的模块可以直接在命令行里使用。

### 1.4.2 编写TypeScript文件

TypeScript函数命名采用camelCase命名规则。

### 1.4.3 编译TypeScript文件

这里使用windows命令行工具调用tsc命令编译helloworld.ts

```bash
tsc helloworld.ts
```

编译成功后，会在helloworld.ts同一目录下生成一个helloworld.js文件。

可以同时编译多个.ts文件：

```bash
tsc file1.ts file2.ts
```

在有tsconfig.json的目录中执行`tsc`命令，则使用该配置文件进行编译。

# 第2章 TypeScript基本语法

## 2.3 类型

​	TypeScript中所有类型都是any类型的子类型。any类型可以表示任何值。

### 2.3.3 any

any和Object对比示例

```tsx
let notSure: any = 4;
notSure.ifItExists(); // ifItExist方法在运行时可能存在
notSure.toFixed(); // toFixed是数值4的方法

let prettySure: Object = 4;//此处是大写的Object，不是小写的object
prettySure.toFixed(); // 错误Object类型没有toFixed方法（IDE直接标红报错）
```

​		any类型的变量可以调用任何方法和属性，但是Object类型的变量却不允许调用此类型之外的任何属性和方法，即使Object对象有这个属性或方法也不允许。

### 2.3.6 Symbols

```typescript
let s1 = Symbol('name');// Symbol()
let s2 = Symbol('age');
console.log(s1) // Symbol(name)
console.log(s2) // Symbol(age)
console.log(s1.toString()) // "Symbol(name)"
console.log(s2.toString()) // "Symbol(age)"
```

​		**提示**：Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。也就是说Symbol值不是对象，因此不能添加属性。

### 2.3.7 交叉类型

​	Intersection Types可以将多个类型合并为一个类型。合并后的交叉类型包含了其中所有类型的特性。

```tsx
class Car {
    public driverOnRoad() {
        console.log("can driver on road");
    }
}
class Ship {
    public driverInWater() {
        console.log("can driver in water");
    }
}
let car = new Car();
let ship = new Ship();

let carShip: Car & Ship = <Car & Ship>{};

carShip["driverOnRoad"] = car["driverOnRoad"];
carShip["driverInWater"] = ship["driverInWater"];
carShip.driverInWater();//can driver in water
carShip.driverOnRoad();//can driver on road
```

​	13行创建了一个`Car & Ship`类型的变量，用{}进行了初始化，并用`<Car & Ship>`对空对象进行了类型断言，否则会报错。

### 2.3.8 Union类型

​	Union Types表示取值可以为多种类型中的一种。

​	number | string表示number和string的联合类型。

​	**提示**：当typescript不确定一个union类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性和方法。

​	**提示：**可以用类型断言将Car | Ship断言成一个Car或者Ship类型的对象，从而钓鱼用特有的方法。

```typescript
class Car {
    public driverOnRoad() {
        console.log("can driver on road");
    }
    public toUpper(str: string) {
        return str.toUpperCase();
    }
}
class Ship {
    public driverInWater() {
        console.log("can driver in water");
    }
    public toUpper(str2: string) {
        return str2.toUpperCase();
    }
}
let car = new Car();
let ship = new Ship();
let carShip: Car | Ship = <Car | Ship>{};
carShip["driverOnRoad"] = car["driverOnRoad"];
carShip["driverInWater"] = ship["driverInWater"];
carShip["toUpper"] = ship["toUpper"];
let str: string = carShip.toUpper("hello world");
console.log(str);//共有方法
// carShip.driverOnRoad();//不存在
//carShip.driverInWater();//不存在
(<Car>carShip).driverOnRoad(); //OK
(<Ship>carShip).driverInWater(); //OK
```

​	

​	类型别名（Type Aliases）可以用来给一个类型起新名字，特别对于联合类型而言，起一个有意义的名字会让人更容易理解。

​	类型别名的语法是：

```typescript
type 类型别名 = 类型或表达式；
```

​	类型别名可以用于简单类型和自定义类型，也可以用于表达式。

```tsx
  type myfunc = () => string;
  type NameOrStringOrMyFunc = string | number | myfunc;
  function getName(n: NameOrStringOrMyFunc): string {
      if (typeof n === 'string') {
          return n;
      }
      else if(typeof n === 'number'){
          return n.toString();
      }
      else {
          return n();
      }
  }
  let a :string = "hello";
  let b: number = 999;
  let c = function () {
      return "hello my func";
  }
  console.log(getName(a));//hello
  console.log(getName(b));//999
  console.log(getName(c));//hello my func
```

​	最后，符号|也可以用于定义字符串字母量类型。这种类型用来约束字符的取值只能是某个字符串中的一个。

```typescript
 type EventNames = 'click' | 'dbclick' | 'mousemove';
 function handleEvent(ele: Element, event: EventNames) {
     console.log(event);
 }
 let ele = document.getElementById('div');//内置对象
 handleEvent(ele, 'click');  // 没问题
 handleEvent(ele, 'dbclick'); // 没问题
 handleEvent(ele, 'mousemove');  // 没问题
 handleEvent(ele, 'scroll'); // 不存在
```

**TypeScript中的type关键字**

- 类型别名

说明：字面意思，用来给一个类型起个新名字。常用于联合类型，使用如下。

```typescript
type str1 = string;
type str2 = ()=>string;   //此为函数类型形状，注意跟下面区分
type str = str1 | str2;

let s:str = "hello";
let s1:str = () =>"heihei";   //此为箭头函数
```

- 字符串字面量

```typescript
type Name = "xiaoming"|"xiaohong"|"xiaozhang";

let theName:Name = "xiaozhang";   //正常
let theName1:Name = "xiaoxue";   //报错！！！，只能为Name中字符串其一。
```

  

### 2.3.9 类型断言

Type Assert可以用来手动指定一个值的类型。类型断言的语法是：

- <类型>	值或对象
- 值或对象  as 类型

**提示：**在tsx语法（React jsx语法的ts版）中必须使用后者，因为<>有特殊意义。

​		类型断言一般和联合类型一起使用，可以将一个联合类型的变量指定为一个更具体的类型进行操作，从而可以使用特定类型的属性和方法。

```typescript
function getLength(a: string | number): number {
    //if ((a as string).length) {
    if ((<string>a).length) {
        return (<string>a).length;
    } else {
        return a.toString().length;
    }
}
console.log(getLength(6));//1
console.log(getLength("hello")); //5
```

**提示：**类型断言不是类型转换，且类型断言不能直接进行调用，需要放于条件判断中或者先将其转换为unknown再进行类型断言，如

```typescript
let a: string = 'hello';
console.log((<string><unknown>a).length)	//5

let a: number = 5;
console.log((<string><unknown>a).length)	//undefined
```



## 2.4 let与var

在javascript语言中，变量的声明会被提升（置顶）到声明所在的上下文，也就是说，

### 2.5.3 const声明变量

```typescript
interface Object {
    prop: string;
    func: () => string;
}
const foo: Object = {};
// 为 foo 添加一个属性，可以成功
foo.prop = "123";//说明值可以修改
foo.func = function (): string {
    return "hello";
}
// 将 foo 指向另一个对象，就会报错
foo = {}; //报错
const a:string[] = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

**提示：**在TypeScript中，Object类型的变量不能动态添加属性和方法，而只能通过接口扩展属性或者方法。

如果真的想将对象冻结，应该使用Object.freeze方法。

```typescript
const foo = Object.freeze([]);
foo.length = 1; //报错
```

### 2.6.6 等号运算符

== 在比较的时候会自动进行类型转换，而===比较严格，不会自动进行类型转换。

## 2.7 数字

### 2.7.1 Number的属性

| 属性      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| prototype | Number对象的静态属性。使用Prototype属性将新属性和方法分配给当前文档中的Number对象 |

### 2.7.3 prototype

在TypesScript中，函数可以直接用prototype对函数属性和方法进行扩展。

Number对象无法通过prototype直接添加属性和方法，如下所示：

```typescript
Number.prototype.prop2 = "3";	//错误
```

那么如何扩展Number对象呢？可以借助在Number接口interface上来进行扩展。

```typescript
interface Number {
    padLeft(chars: string, length: number): string;
}
Number.prototype.padLeft = function (chars: string, length: number): string {
    return (chars.repeat(length) + this); //this代码值
};
let a = 9;
console.log(a.padLeft("0", 3));//0009
```

## 2.8 字符串

### 2.8.2 prototype

**提示：**在TypesScript中，String.prototype不能直接添加新的属性和方法，这和javascript不一样。

如果需要动态地扩展String.prototype中的方法或属性，我们必须通过定义interface String来实现扩展。

```typescript
interface String {
    leadingChars(chars: string | number, length: number): string;
}
String.prototype.leadingChars = function (chars: string | number, length: number): string {
    return (chars.toString().repeat(length) + this).substr(-length);
};
let a = "@";
console.log(a.leadingChars("0", 8));//0000000@
```

### 2.8.3  字符串的方法

| 方法        | 说明                               |
| ----------- | ---------------------------------- |
| substr()    | 从开始索引取字符串中指定长度的字符 |
| substring() | 取字符串中两个指定索引之间的字符   |

# 第4章 数组、元组

## 4.1 数组

### 4.1.2 声明和初始化数组

```typescript
 let arrList: string[] = ["猪肉","鱼","虾","西红柿","黄瓜","白酒"];
 let arrList2 : number[] = [10,20,30,40];
 let arrList3 : boolean[] = [true,false];
 let arrList4: any[] = [10, "Jack", true];
 //let arrList5: object[] = [10, true, "Jack",];//错误
 let arrList6: object[] = [{age :2}, {age:20}];
 let arrList7: (string | number)[] = [1,"true"];
```

**提示：**object对象在typescript和javascript中是不同的，不能将字符类型或数值类型赋值给object类型变量。

### 4.1.4 数组对象

​	数组对象Array有一个prototype属性，在TypeScript中却不能直接向Array对象上动态添加属性和方法。可以借助interface Array<T>来实现。

```typescript
interface Array<T>{
    prop: string;
    log(msg: string):void ;
}
Array.prototype.prop = "扩展属性";
Array.prototype.log = function (msg: string) {
    console.log(msg);
}
let arrs = new Array();
console.log(arrs.log(arrs.prop));//扩展属性
let arrs2 = new Array();
console.log(arrs2.log(arrs2.prop));//扩展属性
```

判断一个对象是否为数组的方法？

1. Array.isArray()
2. arrs instance of Array                  //true or false
3. Object.prototype.toString.call(arrs)       //[object Array]

### 4.1.5 数组方法

```typescript
 let alpha = ["a", "b", "c"]; 
 let alpha2 = ["1", "2", "3"];
 let arrs = alpha.concat(alpha2); 
 console.log(arrs);    // ["a", "b", "c","1", "2", "3"]
 console.log(""+arrs);    // "a,b,c,1,2,3"
```

05行用""+arrs属于一个小技巧，可以将数组快速转成字符串，并用逗号分隔。

## 4.2 元组

数组合并了相同类型的对象，元组合并了不同类型的对象。

```typescript
let row: [number, string, number] = [1, "jack", 99];
```

**提示：**元组声明的时候[]中类型不能省略，且初始化的个数必须和声明中的类型个数一致，否则报错。

## 4.3 Iterator和Generator

​		迭代器和生成器是ES6规范中新引入的特性。

### 4.3.1 迭代器

​		迭代器是一种特殊对象，具有一些专门为迭代过程设计的专有接口。所有的迭代器对象都有一个next()方法，每次调用都返回一个结果对象。

​		结果对象有两个属性：一个是value，表示下一个将要返回的值；另一个是done，是一个boolean型的值。当没有更多可返回数据时返回true。

​		ES6中引入了一个生成器对象，它的主要作用就是让创建迭代器对象的过程变得更简单。迭代器一般是用生成器创建的。

### 4.3.2 生成器

​		Generator是一种返回Iterator的函数，通过function * 表示，函数中会用到关键字yield。

```typescript
// 生成器
function* genIterator(items) {
    let len = items.length;
    for (let i = 0; i < len; i++) {
        yield items[i];
    }
}
//
let iterator = genIterator([1,2,3]);
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next().done); // true
```

​		可迭代对象具有Symbol.iterator属性，是一种与迭代器密切相关的对象。Symbol.iterator通过指定的函数可以返回一个作用于附属对象的迭代器。所有的集合对象（如数组）和字符串都是可迭代对象，这些对象都有默认的迭代器。

​		通过Symbol.iterator获取数组的默认迭代器。

```typescript
let arrs= [1, 2, 3];
let iterator = arrs[Symbol.iterator]();
while (true) {
    let a = iterator.next();
    if (a.done) {
        break;
    }
    else {
         console.log(a.value); // 1 2 3
    }
}
```

​		给自己创建的对象添加迭代器，让它成为一个可迭代对象。

```typescript
//创建可迭代对象
let obj = {
    items: [1,2,3],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }
}
obj.items.push(4);
obj.items.push(5);
//tsc --target "es6" --sourcemap true  ts064.ts
//node ts064.js
for (let num of obj) {
    console.log(num);
}

1
2
3
4
5
```



# 第5章 函数

### 5.1.1 定义函数

函数声明示例

```typescript
 //命名函数
 function add(x:number, y:number):number{
     return x + y;
 }
```

函数表达式

```typescript
 //函数表达式(这里是匿名函数表达式)
 let add = function(x:number, y:number):number{
     return x + y;
 }
```

**提示：**函数表达式中，函数名只是函数体中的一个本地变量。外部并不能通过函数名来调用函数。

```typescript
let a = function add(x: number, y: number): number {
    return x + y;
}
console.log(a(2, 3)); //5
console.log(add(2, 3));//Cannot find name 'add'.ts(2304)
```

函数表达式一般都是匿名的，如果给出函数名，那么这个函数表达式则称为命名函数表达式（named function expression）。如果函数表达式中有递归场景，那么必须使用命名函数表达式。

```typescript
 //命名函数表达式
 let func= function factorial(n: number): number {
     if (n <= 1) {
         return 1;
     }
     else {
         return n * factorial(n - 1);//需要函数名factorial
     }
 }
 console.log(func(3));//6
```

被函数表达式赋值的变量会有一个name属性，如果把这个变量赋值给另一个变量，那么这个name属性的值也不会改变。

如果函数表达式中的函数式一个匿名函数，那么这个name属性的值就是被赋值的变量的名称。如果函数不是匿名的，那么name属性的值就是这个函数的名称。

```typescript
let add = function (n: number) {
    return n * 2;
}
console.log(add.name);//add
let add2 = add;
console.log(add2.name);//add
let add3 = function funcName(n: number) {
    return n * 2;
}
console.log(add3.name);//funcName
```

备注：在typescript@4.1.3中报错：

```sh
ts005.ts:4:17 - error TS2339: Property 'name' does not exist on type '(n: number) => number'.

4 console.log(add.name);//add
                  ~~~~

ts005.ts:6:18 - error TS2339: Property 'name' does not exist on type '(n: number) => number'.

6 console.log(add2.name);//add
                   ~~~~

ts005.ts:10:18 - error TS2339: Property 'name' does not exist on type '(n: number) => number'.

10 console.log(add3.name);//funcName
                    ~~~~


Found 3 errors.
```



### 5.1.2 调用函数

​	1. **函数模式**

**提示：**箭头函数this指向定义时所处的对象（宿主对象），而不是执行时的对象。

2. **方法模式**

​		函数被作为对象方法调用的时候，匿名函数和箭头函数表达式中的this指向什么呢？当用匿名函数赋值给方法时，this指向调用它的对象。当用箭头函数表达式赋值给方法时，this指向的是对象的父级中的this对象。

```tsx
let c = 0; //window.c 
let obj = {
    c : 2,
    add: (x: number, y: number) => x + y + this.c,
    add2: function (x: number, y: number) {
        return x + y + this.c;
    }
};
console.log(obj.add(2, 3));//5
console.log(obj.add2(2, 3));//7
```

3. **构造器模式**

   在构造函数中，函数体内的this是指自身的实例对象。



​		在setInterval和setTimeout中传入函数时，不管是在严格模式下还是在非严格模式下，函数中的this都指向window对象。

```typescript
 let age = 8;
 function Person() {
     //如果在构造函数调用，this为本身实例
     //如果是独立调用如Person()则this为window
     this.age = 0;
     setInterval(function () {
         // this指向window
         this.age++;
         //console.log(this);
         console.log(this.age);
     }, 1000);
 }
 //Person(); // 1,2,3,...
var p = new Person(); // 9,10,...
```

4. 上下文模式

```typescript
函数名.applay(对象，[参数1，参数2，...，参数n]);
函数名.call(对象，参数1，参数2，...，参数n);
```

提示：apply和call的第一个参数也可以是null.

```typescript
let numbers = [5, 458, 120, -215];
let maxNums = Math.max.apply(Math, numbers);  //458
let maxNums2 = Math.min.call(Math, ...numbers); //-215
console.log(maxNums);//458
console.log(maxNums2);//-215
```

提示：由于Math.max和Math.min求最大值最小值的时候和自身this并没有关系，因此也可以将第一个参数设置为null，不影响计算结果。



​		除了apply和call以外，bind方法也可以对函数进行调用。bind方法会创建一个新函数，成为绑定函数，当调用绑定函数时，bind方法的第一个参数用来指定this，第二个及以后的参数按照顺序作为原函数的参数来调用。

```typescript
let obj = {
    x: 99,
};
let foo = {
    getV: function (y: number) {
        return this.x + y;
    }
}
let newFunc = foo.getV.bind(obj, 2);
let a = newFunc();
console.log(a);//101
```

## 5.2 函数的参数

​	函数参数的数据类型省略时，默认是any类型，可以传入任意值。

**提示：**虽然参数类型可以省略，但是不建议省略，any类型将失去静态检测的功能。

### 5.2.1 可选参数

可选参数使用问号标识（？）来定义。

如果不显式传入可选参数，那么可选参数默认值是undefined。

```typescript
function func(a: string, b?: string) {
    if (b === undefined) {
        //避免 b = undefined
        b = ""; 
    }
    return a + " " + b;
}
let result1 = func("Jack"); // 正确
let result2 = func("Jack", "Adams", undefined); //错误，多一个参数
let result3 = func("Jack", "Adams"); //正确
let result4 = func("Jack", 2); // 错误，第二个参数类型不对
```

### 5.2.2 Rest参数（剩余参数）

​	Rest参数（剩余参数）可以接受函数的多余参数，组成一个数组，但必须放在形参的最后。Rest参数名前用...表示。

​	剩余参数的类型必须是数组类型的，不支持其他类型。

```typescript
function func(a: string, ...b: string[]) { 
    if (b === undefined) {
        //避免 b = undefined
        b = []; 
    }
    return a + " " + b;
}
let result1 = func("Jack"); // 正确 "Jack "
let result2 = func("Jack", "Adams", undefined); //正确 "Jack Adams,"
let result3 = func("Jack", "Adams","Smith"); //正确,"Jack Adams,Smith"
let result4 = func("Jack", 2); // 错误，第二个参数类型不对
```

### 5.2.3 默认参数

### 5.2.4 参数类型推断

### 5.2.6 类型注解

可以用冒号（：）在函数的参数后面指定类型，冒号和参数直接可以有一个空格。

以下代码，参数内联类型注解示例。

```typescript
let stu: {
    id: string,
    age: number,
    name: string
}
function print(student: {
    id: string,
    age: number,
    name: string
}) {
    console.log("name:" + student.name);
}
stu = {
    id: "001",
    age: 31,
    name: "jack"
}
print(stu);
//print({id: "001"}});//error
```

## 5.3 特殊函数

### 5.3.1 匿名函数

​	匿名函数仅在调用时才临时创建函数对象和作用域链对象。调用完成后，立即释放，所以匿名函数比非匿名函数更节省内存空间。

# 第7章 面向对象编程

## 7.2 类

### 7.2.3 访问类的属性和方法

```typescript
class Car {
    // 属性 
    engine: string = "V8发动机";
    // 构造函数 
    constructor(engine: string) {
        this.engine = engine;
    }
    // 方法 
    getEngine(): string {
        return this.engine;
    }
}
let aodiCar = new Car("奥迪V8");
console.log(aodiCar.engine);
console.log(aodiCar.getEngine());
```

**提示：**访问类的实例对象的属性和方法除了用符号.以外，还可以用[]。如`aodiCar["engine"]`和`aodiCar["getEngine"]()`。

### 7.2.6 装饰器

装饰器使用@expression这种形式类表示。expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息作为参数传入。



类装饰器、方法装饰器、访问装饰器、属性装饰器和参数装饰器。

类装饰器一般来说是在类名上添加装饰器，应用于类构造函数。

类装饰器示例代码

```typescript
@log
class Hello {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

function log(constructor: Function) {
    console.log("=========start=========");
    console.log("call constructor :"+ constructor.prototype.constructor.name);
    console.log("=========end===========");
}

let hello = new Hello("TypeScript!");
hello.greet();

// 输出
========start=========
call constructor :Hello
=========end===========
```

方法装饰器示例

```typescript

class Hello2 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    @writable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

function writable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("=========start=========");
        console.log(propertyKey);//greet
        console.log(target);//原型
        descriptor.writable = value;//false
        console.log("========end=========");
    };
}

let hello2 = new Hello2("TypeScript!");
hello2.greet();

//输出
=========start=========
greet
Hello2 { greet: [Function] }
========end=========
```

属性装饰器示例

```typescript

import  "reflect-metadata";

class Hello3 {
    @logType
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
function logType(target : any, key : string) {
    var t = Reflect.getMetadata("design:type", target, key);
    console.log(`${key} type: ${t.name}`);
  }

let hello3 = new Hello3("TypeScript!");
hello3.greet();

//输出
greeting type: String
```

### 7.2.9 类成员的可见性

默认情况下，TypeScript中的类成员都是public。

- public(默认)：公有，可以在任何地方被访问。

- protected:受保护，可以被自身及其子类访问。

- private:私有，只能被其定义所在的类访问。

  ```typescript
  class People {
      name: string;
      private age: number;
      constructor(name: string, age: number) {
          this.name = name;
          this.age = age;
      }
      protected walk() {
          console.log(this.name + " walk");
      }
      private eat() {
          console.log(this.name + " eating");
      }
      public getAge() {
          return this.age;
      }
  }
  class Student extends People {
      private clazz: string;
      constructor(name: string, age: number, clazz: string) {
          super(name, age);
          this.clazz = clazz;
          //this.age = 2;//private子类无法访问
      }
      public learn() {
          //super.eat();//private子类无法访问
          super.walk();//protected子类可以访问
          console.log(this.name + " learning");
      }
      protected display() {
          console.log(JSON.stringify(this));
      }
  }
  let studentA = new Student("jack", 17, "高三一班");
  // studentA.walk();//protected无法访问
  studentA.getAge();//public可以访问
  studentA.learn();//public可以访问
  //  studentA.display(); //protected无法访问
  ```

  protected和private一样，无法在People类的实例对象上进行访问。

  

如果在构造函数里面的参数用pulbic等访问修改，那么可以省略在类中显式地声明一个同名的属性。

```typescript
class MyEle {
    constructor(public height: number, private width: number) {
        this.height = height;
        this.width = width;
    }
    tostring() {
        return JSON.stringify(this);
    }
}
let e = new MyEle(200, 300);
console.log(e.height);
//console.log(e.width);//私有无法访问
```



## 7.3	接口

### 7.3.1 声明接口

类实现接口用关键字implements来表示。

```typescript
interface IConfigs {
    height: number;
    width: number;
}
interface IBase {
    id: string;
    name: string;
    tostring(): string;
}
class MyElement implements IConfigs, IBase {
    height: number = 200;
    width: number = 300;
    id: string = "";
    name: string = "myele";
    tostring() {
        return JSON.stringify(this);
    }
}
let e = new MyElement();
console.log(e.tostring());//{"height":200,"width":300,"id":"","name":"myele"}
```

接口还可以限定一个属性为只读的，只读属性用关键字readonly来指定。

```typescript
interface IBase {
    name: string;
    readonly author: string;//const不能用
    tostring(): string;
}
class MyElement implements IBase {
    //只读
    readonly author: string = "Jackwang";
    name: string = "myele";
    constructor(author: string, name: string) {
        this.author = author;//可以赋值
        this.name = name;
    }
    tostring() {
        return JSON.stringify(this);
    }
}
let e = new MyElement("jack", "div");
//e.author = "smith"; //只读属性，但生成的js文件可以修改
```

**提示：**类中只读属性除了在构造函数中进行赋值外，其他方法不允许修改只读属性的值。

### 7.3.2 Union Type和接口

接口中Union Type示例

```typescript
interface IBase {
    name: string;
    width: string | number;
    height: string | number;
}
class MyElement implements IBase {
    width: string | number = "200px";
    height: string | number = "300px";
    name: string = "myele";
    constructor(name: string, width: string | number, height: string | number) {
        this.name = name;
        this.width = width;
        this.height = height;
    }
}
let e = new MyElement("div", 200, "300px");
```

​		接口能描述各种各样的对象类型。除了描述带有属性的普通对象外，接口还可以描述函数类型。为了使用接口表示函数类型，我们需要给接口定义一个调用签名。

```typescript
interface IFunc {
    (width: string | number, height: string | number): boolean;
}
class MyElement {
    width: string | number = "200px";
    height: string | number = "300px";
    name: string = "myele";
    constructor(name: string, width: string | number, height: string | number) {
        this.name = name;
        this.width = width;
        this.height = height;
    }
    setLocation(func: IFunc): boolean {
        return func(this.width, this.height);
    }
}
let e = new MyElement("div", 200, "300px");
e.setLocation(function (w, h) {
    console.log(w);
    console.log(h);
    return true;
});
```

### 7.3.4 接口的继承

```typescript
interface IBase {
    color: string;
    name: string;
}
interface IShape {
    x: number;
    y: number;
}
interface ICircle extends IShape, IBase {
    radius: number;
}
let circle = <ICircle>{};
circle.color = "blue";
circle.radius = 10;
circle.x = 0;
```

接口除了可以继承接口外，还可以继承自类。



### 7.3.5	类也可以实现接口

除了抽象类实现接口功能外，还可以直接对类进行implements来实现模拟接口功能。

```typescript
class Disposable {
     isDisposed: boolean;
     dispose() {
         this.isDisposed = true;
     }
 }
 class Selectable {
     isActive: boolean;
     activate() {
         this.isActive = true;
     }
 }
 class SmartObject implements Disposable, Selectable {
     //实现 Disposable
     isDisposed: boolean = false;
     dispose: () => void;
     //实现Selectable
     isActive: boolean = false;
     activate: () => void;
 }
 let obj = new SmartObject();
 obj.activate();
```

把类当成了接口，仅使用Disposable和Selectable的类型而非实现。这意味着需要在SmartObject类里面实现Disposable和Selectable提供的接口。

## 7.4	命名空间

### 7.4.1 定义命名空间

TypeScript中命名空间使用namespace关键字来定义。

```typescript
namespace com.wyd.demo {
    interface IPeople {
        id: string;
        name: string;
        learn();
    }
    export class Man implements IPeople {
        public id: string = "";
        public name: string = "";
        constructor(id: string, name: string) {
            this.id = id;
            this.name = name;
        }
        learn() {
            console.log(this.name + " learning");
        }
    }
}
let man = new com.wyd.demo.Man("001", "jack");
man.learn();
```

如果需要在命名空间外调用Man类或者IPerson接口，则需要在Man类或者IPerson接口前添加export关键字。

由于不同文件之间存在依赖关系，因此需要加入引用标签来告诉编译器文件之间的关联。引用标签用/// <reference path="xxx.ts" />来表示。

```typescript
/// <reference path="namespacedemo.ts" />
namespace com.wyd.demo {
   export function callNS(){
        let man = new Man("001", "jack");
        man.learn();
    } 
}
com.wyd.demo.callNS();
```

### 7.4.2 嵌套命名空间

​		命名空间支持嵌套，即可以将命名空间定义在另外一个命名空间里。

```typescript
namespace com.wyd {
    //嵌套时，export不可少
    export namespace nested {
        export function callNS() {
            //com.wyd.demo.Man
            let man = new demo.Man("001", "jack");
            man.learn();
        }
    }
}
//命名空间别名
import myNS = com.wyd.nested;
com.wyd.nested.callNS();
myNS.callNS();
```

## 7.5 外部模块

### 7.5.1 模块加载器

​		模块加载器一般分为供浏览器端使用的AMD规范和CMD规范、供服务器端使用的CommonJS规范以及跨浏览器端和服务器端的UMD规范。

1. AMD规范

2. CMD规范

3. CommonJS规范

   NodeJS是CommonJS规范的实现，而webpack打包工具也是原生支持CommonJS规范的。

   由于CommonJS是同步加载模块的，因此CommonJS是不适用于浏览器端的。

   提示：虽然CommonJS编写的模块不适用于浏览器端，但是可以借助工具进行格式转换，从而适用浏览器端。

   Browserify是目前常用的CommonJS格式转换工具。

4. UMD规范
5. SystemJS规范
6. ES6规范

### 7.5.2 定义外部模块

若在vscode中运行js文件，可以使用Code Runner工具包。快捷键Ctrl+Alt+N运行，Ctrl+Alt+M结束运行。

## 7.6 TypeScript如何解析模块

## 7.7 声明合并

​		在TypeScript中，声明合并是指编译器将针对同一个名字的两个独立声明合并为单一声明，合并后的声明同时拥有原先两个声明的特征。任何数量的声明都可以被合并。

### 7.7.1 合并接口

### 7.7.2 合并命名空间

### 7.7.3 合并命名空间和类

```typescript
namespace MyAlbum {
    export class show { }
}
class MyAlbum {
    label: MyAlbum.show;
}
```

### 7.7.4 全局扩展

全局扩展示例代码：globalExt.ts

```typescript

import { MyObject } from "./moduleA";
declare global {
    interface Window {
        jYd: any;
    }
    interface String {
        myExtMethod: () => void;
    }
    //全局变量
    const globalVar = 1;
}
//global需要
export {}

window.jYd;
"hello".myExtMethod();
globalVar;
```

用declare global来声明全局扩展的属性和方法。

另外，在ts中的已有模块也可以进行扩展。

moduleA.ts

```typescript
export class MyObject<T> {
    name:string = "";
}
```

已有模块的扩展示例：moduleExt.ts

```typescript

import { MyObject } from "./moduleA";
declare module "./moduleA" {
    interface MyObject<T> {
        getName():string;
    }
}
MyObject.prototype.getName = function () {
   return this.name;
}

let myobj = new MyObject();
myobj.getName();
```

# 第8章 泛型

## 8.3 详解泛型函数

泛型函数中使用类型断言的示例代码：ts006.ts

```typescript
function echo<T>(msg: T): T {
    if (typeof msg === "string") {     
      
        console.log((<string><unknown>msg).length);
    }
    else if (typeof msg === "number") {
        console.log((<number><unknown>msg).toFixed(2));
    }
    else {
        console.log(typeof msg);
    }
    return msg;
}
echo("222"); //3
echo(222); // 222.00
```

**提示**：(`<string><unknown>msg`也可以写成`<string>msg`)。

## 8.5 泛型约束

泛型约束语法为：

```typescript
T extends 接口或类
```

泛型接口示例代码：ts011.ts

```typescript
interface IGeneric {
    length: number;
}   
```

泛型约束类示例代码：ts012.ts

```typescript
 
  class GenericAdd<T extends IGeneric> {
    arg: T;
    add(arg: T): boolean {
        this.arg = arg;
        arg.length++;
        return true;
    }
    getLength() {
        return this.arg.length;
    }
}
```



型约束类示例代码：ts013.ts

```typescript
class ObjLen {
    length = 2;
    name = "obj";
}
let obj = new ObjLen();
let geDao = new GenericAdd<ObjLen>().add(obj); //OK
let geDao2 = new GenericAdd<string>().add("hello"); //OK
//let geDao3 = new GenericAdd<number>(); //报错，没有length属性
```

除了用接口作为泛型约束外，还可以用一个类型参数来约束另外一个类型参数。

泛型约束之间的约束示例代码：ts014.ts

```typescript
//索引类型(Index types)
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
let obj = { a: 1, b: 2, c: 3, d: 4 };
let x = getProperty(obj, "a"); // 1
let m = getProperty(obj, "m"); // 错误
```

这里keyof T是索引类型查询操作符。对任何类型T，keyof T的结果为T上已知的公共属性名的联合。K extends T约束了K是T的公共属性。

# 第9章 TypeScript声明文件与项目配置

## 9.1 声明文件

​		 TypeScript作为JavaScript的超集，在开发过程中不可避免要引用第三方的JavaScript库。我们希望引入的第三方库可以像TypeScript一样，能进行静态类型检测和代码智能提示。

​		为了解决这个问题，我们需要将这些JavaScript库中的函数和方法进行移除，只保留需要对外导出的类型声明即可。这个类型声明就是声明文件，扩展名是d.ts。声明文件可以描述JavaScript库的模块信息。通过引用这个声明文件，可以利用TypeScript的静态类型检查来为我们调用这些库服务。

​		声明文件模板：https://www.tslang.cn/docs/handbook/declaration-files/templates.html

### 9.1.1 全局库

全局库就是在顶层全局对象window下访问的库，比如jquery库中的$符号就是一个全局变量。

声明文件扩展名必须是d.ts。

声明文件中的类型用declare关键字来声明。

<center>jTools.d.ts</center>

```typescript
/**
 * 全局库jTools.js
 */
declare namespace jTools {
    const version: string;
    const author: string;
    function toString(obj:any):string;
    /**
     * 根据ID获取DOM元素
     * @param id DomID注意不带#
     */
    function $(id:string):any;
}
```



### 9.1.2 模块化库

​		在TypeScript 2.0以后，获取、使用和查找声明文件变得非常容易。只需要简单的几步即可完成相关库声明文件的导入工作。

​		当前使用TypeScript版本是3.3，获取声明文件只需要使用npm命令直接安装即可。获取Jquery库的声明文件命令为：

```bash
npm install --save @types/jquery
```

​		大多数情况下，类型声明包的名字总是与它们在npm上的包的名字相同，但是有@types/前缀。

## 9.2 项目配置

如果一个目录中存在tsconfig.json文件，就意味着这个目录是TypeScript项目的根目录。

<center>常用tsc编译器选项</center>

| 选项     | 类型   | 默认值            | 描述                                                         |
| -------- | ------ | ----------------- | ------------------------------------------------------------ |
| --module | string | "es6"或"commonjs" | 指定生成模块系统。当target为es6时，默认为es6，否则默认为commonjs. |
| --target | string | "ES3"             | 指定ECMAScript目标版本"ES3"（默认）、"ES5"、"ES6"/"ES2015"、"ES2016"、"ES2017"或"ESNext" |
|          |        |                   |                                                              |



## 9.3 项目引用

​		tsconfig.json的顶层属性references是一个数组，可以用来指定要引用的项目。references中的path属性可以指向包含tsconfig.json文件的目录，或者直接指向项目配置文件本身。

```json
{
    "references": [{
        "path": "./common"
    },
    {
        "path": "./server"
    },
    {
        "path": "./client"
    }],
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "sourceMap": true
  
    }
}
```



## 9.4 三斜线指令

​		三线指令可以作为编译器指令使用，reference三线指令主要用来确定依赖关系。

```typescript
/// <reference path="..." />

/// <reference types="..." />

/// <reference no-default-lib="true" />

/// <amd-module />
```



# 第10章 实战：使用TypeScript+Node创建列表APP

