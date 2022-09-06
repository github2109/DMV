import "./style.css";
import "../../fontawesome/b96f916ae2";
const License = ({ license,handleSelectLicense,handleDeleteLicense }) => {
  return (
    <div className="license-leaderboard" onClick={() => handleSelectLicense(license)}>
      <img src={license.image} alt="licenseImage" className="license-image" />
      <span className="license-name">{license.name}</span>
      <span className="license-description">{license.description}</span>
      <div className="TrashButton" onClick={(e) => handleDeleteLicense(e,license)}>
        <i className="trash-icon fa-solid fa-trash"></i>
      </div>
    </div>
  );
};

export default License;
