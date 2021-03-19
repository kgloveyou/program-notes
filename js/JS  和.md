# JS: || 和 ??

# ||

```javascript
function(obj){
    var a = obj || {}
}
```
等价于
```js
function(obj){
    var a;
	if(
		obj === 0 || 
		obj === "" || 
		obj === false || 
		obj === null || 
		obj === undefined
	){
 		a = {}
 	} else {
		a = obj;
	}
}
```

# ??

```js
function(obj){
    var a = obj ?? {}
}
```

等价于

```js
function(obj){
    var a;
	if( 
		obj === null || 
		obj === undefined
	){
 		a = {}
 	} else {
		a = obj;
	}
}
```

