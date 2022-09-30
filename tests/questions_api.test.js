const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const helper = require("./tests_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
describe("get list questions", () => {
  let module = null;
  let exam = null;
  beforeEach(async () => {
    const moduleInDb = await helper.modulesInDb();
    module = moduleInDb[0];
    const examInDb = await helper.examsInDb();
    exam = examInDb[0];
  });
  test("questions in module", async () => {
    const response = await api.get(`/api/questions/modules/${module._id}`);
    expectLength = await helper.questionsForModuleDb(module._id);
    expect(response.body).toHaveLength(expectLength.length);
  });
  test("questions in exam", async () => {
    const response = await api.get(`/api/questions/exams/${exam._id}`);
    expect(response.body).toHaveLength(exam.numberOfQuestion);
  });
});
describe("addition of a new question", () => {
  let token = null;
  let module = null;
  jest.setTimeout(30000);
  beforeEach(async () => {
    const modulesInDb = await helper.modulesInDb();
    module = modulesInDb[0];
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

  test("a valid question can be added if user is authorized", async () => {
    const newQuestion = {
      module: module._id,
      questionContent: "Question jest",
      answers: [
        {
          content: "Answer 1",
          isCorrect: false,
        },
        {
          content: "Answer 2",
          isCorrect: false,
        },
        {
          content: "Answer 3",
          isCorrect: true,
        },
        {
          content: "Answer 4",
          isCorrect: false,
        },
      ],
      isTestQuestion: true,
      image: "null",
      handBook: null,
    };
    let questionsAtStart = await helper.questionsForModuleDb(module._id);
    await api
      .post(`/api/questions`)
      .set("Authorization", `Bearer ${token}`)
      .send(newQuestion)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const questionsAtEnd = await helper.questionsForModuleDb(module._id);

    const names = questionsAtEnd.map((question) => question.name);
    expect(names).toContain(newQuestion.name);
    expect(names).toHaveLength(questionsAtStart.length + 1);
  });
  test("fails with status 401 if user is unauthorized", async () => {
    const newQuestion = {
      module: module._id,
      questionContent: "Question jest",
      answers: [
        {
          content: "Answer 1",
          isCorrect: false,
        },
        {
          content: "Answer 2",
          isCorrect: false,
        },
        {
          content: "Answer 3",
          isCorrect: true,
        },
        {
          content: "Answer 4",
          isCorrect: false,
        },
      ],
      isTestQuestion: true,
      image: "null",
      handBook: null,
    };
    const questionsAtStart = await helper.questionsForModuleDb(module._id);
    token = "incorrect-token";
    await api
      .post(`/api/questions`)
      .set("Authorization", `Bearer ${token}`)
      .send(newQuestion)
      .expect(401);

    const questionsAtEnd = await helper.questionsForModuleDb(module._id);
    expect(questionsAtEnd).toHaveLength(questionsAtStart.length);
  });
});
describe("deletion of a question", () => {
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
    const questionsAtStart = await helper.questionsInDb();
    const questionToDelete = questionsAtStart[questionsAtStart.length - 1];

    await api
      .delete(`/api/questions/${questionToDelete._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const questionsAtEnd = await helper.questionsInDb();
    expect(questionsAtEnd).toHaveLength(questionsAtStart.length - 1);
  });

  test("fails with status 401 if user is unauthorized", async () => {
    const questionsAtStart = await helper.questionsInDb();
    const questionToDelete = questionsAtStart[0];
    token = "incorrect-token";
    await api
      .delete(`/api/questions/${questionToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    const questionsAtEnd = await helper.questionsInDb();
    expect(questionsAtEnd).toHaveLength(questionsAtStart.length);
  });
});
describe("update a question", () => {
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
    const questionsAtStart = await helper.questionsInDb();
    const questionToUpdate = questionsAtStart[questionsAtStart.length - 1];

    await api
      .put(`/api/questions/${questionToUpdate._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ questionContent: " jest update question" })
      .expect(200);

    const questionsAtEnd = await helper.questionsInDb();
    const updatedQuestion = questionsAtEnd[questionsAtEnd.length - 1];
    expect(updatedQuestion.questionContent).toContain("jest update question");
  });
});
afterAll(() => {
  mongoose.connection.close();
});
