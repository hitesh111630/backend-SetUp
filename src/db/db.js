import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`MongoDb connected !! Host :${mongoose.connection.host}`);
  } catch (error) {
    console.log("Error : MongoDb connection Failed !", error);
  }
};

export default connectDB;
