/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";
import { useState } from "react";
import * as XLSX from "xlsx";
import DrawModules from "../../modules/draw";
import { connect } from "react-redux";
import {
  setSuccessNotification,
  setErrorNotification,
} from "../../../reducers/responseUIReducer";
import ModalDetailModule from "./../../modal/ModalDetailModule";
import { useEffect } from "react";
const ImportModule = ({ licenseId, setData, ...props }) => {
  const [modules, setModules] = useState([]);
  const [module, setModule] = useState(null);
  const [modalDetailModule, setModalDetailModule] = useState(false);
  const [executedModules, setExecutedModules] = useState([]);
  useEffect(() => {
    setData(executedModules);
  }, [executedModules]);

  const toggleModalDetailModule = () =>
    setModalDetailModule(!modalDetailModule);

  const readExcel = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(e.target.files[0]);
    fileReader.onload = async (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = await XLSX.utils.sheet_to_json(ws);
      let tmpModules = [];
      let tmpModule;
      data.forEach((obj) => {
        tmpModule = {
          id: tmpModules.length,
          license: licenseId,
          name: obj.name,
          titleDescription: obj.titleDescription,
          contentDescription: obj.contentDescription,
          imageDescription: obj.imageDescription,
          isPremium: obj.isPremium,
          position: tmpModules.length + 1 + props.modules.length,
        };
        tmpModules.push(tmpModule);
      });
      setModules(tmpModules);
      setExecutedModules(tmpModules);
    };
  };
  const readImages = (e) => {
    let tmpModules = [...modules];
    let files = [...e.target.files];
    for (let i = 0; i < tmpModules.length; i++) {
      for (let j = 0; j < files.length; j++) {
        if (tmpModules[i].imageDescription === files[j].name) {
          tmpModules[i].imageDescription = files[j];
          files.slice(j, 1);
          break;
        }
      }
    }
    setExecutedModules(tmpModules);
  };
  const handleSaveModalDetailModule = async (
    oldModule,
    newModule,
    isCreate
  ) => {
    try {
      if (!isCreate) {
        setExecutedModules(
          executedModules.map((module) =>
            module.id === newModule.id ? newModule : module
          )
        );
        setModules(
          modules.map((module) =>
            module.id === newModule.id ? newModule : module
          )
        );
      } else {
        setExecutedModules(
          executedModules.concat({
            id: executedModules.length,
            ...newModule,
          })
        );
        setModules(
          modules.concat({
            id: modules.length,
            ...newModule,
          })
        );
      }
      toggleModalDetailModule();
    } catch (error) {
      props.setErrorNotification(error);
    }
  };
  const handleDeleteModule = async (e, moduleId) => {
    e.stopPropagation();
    try {
      setModules(modules.filter((ques) => ques.id !== moduleId));
      setExecutedModules(executedModules.filter((qs) => qs.id !== moduleId));
      props.setSuccessNotification("Question deleted successfully");
    } catch (error) {
      props.setErrorNotification(error);
    }
  };
  const handleSelectModule = (e, moduleId) => {
    e.stopPropagation();
  };
  const handleEditModule = (e, moduleId) => {
    e.stopPropagation();
    executedModules.forEach((module) => {
      if (module.id === moduleId) {
        setModule(module);
        toggleModalDetailModule();
        return;
      }
    });
  };
  return (
    <div>
      {modalDetailModule && (
        <ModalDetailModule
          modal={modalDetailModule}
          toggle={toggleModalDetailModule}
          handleSaveModal={handleSaveModalDetailModule}
          module={module}
        />
      )}
      <input type="file" onChange={readExcel} />
      <input
        directory=""
        webkitdirectory="true"
        type="file"
        onChange={readImages}
      />
      <DrawModules
        modules={executedModules}
        setModules={setExecutedModules}
        handleEditModule={handleEditModule}
        handleSelectModule={handleSelectModule}
        handleDeleteModule={handleDeleteModule}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    modules: state.modules,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSuccessNotification: (mess) => dispatch(setSuccessNotification(mess)),
    setErrorNotification: (mess) => dispatch(setErrorNotification(mess)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportModule);
