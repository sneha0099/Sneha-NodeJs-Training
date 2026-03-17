// 4. Debugging Execution Order
// Predict the output order of this program:

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// a) What will be the exact output order?
// b) Explain why this order occurs in Node.js.
// c) Which mechanism executes first: microtasks or callbacks?

// a) Exact Output Order
// Start
// End
// Promise
// Timeout

// b) Why this order occurs in Node.js

// JavaScript executes code in this order:

// 1️⃣ Call Stack (synchronous code)
// 2️⃣ Microtask Queue (Promises, process.nextTick)
// 3️⃣ Callback Queue (setTimeout, setInterval, I/O)

// c) Which mechanism executes first?

// ✅ Microtasks execute before callbacks (macrotasks).

// Priority order:

// 1️⃣ Call Stack
// 2️⃣ Microtask Queue
// 3️⃣ Callback Queue