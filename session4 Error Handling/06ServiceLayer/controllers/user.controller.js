import { createUserService } from "../services/user.service.js";

export async function createUser(req, res, next) {
  try {
    const user = await createUserService(req.body);

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (err) {
    next(err);
  }
}