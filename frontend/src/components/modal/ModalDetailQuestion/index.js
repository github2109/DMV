// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import "./style.css";
// const ModalQuestion = ({
//   modal,
//   toggle,
//   question,
//   handleSaveModel,
//   ...props
// }) => {
//   const [oldQuestion, setOldQuestion] = useState(null);
//   const [tmpQuestion, setTmpQuestion] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [isCreated, setIsCreated] = useState(false);
//   useEffect(() => {
//     if (question === null) {
//       setIsCreated(true);
//       setTmpQuestion({
//         name: "",
//         titleDescription: "",
//         contentDescription: "",
//         imageDescription: "",
//         isPremium: false,
//       });
//     } else {
//       props.getDetailQuestionByQuestionId().then((res) => {
//         setTmpQuestion(res);
//         setImageUrl(res.imageDescription);
//         setIsCreated(false);
//         setOldQuestion(res);
//       });
//     }
//   }, [modal]);
//   const onImageChange = (e) => {
//     const [file] = e.target.files;
//     setTmpQuestion({
//       ...tmpQuestion,
//       image: file,
//     });
//     setImageUrl(URL.createObjectURL(file));
//   };
//   const handleInputChange = (e) => {
//     setTmpQuestion({
//       ...tmpQuestion,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleCheckRadioButton = (e) => {
//     setTmpQuestion({
//       ...tmpQuestion,
//       isPremium: e.target.value === "true" ? true : false,
//     });
//   };
//   return (
//     <Modal isOpen={modal} toggle={toggle} size="lg">
//       <ModalHeader toggle={toggle}>Detail Question</ModalHeader>
//       <ModalBody>
//         <ModalQuestion modal={} toggle={toggleChildren} QuestionId={QuestionId} />
//         <div className="Question-modal-container">
//           <div className="Question-form">
//             <label>Question name :</label>
//             <input
//               name="name"
//               className="input-text-Question"
//               type="text"
//               placeholder="Question name"
//               value={tmpQuestion && tmpQuestion.name}
//               onChange={handleInputChange}
//             />
//             <label>Title description :</label>
//             <input
//               name="titleDescription"
//               className="input-text-Question"
//               type="text"
//               placeholder="Title description"
//               value={tmpQuestion && tmpQuestion.titleDescription}
//               onChange={handleInputChange}
//             />
//             <label>Content description :</label>
//             <textarea
//               name="contentDescription"
//               className="input-text-Question content-description"
//               type="text"
//               placeholder="Content description"
//               value={tmpQuestion && tmpQuestion.contentDescription}
//               onChange={handleInputChange}
//             />
//             <label>Image description :</label>
//             <div className="image-upload-Question">
//               <div className="image-edit-Question">
//                 <input
//                   type="file"
//                   id="imageUpload-Question"
//                   onChange={onImageChange}
//                 />
//                 <label htmlFor="imageUpload-Question"></label>
//               </div>
//               <div className="image-preview-Question">
//                 <div id="imagePreview-Question">
//                   {tmpQuestion && tmpQuestion.image !== "" ? (
//                     <img src={imageUrl} alt="" className="image-Question"></img>
//                   ) : (
//                     <span className="import-text-Question">Import image</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div
//               className="radio-group-Question"
//               onChange={handleCheckRadioButton}
//             >
//               <input
//                 type="radio"
//                 value="true"
//                 name="isPremium"
//                 defaultChecked={tmpQuestion && tmpQuestion.isPremium === true}
//               />{" "}
//               Premium
//               <input
//                 type="radio"
//                 value="false"
//                 name="isPremium"
//                 className="radio-Question"
//                 defaultChecked={tmpQuestion && tmpQuestion.isPremium === false}
//               />{" "}
//               Basic
//             </div>
//             <CustomButton
//               className="manage-question-button"
//               labelName="Manage questions"
//               handleClick={toggleChildren}
//             />
//           </div>
//         </div>
//       </ModalBody>
//       <ModalFooter>
//         <Button
//           color="primary"
//           onClick={(e) => handleSaveModel(oldQuestion, tmpQuestion, isCreated)}
//         >
//           Save
//         </Button>{" "}
//         <Button color="secondary" onClick={toggle}>
//           Cancel
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getDetailQuestionByQuestionId: (QuestionId) =>
//       dispatch(getDetailQuestionByQuestionId(QuestionId)),
//   };
// };

// export default connect(null, mapDispatchToProps)(ModalQuestion);
