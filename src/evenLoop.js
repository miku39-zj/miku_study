/*
 * 2021-07-26 15:14:07
 * @create by: zj
 * @Description: 事件循环
 */
// 事件循环是js实现异步的一种方法，也是js的执行机制。



// javascript是一门单线程语言
// js任务分为： 同步任务和异步任务
// 同步任务都在主线程上执行，形成一个执行栈
// 当我们打开网站时，网页的渲染过程就是一大堆同步任务，比如页面骨架和页面元素的渲染。而像加载图片音乐之类占用资源大耗时久的任务，就是异步任务

// macro-task(宏任务)：包括整体代码script，setTimeout，setInterval，requestAnimationFrame ()
// 每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）,宏任务队列
// micro-task(微任务)：Promise，process.nextTick， MutationObserver(html5新特性),queueMicrotask
// 理解是在当前 宏任务 执行结束后立即执行的任务， 微任务队列

// 浏览器会先执行一个宏任务，紧接着执行当前执行栈产生的微任务，再进行渲染，然后再执行下一个宏任务

console.log('start');
// debugger
async function async1() {
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2 end');
}

async1();
setTimeout(function () {
  console.log('setTimeout111111111');
}, 0)
new Promise(resolve => {
    console.log('Promise');
    setTimeout(() => {
      console.log("setTimeout22222222");
      resolve();
    })
  })
  .then(function () {
    console.log('promise1');
    setTimeout(() => {
      console.log(6666666);
    }, 0)
  })
  .then(function () {
    console.log('promise2');
  })

console.log('end');



// node 和 浏览器 eventLoop的主要区别
// 两者最主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行的，而nodejs中的微任务是在不同阶段之间执行的。