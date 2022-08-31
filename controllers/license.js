const License = require("../models/license");
const { updateModuleAfterRemoveLicense } = require("../controllers/module");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
exports.createLicense = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
    const { name, image, description } = req.body;
    const checkLicense = await License.findOne({ name });
    if (checkLicense) {
      return res.status(500).json({
        message:
          "This name is already in use. Please try with a different license name",
      });
    }
    const license = await new License({
      name,
      image,
      description,
    });
    const licenseSaved = await license.save();
    res.status(201).json(licenseSaved);
  } catch (error) {
    next(error);
  }
};

exports.getListLicenses = async (req, res, next) => {
  try {
    const licenses = await License.find({});
    res.status(200).json(licenses);
  } catch (error) {
    next(error);
  }
};

exports.deleteLicenseById = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
    const licenseId = req.params.id;
    const deletedLicense = await License.findByIdAndRemove({ _id: licenseId });
    if (!deletedLicense) {
      return res.status(500).json({
        message: "License not found",
      });
    }
    await updateModuleAfterRemoveLicense(licenseId);
    res.status(200).json(deletedLicense);
  } catch (error) {
    next(error);
  }
};

exports.updateLicenseData = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if(!decodeToken.id || !decodeToken.role) return res.status(403).json({message: "Token missing or invalid"});
    if(decodeToken.role !== "ADMIN") return res.status(403).json({message: "Role is not allowed"});
    const data = req.body;
    const dataId = req.params.id;
    const updatedLisence = await License.findByIdAndUpdate(
      { _id: dataId },
      {
        name: data.name,
        image: data.image,
        description: data.description,
      },
      { new: true }
    );
    if (!updatedLisence) {
      return res.status(500).json({
        message: "License not found",
      });
    }
    return res.status(200).json(updatedLisence);
  } catch (error) {
    next(error);
  }
};
