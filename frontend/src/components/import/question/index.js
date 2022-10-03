/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";
import { useState } from "react";
import * as XLSX from "xlsx";
import Questions from "../../questions";
import { connect } from "react-redux";
import {
  setSuccessNotification,
  setErrorNotification,
} from "../../../reducers/responseUIReducer";
import { useEffect } from "react";
const ImportQuestion = ({ moduleId, setData, ...props }) => {
  const [questions, setQuestions] = useState([]);
  const [executedQuestions, setExecutedQuestions] = useState([]);
  useEffect(() => {
    setData(executedQuestions);
  }, [executedQuestions]);

  const readExcel = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(e.target.files[0]);
    fileReader.onload = async (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = await XLSX.utils.sheet_to_json(ws);
      let tmpQuestions = [];
      let tmpQuestion;
      data.forEach((obj) => {
        if (obj.questionContent && tmpQuestion) tmpQuestions.push(tmpQuestion);
        if (obj.questionContent)
          tmpQuestion = {
            id: tmpQuestions.length,
            module: moduleId,
            questionContent: obj.questionContent,
            isTestQuestion: obj.isTestQuestion,
            image: obj.image || null,
            handBook: obj.handBook || null,
            answers: [],
          };
        tmpQuestion.answers.push({
          content: obj.answerContent,
          isCorrect: obj.answerIsCorrect,
        });
      });
      tmpQuestions.push(tmpQuestion);
      setQuestions(tmpQuestions);
      setExecutedQuestions(tmpQuestions);
    };
  };
  const readImages = (e) => {
    let tmpQuestions = [...questions];
    let files = [...e.target.files];
    for (let i = 0; i < tmpQuestions.length; i++) {
      for (let j = 0; j < files.length; j++) {
        if (tmpQuestions[i].image === files[j].name) {
          tmpQuestions[i].image = files[j];
          files.slice(j, 1);
          break;
        }
      }
    }
    setExecutedQuestions(tmpQuestions);
  };
  const handleSaveModalDetailQuestion = async (
    oldQuestion,
    newQuestion,
    isCreate
  ) => {
    try {
      if (!isCreate) {
        setExecutedQuestions(
          executedQuestions.map((question) =>
            question.id === newQuestion.id ? newQuestion : question
          )
        );
        setQuestions(
          questions.map((question) =>
            question.id === newQuestion.id ? newQuestion : question
          )
        );
      } else {
        setExecutedQuestions(
          executedQuestions.concat({
            id: executedQuestions.length,
            ...newQuestion,
          })
        );
        setQuestions(
          questions.concat({
            id: questions.length,
            newQuestion,
          })
        );
      }
    } catch (error) {
      props.setErrorNotification(error);
    }
  };
  const handleRemoveQuestion = async (e, question) => {
    e.stopPropagation();
    try {
      setQuestions(questions.filter((ques) => ques.id !== question.id));
      setExecutedQuestions(
        executedQuestions.filter((qs) => qs.id !== question.id)
      );
      props.setSuccessNotification("Question deleted successfully");
    } catch (error) {
      props.setErrorNotification(error);
    }
  };
  return (
    <div>
      File Excel : <input type="file" onChange={readExcel} />
      <div></div>Folder Images :{" "}
      <input
        directory=""
        webkitdirectory="true"
        type="file"
        onChange={readImages}
      />
      <Questions
        questions={executedQuestions}
        moduleId={moduleId}
        handleSaveModalDetailQuestion={handleSaveModalDetailQuestion}
        handleRemoveQuestion={handleRemoveQuestion}
        isApceptImport={false}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

export default connect(null, mapDispatchToProps)(ImportQuestion);
