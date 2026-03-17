// async function createUser(req, res) {
//   const user = await User.create(req.body);
//   res.json(user);
// }

// a) Why is this controller violating Separation of Concerns?
// b) Refactor the architecture using Route, Controller, and Service.
// c) Explain one advantage of the Service Layer pattern.

// a) Why this violates Separation of Concerns

// This controller mixes multiple responsibilities in one place.

// c) One advantage of the Service Layer pattern

// The biggest advantage is reusability of business logic.
// With service layer:

// createUserService()

// can be reused in:

// Controllers
// Cron jobs
// Workers
// Message queues
// Tests

import express from "express";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

/* error middleware */
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});