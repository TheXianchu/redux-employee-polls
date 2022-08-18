import * as React from "react";
import { _getAuthedUser, _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("validate _saveQuestion", () => {
  it("will return contain the correct answer options when a new question is added", async () => {
    const question = {
      optionOneText: "Take a course on Jest",
      optionTwoText: "Take a course on home cooking",
      author: "sarahedo",
    };

    await _saveQuestion(question).then((question) => {
      expect(question.optionOne.text).toContain("Take a course on Jest");
      expect(question.optionTwo.text).toContain(
        "Take a course on home cooking"
      );
    });
  });

  it("will supply an error when too few arguments are passed", async () => {
    const question = {
      optionOneText: "Take a course on Jest",
      optionTwoText: "Take a course on home cooking",
    };

    await _saveQuestion(question).catch((error) => {
      expect(error).toContain(
        "Please provide optionOneText, optionTwoText, and author"
      );
    });
  });
});

describe("validate _getAuthedUser", () => {
  it("will return null when noone is logged in", async () => {
    await _getAuthedUser().then((response) => expect(response).toBeNull());
  });
});

describe("validate _saveQuestionAnswer", () => {
  it("will return contain the correct answer is given on a question", async () => {
    const answer = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    };

    await _saveQuestionAnswer(answer).then((response) => {
      expect(response).toBeTruthy();
    });
  });

  it("will return an error on invalid data", async () => {
    const answer = {
      authedUser: undefined,
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    };

    await _saveQuestionAnswer(answer).catch((error) => {
      expect(error).toContain("Please provide authedUser, qid, and answer");
    });
  });
});
