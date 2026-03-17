// 5. CRUD Logic Bug
// Look at this Express code:

// router.get('/users', (req, res) => {
//   const users = JSON.parse(fs.readFileSync('./data/users.json'));
//   res.json(users);
// });

// a) Why is readFileSync considered a bad practice in production servers?
// b) Rewrite the route using async/await with fs.promises.
// c) What will happen to the Node.js event loop if many requests call this route simultaneously?

// a) readFileSync blocks the event loop, preventing Node from serving other requests

// That means while Node.js is reading the file:

// Node cannot handle any other request

// So the entire server pauses during the file read.

import fs from "fs/promises";

router.get('/users', async (req, res, next) => {
  try {
    const data = await fs.readFile('./data/users.json', 'utf-8');

    const users = JSON.parse(data);

    res.json(users);

  } catch (err) {
    next(err);
  }
});

// c) What happens if many requests call the synchronous version

// If this route is called simultaneously:

// fs.readFileSync()

// the event loop gets blocked repeatedly.

// Example scenario:

// 100 users request /users

// Execution becomes:

// Request 1 → readFileSync
// Request 2 → waits
// Request 3 → waits
// Request 4 → waits
// ...

// So the server processes requests one at a time.