import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/dbConfig.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
