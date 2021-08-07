/*
 * 2021-08-06 20:11:31
 * @create by: zj
 * @Description:  node事件循环
 */

// macro-task 大概包括：

// setTimeout

// setInterval

// setImmediate

// script（整体代码)

// I/O 操作等。

// micro-task 大概包括：

// process.nextTick(与普通微任务有区别，在微任务队列执行之前执行)

// new Promise().then(回调)等


// nodejs Event Loop
// Node会先执行所有类型为 timers 的 MacroTask，然后执行所有的 MicroTask(NextTick例外)

// 进入 poll 阶段，执行几乎所有 MacroTask，然后执行所有的 MicroTask

// 再执行所有类型为 check 的 MacroTask，然后执行所有的 MicroTask

// 再执行所有类型为 close callbacks 的 MacroTask，然后执行所有的 MicroTask

// 至此，完成一个 Tick，回到 timers 阶段

// 定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数。
// I/O事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些I/O回调。
// 闲置阶段(idle, prepare)：仅系统内部使用。
// 轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
// 检查阶段(check)：setImmediate() 回调函数在这里执行
// 关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)。

// process.nextTick
// 在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行

// 在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务


// 外部输入数据–>轮询阶段(poll)–>检查阶段(check)–>关闭事件回调阶段(close callback)
// –>定时器检测阶段(timer)–>I/O事件回调阶段(I/O callbacks)–>闲置阶段(idle, prepare)–>轮询阶段…

// 1.timer阶段： 执行setTimeout和setInterval,并且 由 poll阶段控制

// 2.poll阶段
// poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情
// 1.回到 timer 阶段执行回调
// 2.执行 I/O 回调
// 如果当前已经存在定时器，而且有定时器到时间了，拿出来执行，eventLoop 将回到 timers 阶段。
// 并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

// 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
// 如果 poll 队列为空时，会有两件事发生

// 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
// 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去


console.log('start')

const fs = require('fs')
fs.readFile("./text.txt", () => {
    console.log(555);
    setTimeout(() => {
        console.log('timeout');
    })
    setImmediate(() => {
        console.log('immediate')
    })
})


setTimeout(() => {
  console.log("timers11");
  setTimeout(() => {
    console.log("timers33");
  })
})
setImmediate(function immediate () {
  console.log('immediate11');
  process.nextTick(() => console.log('next tick2'))
  setImmediate(()=> {
    console.log("immediate22");
  })
});

setTimeout(() => {
  console.log('timers22')
  setImmediate(()=> {
    console.log("immediate33");
  })
  setTimeout(() => {
    console.log("timers44");
  })
})