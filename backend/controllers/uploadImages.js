const cloudinary = require("cloudinary");
const fs = require("fs");
const config = require("../utils/config");
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, "DMV");
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    next(error);
  }
};

exports.removeImageFromCloudinary = async (req, res, next) => {
  try {
    const { path } = req.body;
    const getPublicId = (path) => {
      const arrayPath = path.split("/");
      const index = arrayPath.indexOf("upload");
      let publicId = "";
      for (let i = index + 2; i < arrayPath.length - 1; i++) {
        publicId += arrayPath[i] + "/";
      }
      publicId += arrayPath[arrayPath.length - 1].split(".")[0];
      return publicId;
    };
    console.log(getPublicId(path));
    const sth = await cloudinary.v2.uploader.destroy(getPublicId(path));
    return res.status(200).json(sth);
  } catch (error) {
    next(error);
  }
};
