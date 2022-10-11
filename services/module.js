const Module = require("../models/module");
exports.updateModuleAfterRemoveState = async (stateId) => {
  try {
    const modules = await Module.updateMany(
      { states: stateId },
      {
        $pull: {
          states: stateId,
        },
      }
    );
    return modules;
  } catch (error) {
    console.log(error);
  }
};

exports.updateModuleAfterRemoveLicense = async (licenseId) => {
  try {
    const modules = await Module.updateMany(
      { license: licenseId },
      {
        $set: {
          license: null,
        },
      }
    );
    return modules;
  } catch (error) {
    console.log(error);
  }
};
exports.getListModuleIdByStateIdAndLicenseId = async (stateId, licenseId) => {
  return await Module.find({ license: licenseId, states: stateId }).select({
    _id: 1,
  });
};
