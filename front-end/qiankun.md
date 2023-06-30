# 基于 qiankun 的微前端应用实践

https://musicfe.com/qiankun-practice/

# 基于 qiankun 的 CMS 应用微前端实践

https://musicfe.com/qiankun-cms/

集成访问时，去掉头部和侧边栏。

```jsx
if (window.__POWERED_BY_QIANKUN__) { // eslint-disable-line
    return (
        <BaseLayout location={location} history={history} pms={pms}>
            <Fragment>
                {
                    curMenuItem && curMenuItem.block
                        ? blockPage
                        : children
                }
            </Fragment>
        </BaseLayout>
    );
}
```

集成访问时，屏蔽权限和登录请求，接收主应用传递的权限和菜单数据。

```jsx
useEffect(() => {
    if (login.status === 1) {
        history.push(redirectUrl);
    } else if (pms.account) { // 集成访问，直接设置数据
        dispatch('Login/success', pms.account);
        dispatch('Login/setPrivileges', pms.privileges);
    } else { // 独立访问，请求数据
        loginAction.getLoginStatus().subscribe({
            next: () => {
                history.push(redirectUrl);
            },
            error: (res) => {
                if (res.code === 301) {
                    history.push('/login', {
                        redirectUrl,
                        host
                    });
                }
            }
        });
    }
});
```

集成访问时，更改 react-router base。

```jsx
export const mount = async (props) => {
    const history = createBrowserHistory({ basename: Config.qiankun.base });
    ReactDOM.render(
        <Provider store={store()}>
            <Symbol />
            <Router path='/' history={history}>
                {routeChildren(props)}
            </Router>
        </Provider>,
        props.container.querySelector('#container') || CONTAINER
    );
};
```

# qiankun.js微前端改造注意事项

https://juejin.cn/post/6930921099869978632

# qiankun 微前端指南

https://juejin.cn/post/7064823546471514126