import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
        throw new Error('MongoDB URI is not provided in the environment variables.');
    }

    try {
        await mongoose.connect(mongodbUri, {
            dbName: "prepplus",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);

        isConnected = true;
        console.log("MongoDB is now connected");
    } catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }
};

export default connectDB;