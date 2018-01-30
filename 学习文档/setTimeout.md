function a(){
    console.log(1);
}
function b(){
    console.log(2);
}
function c(){
    console.log(3);
}
a()
setTimeout(b(),0)
b()
c()
//输出结果1 3 2
//在调用setTImeout时和调用a(),c()调用相同直接执行当前的方法，
//在setTimeout内部回调函数的调用，首先会看后面的延迟时间，然后在一定时间之后
将回调函数放入回调队列，等待当前调用栈中的为空(也就是调用栈执行的中的所有方法执行完之后)，setTimeout的回调函数在移动端调用栈中执行
以上操作都由Event Manager(事件管理器完成)