const Delegate = require('delegates')

let request = {
  sayHi: function () {
    console.log("hello")
  },
  url: 'https://www.github.com/fish-node'
}

let ctx = {
  request
}

/**
 * 创建一个委托对象
 *   这个对象内部引用了ctx和ctx.request
 * 以后就是通过这个委托对象来修改ctx的行为
 * @type {Delegator}
 */
let delegate = new Delegate(ctx, 'request')

/**
 * 把ctx.request.sayHi委托到ctx.sayHi
 *   this[target][name].apply(this[target], arguments);
 */
delegate.method('sayHi')

ctx.sayHi()
// hello

console.log(ctx)

/**
 * 通过getter、setter方法把ctx.url和ctx.request.url绑定起来
 */
delegate.access('url')

console.log(ctx.url)
// https://www.github.com/fish-node

ctx.url = 'https://www.google.com';
console.log(ctx.request.url)
// https://www.google.com
