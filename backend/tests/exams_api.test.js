const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("../helpers/tests_helper");
const app = require("../app");
const api = supertest(app);
const Exam = require("../models/exam");
const User = require("../models/user");

describe("get list exam by stateId and examId", () => {
  let state = null;
  let license = null;
  beforeEach(async () => {
    const licensesInDb = await helper.licensesInDb();
    license = licensesInDb[0];
    const statesInDb = await helper.statesInDb();
    state = statesInDb[0];
  });
  test("exams are returned as json", async () => {
    await api
      .get(`/api/exams?stateId=${state._id}&licenseId=${license._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all licenses are returned", async () => {
    const response = await api.get(
      `/api/exams?stateId=${state._id}&licenseId=${license._id}`
    );
    expectlength = await helper.examsInDbByStateIdAndLicenseId(
      state._id,
      license._id
    );
    expect(response.body).toHaveLength(expectlength.length);
  });
  test("get exam by examId", async () => {
    const examsAtStart = await helper.examsInDb();
    const exam = examsAtStart[0];
    const response = await api
      .get(`/api/exams/${exam._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.name).toContain(exam.name);
  });
});
describe("addition of a new exam", () => {
  let token = null;
  let license = null;
  let state = null;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const licensesInDb = await helper.licensesInDb();
    license = licensesInDb[0];
    const statesInDb = await helper.statesInDb();
    state = statesInDb[0];
    const listExamsAtStart = await helper.examsInDb();
    const names = listExamsAtStart.map((exam) => exam.name);
    token = await helper.getTokenForTest();
  });

  test("a valid state can be added if user is authorized", async () => {
    const newExam = {
      name: "test exam",
      numberOfQuestion: 10,
      timeOfExam: 30,
    };
    examsAtStart = await helper.examsInDb();
    await api
      .post(`/api/exams?stateId=${state._id}&licenseId=${license._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newExam)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const examsAtEnd = await helper.examsInDb();

    const names = examsAtEnd.map((exam) => exam.name);
    expect(names).toContain(newExam.name);
    expect(names).toHaveLength(examsAtStart.length + 1);
  });
  test("fails with status 401 if user is unauthorized", async () => {
    const newExam = {
      name: "exam add with unauthorized user",
    };
    const examsAtStart = await helper.examsInDb();
    token = "incorrect-token";
    await api
      .post(`/api/exams?stateId=${state._id}&licenseId=${license._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newExam)
      .expect(401);

    const examsAtEnd = await helper.examsInDb();
    expect(examsAtEnd).toHaveLength(examsAtStart.length);
  });
});
describe("deletion of a exam", () => {
  let token = null;
  let license = null;
  let state = null;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const licensesInDb = await helper.licensesInDb();
    license = licensesInDb[0];
    const statesInDb = await helper.statesInDb();
    state = statesInDb[0];
    const usersAtStart = await helper.usersInDb();
    const usernames = usersAtStart.map((user) => user.username);
    if (usernames.includes("root")) {
      await User.deleteMany({ username: "root" });
    }

    token = await helper.getTokenForTest();

    const exam = {
      name: "delete exam",
    };
    await api
      .post(`/api/exams?stateId=${state._id}&licenseId=${license._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(exam);
  });

  test("succeeds with status 200 if id is valid and user is authorized", async () => {
    const examsAtStart = await helper.examsInDb();
    const examToDelete = examsAtStart[examsAtStart.length - 1];

    await api
      .delete(`/api/exams/${examToDelete._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const examsAtEnd = await helper.examsInDb();
    expect(examsAtEnd).toHaveLength(examsAtStart.length - 1);
    const names = examsAtEnd.map((exam) => exam.name);
    expect(names).not.toContain(examToDelete.name);
  });

  test("fails with status 401 if user is unauthorized", async () => {
    const examsAtStart = await helper.examsInDb();
    const examToDelete = examsAtStart[0];
    token = "incorrect-token";
    await api
      .delete(`/api/exams/${examToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    const examsAtEnd = await helper.examsInDb();
    expect(examsAtEnd).toHaveLength(examsAtStart.length);
  });
});
describe("update a exam", () => {
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
    const examsAtStart = await helper.examsInDb();
    const examToUpdate = examsAtStart[0];

    await api
      .put(`/api/exams/${examToUpdate._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "jest test exam", timeOfExam: 10, numberOfQuestion: 11 })
      .expect(200);

    const examsAtEnd = await helper.examsInDb();
    const updatedexam = examsAtEnd[0];
    expect(updatedexam.name).toContain("jest test exam");
    expect(updatedexam.timeOfExam).toEqual(10);
    expect(updatedexam.numberOfQuestion).toEqual(11);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
