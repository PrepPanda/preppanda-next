import mongoose from 'mongoose'

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('=> using existing database connection')
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prepplus",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("MongoDB is now connected");
    } catch (e) {
        // console.log(e);
        console.error('Error connecting to MongoDB:', e);
    }
}
