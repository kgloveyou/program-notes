# How to Store and Read Configuration Files Using React

- Sep 14, 2020
- 4 Min read
- 33,617 Views

Web DevelopmentFront End Web DevelopmentClient-side FrameworksReact

https://www.pluralsight.com/guides/how-to-store-and-read-configuration-files-using-react

## Introduction

Developers prefer working with React because it gives them flexibility in building their apps. In React, all UI components can be separated and hence are the building blocks for the whole app. In some cases, a developer might want to manage a static global variable across different components. Ideally, this variable would be a constant that could store data such as the app URL, server URL, theme colors, etc.

In this guide, you will learn how to store a configuration file in your project root and read values from it in React.

## Using a JSON File

You can store the configuration data in a JSON file.

```json
{
  "SERVER_URL": "https://example.com/api/",
  "THEME_COLORS": {
    "PRIMARY": "#007bff",
    "SECONDARY": "#fc3"
  }
}
```

Just like a component, the JSON file can be loaded using the `import` statement.

```js
import configData from "./config.json";
```

And then you can use the data as any other JavaScript object. For example, `configData.SERVER_URL` will give you the server URL specified in the **config.json** file.

## Using .env File

A **.env** file lets you create environment variables that work similarly to variables declared in your local JavaScript files but are accessible globally. An environment variable is read-only. That means you cannot change it dynamically in your JavaScript files.

To declare environment variables, create a .env file in the root of your React project. Note that the environment variables in React must be prefixed with `REACT_APP_`, otherwise React will ignore the variable during bundling.

```
REACT_APP_SERVER_URL=https://example.com/api/
REACT_APP_CLIENT_ID=1097hy67546hbdy2
```

Now you can access these variables directly using the `process.env` global object, without adding any import statements.

```js
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
```

You can also create temporary environment variables using the terminal.

For Windows:

```sh
set "REACT_APP_CLIENT_ID=1097hy67546hbdy2" && npm start
```

For Linux:

```sh
REACT_APP_CLIENT_ID=1097hy67546hbdy2 npm start
```

Note that environment variables created using a terminal are short-lived and are only available for that terminal session.

You can also have different values for your environment variables based on the current environment. For a development environment, you can store the variables in `.env.development`. Similarly, for a production setting, you can keep the variables in `.env.production`.

You can refer to the [dotenv](https://github.com/motdotla/dotenv) documentation for more details.

## Using Webpack

In webpack, there is a configuration option called externals, which provides a way of excluding dependencies from the bundles. Using the externals option, you can add configuration data for your application that can be accessed anywhere in the JavaScript files.

In your webpack.config.js file, add an `externals` options and set its value to an object containing the config data.

```js
{
    //
    externals: {
        'ConfigData': {
            clientID: '1097hy67546hbdy2',
            serverURL: 'https://example.com/api/'
        }
    }
}
```

Then in your JavaScript file, access the `ConfigData` object by importing it as an external module.

```js
import ConfigData from "ConfigData";

console.log(ConfigData.clientID); // 1097hy67546hbdy2
```

## Conclusion

There are many different ways of storing config data in a React app. But keep in mind that since React works on the browser, anyone can inspect the source code of your app and see all the data. So make sure you do not store sensitive information, such as private or secret API keys in client-side config files, as they get bundled to the source during the build process.

Having a separate configuration file allows you to access variables instantly and improves the maintainability of the codebase since all the variables are in the same file. The core application will remain intact, and you can deploy to different servers with different configurations quickly.

