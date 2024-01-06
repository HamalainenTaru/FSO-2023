const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);

describe("Testing GET request", () => {
  test("All users are returned from db as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    // remove all users from db
    await User.deleteMany({});

    // make passwordhash
    const passwordHash = await bcrypt.hash("sekret", 10);

    // make user
    const user = new User({
      username: "root",
      passwordHash: passwordHash,
    });

    // save user to db
    await user.save();
  });

  // db should have 1 user
  test("There are as many blogs returned as DB has blogs", async () => {
    const usersAtStart = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(1);
  });

  // testing that passwordHash is not saved
  test("passwordHash is not saved", async () => {
    const users = await helper.usersInDb();
    const user = users[0];
    expect(user.passwordHash).not.toBeDefined();
  });

  // testing that user has id
  test("user has id", async () => {
    const users = await helper.usersInDb();
    expect(users[0].id).toBeDefined();
  });

  // testing that users can be added to db
  test("creation succeed with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Taru",
      name: "Taru Hämäläinen",
      password: "salasana",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("Testing that invalid users are not posted to db", () => {
  test("Username is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "test user",
      password: "salainen",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toBe("username missing");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("password is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "test",
      name: "test user",
    };

    const reponse = await api.post("/api/users").send(newUser).expect(400);
    expect(reponse.body.error).toBe("password missing");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("username is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "te",
      name: "test user",
      password: "salainen",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toBe(
      "username must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("password is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "test",
      name: "test user",
      password: "sa",
    };

    const rerponse = await api.post("/api/users").send(newUser).expect(400);
    expect(rerponse.body.error).toBe(
      "password is too short, must be at least 3 characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("username is NOT unique", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "test user",
      password: "salainen",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toContain(
      "Error, expected username to be unique."
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
