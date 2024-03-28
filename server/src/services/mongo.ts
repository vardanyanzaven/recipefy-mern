import mongoose, { MongooseError } from "mongoose";

mongoose.connection.once("open", (): void => {
  console.log("Connected to MongoDB!");
});

mongoose.connection.on("error", (error: MongooseError): void => {
  console.error(error);
});

const mongoConnect = async (mongoDBUrl: string) => {
  await mongoose.connect(mongoDBUrl);
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

export {mongoConnect, mongoDisconnect}