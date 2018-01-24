#### let变量声明

​	let的变量声明不会变量提升

	function  f() {
		//暂时性死区
		//x=12;	// ReferenceError
		//console.log(x); // ReferenceError
		//暂时性死区
		let x;
		console.log(x); //undefined
		x=13;
		console.log(x);//13
	}
注意：同一块作用域下不能同时声明同名的变量，否则会报错(Uncaught SyntaxError: Identifier 'x' has already been declared)

#### rest参数

`function f(...arr){}`

``````
function f(x,y,...arr){
}
``````

注意：rest参数必须是最后一个

``````
function f2(...[x,y]){
  console.log(x);
  console.log(y);
};
f2(2,3);
``````



注：当rest为一个数组时，调用函数时会忽略除了当前数组中个数的参数；少于数组个数时，元素变量会默认为undefined

#### 函数参数默认值

注：函数有参数被调用时,没有传参。会声明当前函数的局部变量

​	函数参数未设置默认值是为undefined；

```
function f(x){
  console.log(x);//undefined
}
f();
function f1(x1=12){
  console.log(x1);//12
}
f1();
console.log(x1);//ReferenceError 声明一个局部变量
function f2(x2=fx()){
 console.log(x2);//12341234
}
f2();
function fx() {
  return 12341234;
}
function f3(x=3,y=x+2){
  consoel.log(y+x);//8
}
f3();
```

#### 函数中的arguments对象

arguments对象不是数组，不能直接执行unshift，shift，push，pop，slice[使用call，apply调用]

```
function add(num1, num2) {
    var arg = Array.prototype.slice.call(arguments);
    console.log(arg.pop());
}
```

es6中from转换为数组

```
function add(num1, num2) {
    var arg = Array.from(arguments);
    console.log(arg.pop());
}
```



```
function add(num1, num2) {
    arguments[0] = 15;//num1的值被更新
    var res = num1 + num2;//15+8
    return res;
}
var r = add(7, 8);
console.log(r);//23
```

#### 简化函数提升

关于js的

1.变量声明赋值

```
无论何时用var声明一个变量，JavaScript解释器都将其分成两个语句：

- 声明一个变量。
- 赋值。
注：
var x = y, y = 'A';
console.log(x + y); // undefinedA
解析执行过程：
  var x；
  var y；
  x=y;
  y='A';
  console.log(undefined+'A');

【解释】：按照顺序先声明x,y两个变量，然后开始从上向下执行，x赋值为y（这时y，被声明没有被赋值所以是undefined）即给x赋值为undefined，给y赋值为'A',然后在console.log(undefined+'A')
注：变量的声明位于执行上下文的顶部，而赋值发生在创建变量的位置。
```

注：const ，let的声明不会提升；

```'
function f(){
  console.log(A);
  const A=123;
}
f();// Uncaught ReferenceError: A is not defined
function f(){
  A = 1234;
  console.log(A);
  const A=123;
}
f();//Uncaught ReferenceError: A is not defined
注：将上面的cosnt换成let报同样的错
```

2.JavaScript中的函数提升

```
在JavaScript中，可以通过两种方式来创建函数：

- 作为声明而创建的函数。
function f(){
	console.log('f');
}
new Function(f1,'console.log('f1');')
- 作为表达式而创建的函数。
var f2= function (){
  console.log('f2');
}
注：表达式创建函数涵义：其实就是先声明了变量（var f2,let f2）或常量（const f2），所谓的函数声明提升其实是变量的提升（var f2），只有在当前变量在赋值为函数时才能正确调用，【let,const的声明不会提升】；

函数声明提升的涵义：作为声明或语句创建的函数作为一个整体提升到执行上下文的顶部。但是，作为表达式创建的函数会像变量一样提升。

```

3.函数特殊声明

```
function f(){
  console.log('f函数')；
}
f();//
var f=function(){
  console.log('f变量')；
};
f();//
```



#### 箭头函数

基本写法：

