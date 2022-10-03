const router = require("express").Router();
const { uploadImages,removeImageFromCloudinary } = require("../controllers/uploadImages");
const middlwares = require("../utils/middleware");

router.post("/uploadImages", middlwares.upLoadMiddleware, uploadImages);
router.post("/removeImages",middlwares.authAdmin,removeImageFromCloudinary),
module.exports = router;
