import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routers/user.routes.js'

dotenv.config();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to DataBase successfully!");

        app.listen(PORT, (req,res) => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Connection to MongoDB Atlas failed!", error);
    });

app.use("/api/user",userRoute)




