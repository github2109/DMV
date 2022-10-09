const mongoose = require("mongoose");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const helper = require("../helpers/tests_helper");
const app = require("../app");
const api = supertest(app);
const State = require("../models/state");
const User = require("../models/user");
describe("get list states", () => {
  test("States are returned as json", async () => {
    await api
      .get("/api/States")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all states are returned", async () => {
    const response = await api.get("/api/states");
    expectlength = await helper.statesInDb();
    expect(response.body).toHaveLength(expectlength.length);
  });
});
describe("addition of a new state", () => {
  let token = null;
  beforeEach(async () => {
    const listStatesAtStart = await helper.statesInDb();
    const names = listStatesAtStart.map((state) => state.name);
    if (names.find((name) => name)) {
      await State.deleteOne({ name: "test state" });
    }
    token = await helper.getTokenForTest();
  });

  test("a valid state can be added if user is authorized", async () => {
    const newState = {
      name: "test state",
    };

    await api
      .post("/api/states")
      .set("Authorization", `Bearer ${token}`)
      .send(newState)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const statesAtEnd = await helper.statesInDb();

    const names = statesAtEnd.map((state) => state.name);
    expect(names).toContain(newState.name);
  });
  test("fails with status 500 if name is already in use", async () => {
    const statesAtStart = await helper.statesInDb();
    const newState = {
      name: statesAtStart[0].name,
    };
    await api
      .post("/api/states")
      .set("Authorization", `Bearer ${token}`)
      .send(newState)
      .expect(500)
      .expect("Content-Type", /application\/json/);
    const statesAtEnd = await helper.statesInDb();

    const names = statesAtEnd.map((state) => state.name);
    expect(names).toHaveLength(statesAtStart.length);
  });
  test("fails with status 401 if user is unauthorized", async () => {
    const newState = {
      name: "state add with unauthorized user",
    };
    const statesAtStart = await helper.statesInDb();
    token = "incorrect-token";
    await api
      .post("/api/states")
      .set("Authorization", `Bearer ${token}`)
      .send(newState)
      .expect(401);

    const statesAtEnd = await helper.statesInDb();
    expect(statesAtEnd).toHaveLength(statesAtStart.length);
  });
});
describe("deletion of a state", () => {
  let token = null;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const usersAtStart = await helper.usersInDb();
    const usernames = usersAtStart.map((user) => user.username);
    if (usernames.includes("root")) {
      await User.deleteMany({ username: "root" });
    }

    token = await helper.getTokenForTest();

    const state = {
      name: "delete state",
    };
    await api
      .post("/api/states")
      .set("Authorization", `Bearer ${token}`)
      .send(state);
  });

  test("succeeds with status 200 if id is valid and user is authorized", async () => {
    const statesAtStart = await helper.statesInDb();
    const stateToDelete = statesAtStart[statesAtStart.length - 1];

    await api
      .delete(`/api/states/${stateToDelete._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const statesAtEnd = await helper.statesInDb();
    expect(statesAtEnd).toHaveLength(statesAtStart.length - 1);
    const names = statesAtEnd.map((state) => state.name);
    expect(names).not.toContain(stateToDelete.name);
  });

  test("fails with status 401 if user is unauthorized", async () => {
    const statesAtStart = await helper.statesInDb();
    const stateToDelete = statesAtStart[0];
    token = "incorrect-token";
    await api
      .delete(`/api/states/${stateToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    const statesAtEnd = await helper.statesInDb();
    expect(statesAtEnd).toHaveLength(statesAtStart.length);
  });
});
describe("update a state", () => {
  let token = null;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const usersAtStart = await helper.usersInDb();
    const usernames = usersAtStart.map((user) => user.username);
    if (usernames.includes("root")) {
      await User.deleteMany({ username: "root" });
    }

    token = await helper.getTokenForTest();
  });

  test("succeeds with status 200 if id is valid and user is authorized", async () => {
    const statesAtStart = await helper.statesInDb();
    const stateToUpdate = statesAtStart[0];

    await api
      .put(`/api/states/${stateToUpdate._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Florida" })
      .expect(200);

    const statesAtEnd = await helper.statesInDb();
    const updatedstate = statesAtEnd[0];
    expect(updatedstate.name).toContain("Florida");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
