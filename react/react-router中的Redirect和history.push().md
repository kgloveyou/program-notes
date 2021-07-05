# react-router中的Redirect和history.push()

[How can I redirect to an absolute path with react-router v4?](https://stackoverflow.com/questions/45197295/how-can-i-redirect-to-an-absolute-path-with-react-router-v4)

```jsx
<Redirect to="/en/login"/>
```

to中的路径不能使用绝对路径，实际跳转的地址是`${basename}/en/login`.



如果要使用绝对路径，方法如下：

You can do it without react router:

```js
window.location.pathname = '/en/login';
```

Navigating away to a different site is using:

```js
window.location.href = 'https://stackoverflow.com';
```



https://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html

**提醒**：绝对路径可能在[动态路由](https://react-guide.github.io/react-router-cn/docs/guides/basics/docs/guides/advanced/DynamicRouting.md)中无法使用。



[React-Router External link](https://stackoverflow.com/questions/42914666/react-router-external-link)

Here's a one-liner for using React Router to redirect to an external link:

```js
<Route path='/privacy-policy' component={() => { 
     window.location.href = 'https://example.com/1234'; 
     return null;
}}/>
```

It uses React pure component concept to reduce the component's code to a single function that, instead of rendering anything, redirects browser to an external URL.

Works both on React Router 3 and 4.



`window.location.href` is not optimal. If the user clicks the browser 'back' button after being redirected, she will get to the route that will immediately redirect her again. To avoid this, better use `window.location.replace()`. Source: [stackoverflow.com/a/506004/163411](https://stackoverflow.com/a/506004/163411) – [targumon](https://stackoverflow.com/users/163411/targumon) [Dec 17 '20 at](https://stackoverflow.com/questions/42914666/react-router-external-link#comment115520136_44563899)



To expand on Alan's answer, you can create a `<Route/>` that redirects all `<Link/>`'s with "to" attributes containing 'http:' or 'https:' to the correct external resource.

Below is a working example of this which can be placed directly into your `<Router>`.

```js
<Route path={['/http:', '/https:']} component={props => {
  window.location.replace(props.location.pathname.substr(1)) // substr(1) removes the preceding '/'
  return null
}}/>
```