```
var add = (num1, num2) => { return num1 + num2; };
//简写省略return
var add = (num1, num2) => num1 + num2;
//使用rest参数
var add = (...arr) => arr[0] + arr[1];
var a=add(2,3);
console.log(a);//5

```

注：箭头函数本身没有this，箭头函数中的this值总是从封闭范围继承。在JavaScript中，每个函数都有它自己的this值，这取决于代码是如何调用函数的。

```
var obj={
  name:'f',
  fn:function(){
    console.log(this);//obj
    var fx=()=>console.log(this);//obj
    fx();
  }
}
obj.fn();
```

使用箭头函数的限制条件

- 箭头函数没有参数对象。

- 箭头函数不能与新运算符一起使用，因此它不能用作构造函数。

- 箭头函数没有原型属性

  ```
  var f=(x,y)=>console.log(x+y)；
  var f1=new f(1,2);//TypeError:f is not constructor
  ```

  ```
  var f=(x,y)=>console.log(x+y)；
  console.log(f.prototype);//undefined
  ```

  ​


#### 对象属性描述符

```
var obj={name:"test"};
var o=Object.getOwnPropertyDescriptor(obj,'name');
console.log(o);
//{
    value: "test",
    writable: true,//属性的值是否可以更改
    enumerable: true,//属性的其他特征是否可以配置
    configurable: true
}
```

可以使用Object.defineProperty更改writable、enumerable和configurable特征的值。

writable:属性的值是否可以更改

```
'use strict';
var obj={name:"test"};
Object.defineProperty(obj,'name',{writable:false});
console.log(obj.name);//test
obj.name= 'pp';//error Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
【只有在严格模式下报错】：错误消息是不能赋值到一个对象的只读属性；
```

configurable:属性的特征属性是否可以修改(一旦修改为false，就无法再修改为true)

```
var obj={name:"test"};
Object.defineProperty(obj, 'name', { configurable: false });
Object.defineProperty(obj, 'name', { enumerable: false });
//Uncaught TypeError: Cannot redefine property: name
```

```
var obj={name:"test"};
Object.defineProperty(obj, 'name', { configurable: false });
Object.defineProperty(obj, 'name', { configurable: true });
//Uncaught TypeError: Cannot redefine property: name
```

```
var obj={name:"test"};
Object.defineProperty(obj, 'name', { configurable: false });
Object.defineProperty(obj, 'name', { writable: false });
console.log(obj.name);//test
obj.name= 'pp';
delete obj.name
【注】：'use strict'模式下（赋值，删除都会报错）Uncaught TypeError: Cannot delete property 'name' of #<Object>
非'use strict'：删除不能成功删除，返回false；赋值：将writable属性设置为false时无法赋值，为true是可以重新赋值

```

enumerable：是否可枚举

```
var obj={name:"test",age:24};
Object.defineProperty(obj, 'name', { enumerable: false });
for(let key in obj){
  //只能遍历到age属性
}
检查某个对象属性是否可枚举
obj.propertyIsEnumerable('name');//true
```

#### javaScript中的类

ES6 引入class关键创建js中的类；

类的声明：类声明和类表达式来创建

```
class D{};
var D=class{};
```

javaScript类中三种类型方法

- 构造方法。

  ```
  class D {
    constructor(name,age) {
      this.name=name;
      this.age=age;
    }
  }
  ```

  类构造函数方法创建初始化对象。一个类只能有一个构造方法。

- 静态方法

  ```
  class D {
    static f() {
      console.log('static');
    }
  }

  ```

  静态方法是用类内部调用的，l类的实例方法无法调用；

- 原型方法。

  ```
  class D {
    constructor(name,age) {
        this.name=name;
        this.age=age;
      }
    static f() {
      console.log('static');
    }
    f1() {
      console.log('f1');
    }
  }
  var d=new D();
  d.f1();//f1
  console.log(typeof (D));//function
  注：类只是一个函数类型，所以和其他函数一样，它也有一个prototype属性。这些常规的方法是类的原型对象的方法，因此它们被称为原型方法。它们可以在类创建实体时，实例继承这些方法。
  ```

  类实例访问的类中常规方法为原型方法。这些方法可以继承。








