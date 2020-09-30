import mongoose from 'mongoose';
import { validateDBEnvVariables } from './env.config';

export default function mongoConfig() {

    validateDBEnvVariables();

    mongoose.connection.on("connected", (ref) => {
        console.log(`Successfully connected to ${process.env.NODE_ENV} database on startup`);
    });

    mongoose.connection.on("error", (err) => {
        console.error(`Failed to connect to ${process.env.NODE_ENV} database on startup!`);
        console.error('Error: ', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log(`Mongoose default connection to ${process.env.NODE_ENV} database disconnected`);

    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

    // Connect to our MongoDB database using the MongoDB
    // connection URI from our predefined environment variable

    mongoose.connect(process.env.MONGO_URI || '',{ useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        if (error)
        throw error;
    });

    function gracefulExit(){
        mongoose.connection.close(() => {
            console.log(`Mongoose connection has disconnected through app termination`);
            process.exit(0);
        });
    }
}

