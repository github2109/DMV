/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useEffect, useState } from "react";
import "./style.css";
const ModalLicense = ({ modal, toggle, license ,handleSaveModel}) => {
  const [tmpLicense, setTmpLicense] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isCreated,setIsCreated] = useState(false);
  useEffect(() => {
    if (license === null) {
      setIsCreated(true);
      setTmpLicense({
        name: "",
        image: "",
        description: "",
      });
    } else {
      setTmpLicense(license);
      setImageUrl(license.image);
    }
  }, [modal]);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setTmpLicense({
      ...tmpLicense,
      image: file,
    });
    setImageUrl(URL.createObjectURL(file));
  };
  const handleInputChange = (e) => {
    setTmpLicense({
      ...tmpLicense,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>License</ModalHeader>
      <ModalBody>
        <div className="license-modal-container">
          <div className="license-form">
            <input
              name="name"
              className="input-text-license"
              type="text"
              placeholder="License name"
              value={tmpLicense && tmpLicense.name}
              onChange={handleInputChange}
            />
            <input
              name="description"
              className="input-text-license"
              type="text"
              placeholder="License description"
              value={tmpLicense && tmpLicense.description}
              onChange={handleInputChange}
            />
            <div className="image-upload">
              <div className="image-edit">
                <input type="file" id="imageUpload" onChange={onImageChange} />
                <label htmlFor="imageUpload"></label>
              </div>
              <div className="image-preview">
                <div id="imagePreview">
                  {tmpLicense && tmpLicense.image !== ""? <img
                    src={imageUrl}
                    alt=""
                    className="image-license"
                  ></img>:<span className="import-text">Import image</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={(e)=>handleSaveModel(tmpLicense,isCreated)}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalLicense;
