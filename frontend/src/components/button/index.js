import "./style.css";

const CustomButton = ({ labelName,className ,handleSaveClick}) => {
  return (
    <div className={`button-container ${className}`}>
      <div className="labelName-feedback" onClick={handleSaveClick}>{labelName}</div>
    </div>
  );
};

export default CustomButton;
