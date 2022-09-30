const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const helper = require("./tests_helper");
const app = require("../app");
const api = supertest(app);
const License = require("../models/license");
const User = require("../models/user");

describe("get list licenses", () => {
  test("licenses are returned as json", async () => {
    await api
      .get("/api/licenses")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all licenses are returned", async () => {
    const response = await api.get("/api/licenses");
    expectlength = await helper.licensesInDb();
    expect(response.body).toHaveLength(expectlength.length);
  });
});
describe("addition of a new license", () => {
  let token = null;
  beforeEach(async () => {
    const listlicensesAtStart = await helper.licensesInDb();
    const names = listlicensesAtStart.map((license) => license.name);
    if (names.includes("test license")) {
      await License.deleteOne({ name: "test license" });
    }
    const passwordHash = await bcrypt.hash("secret", 12);
    const user = new User({
      username: "root",
      passwordHash,
      role: "ADMIN",
    });
    await user.save();

    const userForToken = {
      username: user.username,
      id: user.id,
      role: user.role,
    };
    token = jwt.sign(userForToken, config.SECRET);
  });

  test("a valid state can be added if user is authorized", async () => {
    const newLicense = {
      name: "test license",
      image: "null",
      description: "test add license",
    };

    await api
      .post("/api/licenses")
      .set("Authorization", `Bearer ${token}`)
      .send(newLicense)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const licensesAtEnd = await helper.licensesInDb();

    const names = licensesAtEnd.map((license) => license.name);
    expect(names).toContain(newLicense.name);
  });
  test("fails with status 500 if name is already in use", async () => {
    const licenseAtStart = await helper.licensesInDb();
    const newLicense = {
      name: licenseAtStart[0].name,
    };
    await api
      .post("/api/license")
      .set("Authorization", `Bearer ${token}`)
      .send(newLicense)
      .expect(500)
      .expect("Content-Type", /application\/json/);
    const licenseAtEnd = await helper.licenseInDb();

    const names = licenseAtEnd.map((state) => state.name);
    expect(names).toHaveLength(licenseAtStart.length);
  });
  test("fails with status 401 if user is unauthorized", async () => {
    const newLicense = {
      name: "license add with unauthorized user",
    };
    const licensesAtStart = await helper.licensesInDb();
    token = "incorrect-token";
    await api
      .post("/api/licenses")
      .set("Authorization", `Bearer ${token}`)
      .send(newLicense)
      .expect(401);

    const licensesAtEnd = await helper.licensesInDb();
    expect(licensesAtEnd).toHaveLength(licensesAtStart.length);
  });
});
describe("deletion of a license", () => {
  let token = null;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const usersAtStart = await helper.usersInDb();
    const usernames = usersAtStart.map((user) => user.username);
    if (usernames.includes("root")) {
      await User.deleteMany({ username: "root" });
    }

    const passwordHash = await bcrypt.hash("secret", 12);
    const user = new User({
      username: "root",
      passwordHash,
      role: "ADMIN",
    });
    await user.save();

    const userForToken = {
      username: user.username,
      id: user.id,
      role: user.role,
    };
    token = jwt.sign(userForToken, config.SECRET);

    const license = {
      name: "delete license",
    };
    await api
      .post("/api/licenses")
      .set("Authorization", `Bearer ${token}`)
      .send(license);
  });

  test("succeeds with status 200 if id is valid and user is authorized", async () => {
    const licensesAtStart = await helper.licensesInDb();
    const licenseToDelete = licensesAtStart[licensesAtStart.length - 1];

    await api
      .delete(`/api/licenses/${licenseToDelete._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const licensesAtEnd = await helper.licensesInDb();
    expect(licensesAtEnd).toHaveLength(licensesAtStart.length - 1);
    const names = licensesAtEnd.map((license) => license.name);
    expect(names).not.toContain(licenseToDelete.name);
  });

  test("fails with status 401 if user is unauthorized", async () => {
    const licensesAtStart = await helper.licensesInDb();
    const licenseToDelete = licensesAtStart[0];
    token = "incorrect-token";
    await api
      .delete(`/api/licenses/${licenseToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    const licensesAtEnd = await helper.licensesInDb();
    expect(licensesAtEnd).toHaveLength(licensesAtStart.length);
  });
});
describe("update a license", () => {
  let token = null;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const usersAtStart = await helper.usersInDb();
    const usernames = usersAtStart.map((user) => user.username);
    if (usernames.includes("root")) {
      await User.deleteMany({ username: "root" });
    }

    const passwordHash = await bcrypt.hash("secret", 12);
    const user = new User({
      username: "root",
      passwordHash,
      role: "ADMIN",
    });
    await user.save();

    const userForToken = {
      username: user.username,
      id: user.id,
      role: user.role,
    };
    token = jwt.sign(userForToken, config.SECRET);
  });

  test("succeeds with status 200 if id is valid and user is authorized", async () => {
    const licensesAtStart = await helper.licensesInDb();
    const licenseToUpdate = licensesAtStart[0];

    await api
      .put(`/api/licenses/${licenseToUpdate._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "" })
      .expect(200);

    const licensesAtEnd = await helper.licensesInDb();
    const updatedlicense = licensesAtEnd[0];
    expect(updatedlicense.name).toContain("Car");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
