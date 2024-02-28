https://segmentfault.com/a/1190000041563197

## 环境和依赖

-   umi 3.5.0

## 场景

[Ant Design Pro的文档](https://pro.ant.design/zh-CN/docs/new-page/)介绍了配置菜单icon的方法，需要在 routes.ts 中设置icon属性，但只能使用antd的icon或者使用 iconFont，如果我想直接使用设计师提供的svg图片作为菜单图标，应该怎么办呢？本文提供了一种解决方案

## 步骤

1.  引入需要用到的svg
    
    ```javascript
    // MenuIcon.tsx
    import { ReactComponent as IconPerson } from '@/assets/icons/menu/person.svg';
    import { ReactComponent as IconHome } from '@/assets/icons/menu/home.svg';
    
    export const IconMap = {
     person: IconPerson,
     home: IconHome,
    };
    ```
    
2.  编辑app.tsx
    
    ```javascript
    import { IconMap } from '@/components/MenuIcon';
    import Icon from '@ant-design/icons';
    
    // ...
    export const layout: RunTimeLayoutConfig = ({ initialState }) => {
     return {
     // ...
     menuDataRender: (menuData) => {
       return menuData.map((item) => {
         return {
           ...item,
           icon:
             typeof item.icon === 'string' && item.icon.indexOf('|svg') > -1 ? (
               <Icon component={IconMap[item.icon.replace('|svg', '')]} style={{ fontSize: 14 }} />
             ) : (
               item.icon
             ),
         };
       });
     },
     // ...
     };
    };
    // ...
    ```
    
3.  在route.ts中配置icon
    
    ```typescript
    export default [
     {
       path: '/home',
       name: '首页',
       icon: 'home|svg',
       component: './personnel-management/index',
     },
     {
       path: '/personnel-management',
       name: '人员管理',
       icon: 'person|svg',
       component: './personnel-management/index',
     },
    ];
    ```
    

## 小提示

要使得svg图片的颜色能够根据菜单状态变化，设计师提供的svg不能写死颜色哦