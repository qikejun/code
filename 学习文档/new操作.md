### new 运算符是用来实例化一个类，从而在内存中分配一个实例对象



```
function   A(){	
	console.log('new');
}

let  a=new A();

```

//new做了什么操作

> > 用伪代码描述new 过程中的操作

```
new A(constructor,...arguments)={
	var obj={}；//创建一个空对象
    
    obj.__proto__ = A.prototype;
    
    //Object.setPrototypeOf(obj,constructor.portotype)
    
    //把obj的__proto__ 指向Animal的原型对象prototype，
    //此时便建立了obj对象的原型链：obj->A.prototype->Object.prototype->null
    
    return constructor.apply(obj,arguments)||obj
}
```

·