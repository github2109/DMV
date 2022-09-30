import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ImportQuestion from "../../import/question";
import ImportModule from "../../import/module";
import { useState } from "react";
import "./style.css";

const ModalImport = ({
  modal,
  toggle,
  componentImport,
  handleSaveModal,
  ...props
}) => {
  const [data, setData] = useState(null);
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Import</ModalHeader>
      <ModalBody>
        {componentImport === "question" && (
          <ImportQuestion moduleId={props.moduleId} setData={setData} />
        )}
        {componentImport === "module" && (
          <ImportModule licenseId={props.licenseId} setData={setData} />
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={(e) => handleSaveModal(data)}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalImport;
