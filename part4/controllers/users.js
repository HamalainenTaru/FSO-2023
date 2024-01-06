const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (body.username === undefined) {
    return response.status(400).json({ error: "username missing" });
  }
  if (body.password === undefined) {
    return response.status(400).json({ error: "password missing" });
  }

  if (body.username.length < 3) {
    return response
      .status(400)
      .json({ error: "username must be at least 3 characters long" });
  }

  if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "password is too short, must be at least 3 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (e) {
    next(e);
  }
});

module.exports = userRouter;
