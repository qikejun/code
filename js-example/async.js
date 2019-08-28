function my_async(Gfn) {
  return new Promise((resolve, reject) => {
    function next(data) {
      try {
        var {
          value,
          done
        } = Gfn.next(data);
        //调用 Generator 函数的next(返回一个对象{value: yield 后面的值, done: false(done为true,表示迭代完成)})

      } catch (e) {
        return reject(e);
      }
      if (!done) {
        //done为true,表示迭代完成
        //value 不一定是 Promise，可能是一个普通值。使用 Promise.resolve 进行包装。
        Promise.resolve(value).then(val => {
          next(val);
        }, reject);
      } else {
        resolve(value);
      }
    }
    next(); //执行一次next
  });
}

function* Gfn() {
  let a = yield new Promise((resolve, reject) => {
    setTimeout(function (param) {
      resolve(1)
    }, 100);
  });
  let b = yield new Promise((resolve, reject) => {
    // throw Error(1);
    resolve(10 + a)
  });
  let c = yield 10 + b;
  return c;
}

my_async(Gfn()).then(data => {
  console.log(data); //输出21
}).catch((err) => {
  console.log('err: ', err);
});