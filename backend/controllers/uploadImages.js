const cloudinary = require("cloudinary");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
});
exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    next(error);
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "DMV",
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "Upload image failed." });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

exports.removeImageFromCloudinary = async (req, res, next) => {
  try {
    const token = req.token;
    const decodeToken = jwt.verify(token, config.SECRET);
    if (!decodeToken.id || !decodeToken.role)
      return res.status(403).json({ message: "Token missing or invalid" });
    if (decodeToken.role !== "ADMIN")
      return res.status(403).json({ message: "Role is not allowed" });
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
