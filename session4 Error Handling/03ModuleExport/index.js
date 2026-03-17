const math = require('./math');
console.log(math.add(2,3));


// a) What will be the output and why?
// b) Explain why assigning a value to exports is a problem.
// c) Rewrite the module correctly so both add and multiply functions are exported.

// a) output will be 5
// Because Node actually exports module.exports, not exports.
// exports = (a,b) => a * b;

// This reassigns the local variable exports.

// But module.exports is unchanged.
// So final export:

// module.exports = {
//   add: function
// }

// Therefore:

// math.add(2,3)

// returns

// 5

// b) Why assigning a value to exports is a problem

// Because exports is just a reference variable.

// Initially:

// exports === module.exports

// But when you do:

// exports = something;

// you break the reference.

// Example:

// exports = function() {};

// Now:

// exports !== module.exports

// Node still exports module.exports, so your new function is ignored.

// c)

// math.js
// exports.add = (a,b) => a + b;
// exports.multiply = (a,b) => a * b;