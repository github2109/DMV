import axios from "axios";
const bareUrl = "/api/licenses";
const getAll = async () => {
  try {
    const response = await axios.get(bareUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const createLicense = async (license) =>{
  try{
    let formData = new FormData();
    formData.append("file",license.image)
    const urlRes = await axios.post("/api/uploads/uploadImages",formData,{
      "content-type": "multipart/form-data"
    });
    license.image = urlRes.data[0].url; 
    const response = await axios.post(bareUrl, license);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export default { getAll,createLicense };
