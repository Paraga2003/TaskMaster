import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import connectDB from './config/db.js';

import taskRouter from './routes/taskRoutes.js';
import authRouter from './routes/authRoutes.js'; 

const app = express();


const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));


app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use(express.json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});


app.use(express.json());


await connectDB();

app.get('/', (req, res) => {
  res.send("Server is running....");
});
app.use('/api/auth',  authRouter);  

app.use('/api/tasks', taskRouter);

app.use((req, res) => {
  console.log("Route not hit:", req.method, req.url);
  res.status(404).send("Not found");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
