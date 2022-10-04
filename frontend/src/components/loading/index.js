import "./style.css";
import { useSelector } from "react-redux";
const Loading = () => {
  const loading = useSelector((state) => state.responseUI.loading);
  if (!loading) return null;
  return (
    <div className="loading-container">
      <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66">
        <circle
          className="path"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </div>
  );
};
export default Loading;
