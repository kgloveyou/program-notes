# TypeScript 从入门到精通图文视频教程-免费教程

https://jspang.com/detailed?id=63

## 1、TypeScript简介和环境搭建

ts编译后生成的js，可以直接用node运行。

type-node可以直接运行ts代码。

```bash
npm install -g type-node
```

安装完毕后，运行

```bash
ts-node Demo1.ts
```

## 04.TypeScript 中的类型注释和类型推断

[工作使用问题（潜规则）](https://jspang.com/detailed?id=63#toc314)

- 如果 `TS` 能够自动分析变量类型， 我们就什么也不需要做了
- 如果 `TS` 无法分析变量类型的话， 我们就需要使用类型注解

## 05.TypeScript 函数参数和返回类型定义

### 函数参数为对象(解构)时

错误方式：

```tsx
function add({ one: number, two: number }) {
  return one + two;
}

const total = add({ one: 1, two: 2 });
```

正确方式：

```typescript
function add({ one, two }: { one: number, two: number }): number {
  return one + two;
}

const three = add({ one: 1, two: 2 });
```

## 08.TypeScript 中的 interface 接口

```typescript
interface Girl {
  name: string;
  age: number;
  bust: number;
}
```

注意：接口中的字段后面是分号。

## 09.TypeScript 中的 interface 接口 2

### 允许加入任意值

```typescript
interface Girl {
  name: string;
  age: number;
  bust: number;
  waistline?: number;
  [propname: string]: any;
}
```

## 12.TypeScript 类的构造函数

```typescript
class Person{
    public name :string ;
    constructor(name:string){
        this.name=name
    }

}

const person= new Person('jspang')
console.log(person.name)
```

可以简写成

```typescript
class Person{
    constructor(public name:string){
    }
}

const person= new Person('jspang')
console.log(person.name)
```

这种写法就相当于你定义了一个`name`,然后在构造函数里进行了赋值，这是一种简化的语法，在工作中我们使用这种语法的时候会更多一些。

**类继承中的构造器写法**

```typescript
class Person{
    constructor(public name:string){}
}

class Teacher extends Person{
    constructor(public age:number){
        super('jspang')
    }
}

const teacher = new Teacher(18)
console.log(teacher.age)
console.log(teacher.name)
```

这就是子类继承父类并有构造函数的原则，就是在子类里写构造函数时，必须用`super()`调用父类的构造函数，如果需要传值，也必须进行传值操作。就是是父类没有构造函数，子类也要使用`super()`进行调用，否则就会报错。

## 13.TypeScript 类的 Getter、Setter 和 static 使用

**类的 Getter 和 Setter**

```typescript
class Xiaojiejie {
  constructor(private _age:number){}
  get age(){
      return this._age-10
  }
  set age(age:number){
    this._age=age
  }
}

const dajiao = new Xiaojiejie(28)
dajiao.age=25
console.log(dajiao.age)
```

## 15.配置文件-初识 tsconfig.json

**生成 tsconfig.json 文件**

这个文件是通过`tsc --init`命令生成的

## 18.联合类型和类型保护

类型保护有很多种方法，这节讲几个最常使用的。

- 类型保护-类型断言

  ```typescript
  interface Waiter {
    anjiao: boolean;
    say: () => {};
  }
  
  interface Teacher {
    anjiao: boolean;
    skill: () => {};
  }
  
  function judgeWho(animal: Waiter | Teacher) {
    if (animal.anjiao) {
      (animal as Teacher).skill();
    }else{
      (animal as Waiter).say();
    }
  }
  ```

- 类型保护-in 语法

  ```typescript
  function judgeWhoTwo(animal: Waiter | Teacher) {
    if ("skill" in animal) {
      animal.skill();
    } else {
      animal.say();
    }
  }
  ```

- 类型保护-typeof 语法

  ```typescript
  function add(first: string | number, second: string | number) {
    if (typeof first === "string" || typeof second === "string") {
      return `${first}${second}`;
    }
    return first + second;
  }
  ```

- 类型保护-instanceof 语法

```typescript
function addObj(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
```

## 25. 用 Parcel 打包 TypeScript 代码

`Parcel`会自动对`index.html`中引入的`TypeScript`文件进行编译，然后打包好后，就可以直接使用了。