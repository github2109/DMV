exports.uploadImagesForMessage = async (filesIn) => {
  let files = Object.values(filesIn).flat();
  let images = [];
  for (const file of files) {
    const url = await uploadToCloudinary(file, "DMV/Message");
    images.push(url.url);
    removeTmp(file.tempFilePath);
  }
  return images;
};
const uploadToCloudinary = async (file, folderURL) => {
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
