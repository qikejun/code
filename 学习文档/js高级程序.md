##严格模式

>支持严格模式的浏览器

IE10，Firefox4+，Safari5.1+，Opear12+，Chrome

>变量声明

	var name;
	var age
	
	alert(name); 	//"undefined"
	alert(age); 	//报错
	
	alert（typeof name）; 	//"undefined"
	alert(typeof age);		//"undefined"

>null值标识一个空对象指针

	var a=null；
	alert(typeof a); 	//"object"

>Boolean()转换方法

	alert(Boolean());		//false
	alert(Boolean(-1));
	alert(Boolean(NaN));	//false
	alert(Boolean(0));	
	alert(Boolean(""));		//true
	alert(Boolean(undefined));
	alert(Boolean([]));		//true
	alert(Boolean({}));		//true
	alert(Boolean(null));

>作用域链

挡代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。