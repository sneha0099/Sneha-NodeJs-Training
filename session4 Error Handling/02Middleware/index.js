// 2. Express Error Middleware Flow
// Look at this route handler:

// app.get('/user/:id', async (req, res, next) => {
//   const user = await getUserById(req.params.id);
//   if (!user) {
//     throw new Error("User not found");
//   }
//   res.json(user);
// });

// a) If getUserById() throws an error, will Express automatically send it to error middleware? Why or why not?
// b) Modify the code so the error correctly reaches Express error middleware.
// c) What is the correct signature of an Express error middleware?


// a) If getUserById() throws → the async function returns a rejected Promise.

// Express does not handle that rejection, so it becomes an UnhandledPromiseRejection.

// b) 

app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      throw new Error("User not found");
    }

    res.json(user);

  } catch (err) {
    next(err);
  }
});

// c)

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message
  });
});