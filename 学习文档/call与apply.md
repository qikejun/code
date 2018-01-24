##call与apply

>1.call与apply（数组）区别只是传参不同
>代码示例
	
	document.getElementById =(function(func){ 
		return function(){
			return func.apply(document,arguments);
		}
	})(document.getElementById);

	var getId = document.getElementById;
	//getId方法是普通调用所以this是window但我们期望的是当前指向document所以使用apply改变指向
	var div = getId('div1');	

>2.call与apply之借刀杀人（借用其他对象的方法，处理当前对象）

Math.max.apply(null,[1,2,3,4,5]);//输出 5 (第一个参数为null时，call，apply指向默认的调用方法的对象)

>call与apply的作用

1.改变this的指向
2.Function.prototype.bind
	在不支持的情况下模拟
	
	Function.prototype.bind = function(){
		var self = this, // 保存原函数
		context = [].shift.call( arguments ), // 需要绑定的this 上下文
		args = [].slice.call( arguments ); // 剩余的参数转成数组
		return function(){ // 返回一个新的函数
			return self.apply( context, [].concat.call( args, [].slice.call( arguments ) ) );
				// 执行新的函数的时候，会把之前传入的context 当作新函数体内的this
				// 并且组合两次分别传入的参数，作为新函数的参数
			}
	};



	
