const fs = require('fs');

/**
 * Promise 之前
 * 
 * 如果使用回调函数实现多个异步并行执行，同一时刻获取最终结果
 * 可以借助 发布订阅/观察者模式
 */

let pubsub = {
    arry: [],
    emit() {
        this.arry.forEach(fn => fn());
    },
    on(fn) {
        this.arry.push(fn);
    }
}

let data = [];
pubsub.on(() => {
    if(data.length === 3) {
        console.log(data);  //[ 'A', 'B', 'C' ];数组顺序随机
    }
});
fs.readFile('./A.txt', 'utf-8', (err, value) => {
    data.push(value);
    pubsub.emit();
});
fs.readFile('./B.txt', 'utf-8', (err, value) => {
    data.push(value);
    pubsub.emit();
});
fs.readFile('./C.txt', 'utf-8', (err, value) => {
    data.push(value);
    pubsub.emit();
});




/**
 * 将 fs.readFile 包装成promise接口
 */
function read(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', (err, data) => {
            if(err) reject(err);
            resolve(data);
        });
    });
}

/**
 * 使用 Promise
 * 
 * 通过 Promise.all 可以实现多个异步并行执行，同一时刻获取最终结果的问题
 */

Promise.all([
    read('./A.txt'),
    read('./B.txt'),
    read('./C.txt')
]).then(data => {
    console.log(data); //[ 'A', 'B', 'C' ];数组顺序随机
}).catch(err => console.log(err));

/**
 * 使用 Async/Await
 */

async function readAsync() {
    let data = await Promise.all([
        read('./A.txt'),
        read('./B.txt'),
        read('./C.txt')
    ]);
    return data;
}

readAsync().then(data => {
    console.log(data); //[ 'A', 'B', 'C' ];数组顺序随机
});