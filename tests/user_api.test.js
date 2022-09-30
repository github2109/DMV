const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const helper = require("./tests_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
describe("create a new user", () => {
  jest.setTimeout(30000);
  beforeEach(async () => {
    const usersAtStart = await helper.usersInDb();
    const usernames = usersAtStart.map((user) => user.username);
    if (usernames.includes("root")) {
      await User.deleteMany({ username: "root" });
    }
  });

  test("creation fails if username is already taken", async () => {
    const usersAtStart = await helper.usersInDb();
    const userAdded = usersAtStart[0];

    const newUser = {
      username: userAdded.username,
      password: "password",
    };

    await api
      .post("/api/admin/register")
      .send(newUser)
      .expect(500)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      password: "password",
    };

    await api
      .post("/api/admin/register")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});
