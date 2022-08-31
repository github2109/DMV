import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState,useEffect } from "react";
const ModalModule = ({ modal, toggle, module, handleSaveModel }) => {
  const [tmpModule, setTmpModule] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  useEffect(() => {
    if (module === null) {
      setIsCreated(true);
      setTmpModule({
        name: "",
        titleDescription:"",
        contentDescription: "",
        imageDescription:"",
        isPremium:false,
      });
    } else {
      setTmpModule(module);
      setImageUrl(module.image);
      setIsCreated(false);
    }
  }, [modal]);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setTmpModule({
      ...tmpModule,
      image: file,
    });
    setImageUrl(URL.createObjectURL(file));
  };
  const handleInputChange = (e) => {
    setTmpModule({
      ...tmpModule,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>module</ModalHeader>
      <ModalBody>
        <div className="module-modal-container">
          <div className="module-form">
            <input
              name="name"
              className="input-text-module"
              type="text"
              placeholder="module name"
              value={tmpModule && tmpModule.name}
              onChange={handleInputChange}
            />
            <input
              name="titleDescription"
              className="input-text-module"
              type="text"
              placeholder="Title description"
              value={tmpModule && tmpModule.titleDescription}
              onChange={handleInputChange}
            />
            <div className="image-upload">
              <div className="image-edit">
                <input type="file" id="imageUpload" onChange={onImageChange} />
                <label htmlFor="imageUpload"></label>
              </div>
              <div className="image-preview">
                <div id="imagePreview">
                  {tmpModule && tmpModule.image !== "" ? (
                    <img src={imageUrl} alt="" className="image-module"></img>
                  ) : (
                    <span className="import-text">Import image</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={(e) => handleSaveModel(module, tmpModule, isCreated)}
        >
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
