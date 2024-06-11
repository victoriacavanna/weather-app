import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import weatherRoutes from './routes/search.route.js'
import cors from 'cors';

const app = express();

const port = 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api', weatherRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Conexión con base de datos establecida"))
.catch((error) => console.error(error));

app.listen(port, () => console.log('Puerto:', port));