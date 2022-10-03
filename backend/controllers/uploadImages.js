const cloudinary = require("cloudinary");
const fs = require("fs");
const config = require("../utils/config");
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
});

exports.uploadImagesForMessage = async (filesIn) => {
  let files = Object.values(filesIn).flat();
  let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file,"DMV/Message");
      images.push(url.url);
      removeTmp(file.tempFilePath);
    }
    return images;
}

exports.uploadImages = async (req, res) => {
  try {
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file,"DMV");
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    next(error);
  }
};

const uploadToCloudinary = async (file,folderURL) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: folderURL,
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