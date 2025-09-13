import mongoose from "mongoose";
import app from "./app.js";

const port = 5000;

const startServer = async () => {
  try {
    await mongoose.connect("mongodb+srv://MongoDB:mongodb@cluster0.yfxr21u.mongodb.net/booksDB?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } 
  catch (error) {
    console.error("DB Connection Failed", error);
  }
};

startServer();
