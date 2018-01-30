function   A(){	

​	console.log('new');

}

let  a=new A();

//new做了什么操作

```
function newA(constructor,...arguments){
	var obj={}
    Object.setPrototypeOf(obj,constructor.portotype)
    return constructor.apply(obj,arguments)||obj
}
```

