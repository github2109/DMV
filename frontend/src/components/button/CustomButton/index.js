import "./style.css";

const CustomButton = ({ labelName,className ,handleClick}) => {
  return (
    <div className={`button-container ${className}`}>
      <div className="labelName-feedback" onClick={handleClick}>{labelName}</div>
    </div>
  );
};

export default CustomButton;
