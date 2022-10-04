const License = require("../models/license");
const { updateModuleAfterRemoveLicense } = require("../controllers/module");
const { validateLicense } = require("../Validators/validators");

exports.createLicense = async (req, res, next) => {
  try {
    const result = await validateLicense(req.body);
    const checkLicense = await License.findOne({ name: result.name });
    if (checkLicense) {
      return res.status(500).json({
        message:
          "This name is already in use. Please try with a different license name",
      });
    }
    const license = await new License({
      name: result.name,
      image: result.image,
      description: result.description,
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
    const result = await validateLicense(req.body);
    const dataId = req.params.id;
    const updatedLisence = await License.findByIdAndUpdate(
      { _id: dataId },
      {
        name: result.name,
        image: result.image,
        description: result.description,
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
