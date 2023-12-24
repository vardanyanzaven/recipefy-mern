import mongoose, { MongooseError } from "mongoose";

mongoose.connection.once("open", (): void => {
  console.log("Connected to MongoDB!");
});

mongoose.connection.on("error", (error: MongooseError): void => {
  console.error(error);
});

const mongoConnect = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL as string);
};

// const mongoDisconnect = async () => {
//   await mongoose.disconnect();
// };

export {mongoConnect};