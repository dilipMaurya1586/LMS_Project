
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinay from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';

//initialize 
const app = express();

//data base conection
await connectDB();
await connectCloudinay();

//middlewares
app.use(cors());
app.use(clerkMiddleware())


//Routs
app.get('/', (req, res) => {
    res.send("API  Working");
});
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter);
app.use('/api/course', express.json(), courseRouter);
app.use('/api/user', express.json(), userRouter);
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is Listing on port ${PORT}`);
});

