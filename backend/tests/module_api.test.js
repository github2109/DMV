const mongoose = require("mongoose");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const helper = require("../helpers/tests_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
describe("get list modules", () => {
  let license = null;
  let state = null;
  beforeEach(async () => {
    const licensesInDb = await helper.licensesInDb();
    license = licensesInDb[0];
    const statesInDb = await helper.statesInDb();
    state = statesInDb[3];
  });
  test("all modules in license", async () => {
    const response = await api.get(`/api/modules/licenses/${license._id}`);
    expectlength = await helper.modulesInLicenseDb(license._id);
    expect(response.body).toHaveLength(expectlength.length);
  });
  test("all modules in license and state", async () => {
    const response = await api.get(
      `/api/modules?stateId=${state._id}&licenseId=${license._id}`
    );
    expectlength = await helper.modulesInStateAndLicenseDb(
      state._id,
      license._id
    );
    expect(response.body).toHaveLength(expectlength.length);
  });
  test(" get module by module id", async () => {
    modulesAtStart = await helper.modulesInDb();
    module = modulesAtStart[0];
    const response = await api.get(`/api/modules/${module._id}`);
    expect(response.body.name).toContain(module.name);
  });
});
describe("addition of a new module", () => {
  let token = null;
  let license = null;
  let state = null;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const licensesInDb = await helper.licensesInDb();
    license = licensesInDb[0];
    const statesInDb = await helper.statesInDb();
    state = statesInDb[0];
    token = await helper.getTokenForTest();
  });

  test("a valid module can be added if user is authorized", async () => {
    const newModule = {
      name: "Defensive Driving 191",
      titleDescription: "titleDescription",
      contentDescription: "content description",
      imageDescription: "image description",
      isPremium: false,
      position: 2,
    };
    const modulesAtStart = await helper.modulesInDb();
    await api
      .post("/api/modules/")
      .set("Authorization", `Bearer ${token}`)
      .send(newModule)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const modulesAtEnd = await helper.modulesInDb();

    const names = modulesAtEnd.map((module) => module.name);
    expect(names).toContain(newModule.name);
    expect(names).toHaveLength(modulesAtStart.length + 1);
  });
  test("fails with status 401 if user is unauthorized", async () => {
    const newModule = {
      name: "module add with unauthorized user",
    };
    const modulesAtStart = await helper.modulesInDb();
    token = "incorrect-token";
    await api
      .post(`/api/modules?stateId=${state._id}&licenseId=${license._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newModule)
      .expect(401);

    const modulesAtEnd = await helper.modulesInDb();
    expect(modulesAtEnd).toHaveLength(modulesAtStart.length);
  });
  test("add a module to state", async () => {
    const modulesAtStart = await helper.modulesInDb();
    const moduleToAdd = modulesAtStart[modulesAtStart.length - 1];
    const response = await api
      .post(`/api/modules/${moduleToAdd._id}/states/${state._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(null)
      .expect(200);
    const statesId = response.body.states;
    expect(statesId).toHaveLength(moduleToAdd.states.length + 1);
  });
  test("fails with status 500 if name is already in use", async () => {
    const modulesAtStart = await helper.modulesInDb();
    const newModule = {
      name: modulesAtStart[0].name,
    };
    await api
      .post("/api/modules")
      .set("Authorization", `Bearer ${token}`)
      .send(newModule)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const modulesAtEnd = await helper.modulesInDb();

    const names = modulesAtEnd.map((module) => module.name);
    expect(names).toHaveLength(modulesAtStart.length);
  });
});
describe("deletion of a module", () => {
  let token = null;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const licensesInDb = await helper.licensesInDb();
    license = licensesInDb[0];
    const statesInDb = await helper.statesInDb();
    state = statesInDb[3];
    const usersAtStart = await helper.usersInDb();
    const usernames = usersAtStart.map((user) => user.username);
    if (usernames.includes("root")) {
      await User.deleteMany({ username: "root" });
    }

    token = await helper.getTokenForTest();
  });

  test("succeeds with status 200 if id is valid and user is authorized", async () => {
    const modulesAtStart = await helper.modulesInDb();
    const moduleToDelete = modulesAtStart[modulesAtStart.length - 1];

    await api
      .delete(`/api/modules/${moduleToDelete._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const modulesAtEnd = await helper.modulesInDb();
    expect(modulesAtEnd).toHaveLength(modulesAtStart.length - 1);
  });

  test("fails with status 401 if user is unauthorized", async () => {
    const modulesAtStart = await helper.modulesInDb();
    const moduleToDelete = modulesAtStart[0];
    token = "incorrect-token";
    await api
      .delete(`/api/modules/${moduleToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    const modulesAtEnd = await helper.modulesInDb();
    expect(modulesAtEnd).toHaveLength(modulesAtStart.length);
  });
});
describe("update a module", () => {
  let token = null;
  jest.setTimeout(10000);
  beforeEach(async () => {
    const usersAtStart = await helper.usersInDb();
    const usernames = usersAtStart.map((user) => user.username);
    if (usernames.includes("root")) {
      await User.deleteMany({ username: "root" });
    }

    token = await helper.getTokenForTest();
  });

  test("succeeds with status 200 if id is valid and user is authorized", async () => {
    const modulesAtStart = await helper.modulesInDb();
    const moduleToUpdate = modulesAtStart[modulesAtStart.length - 1];

    await api
      .put(`/api/modules/${moduleToUpdate._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "jest update module",
        titleDescription: "titleDescription",
        contentDescription: "content description",
        imageDescription: "image description",
        isPremium: false,
        position: 2,
      })
      .expect(200);

    const modulesAtEnd = await helper.modulesInDb();
    const updatedModule = modulesAtEnd[modulesAtEnd.length - 1];
    expect(updatedModule.name).toContain("jest update module");
    expect(updatedModule.titleDescription).toContain("titleDescription");
    expect(updatedModule.contentDescription).toContain("content description");
  });
});
