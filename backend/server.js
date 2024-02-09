const app = require("./app");
const connectDatabase = require("./config/database");
const autoAgeUp = require("./config/updateAgeAuto");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

dotenv.config({ path: "config/.env" });
connectDatabase();
autoAgeUp();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(4000, () => {
  console.log("server is running http://localhost:4000");
});
