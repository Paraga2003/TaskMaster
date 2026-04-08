// import express from 'express';
// import cors from 'cors';
// import  'dotenv/config'; 
// import connectDB from './config/db.js';
// import { clerkMiddleware } from '@clerk/express';
// import taskRouter from './routes/taskRoutes.js';

// const app = express();




// app.use(cors(
//   {
//     origin: 'http://localhost:5173', // Your Vite frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//     preflightContinue: false,
//   optionsSuccessStatus: 204
//   }
// ));
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   console.log('Origin:', req.headers.origin);
//   next();
// });
// await connectDB();

// // ✅ CORS must come FIRST
// app.use(cors(corsOptions));

// // ✅ Explicitly handle preflight for ALL routes BEFORE Clerk
// app.options('*', cors(corsOptions));


// app.use(express.json());
// app.use(clerkMiddleware());

// app.get('/',(req,res)=>{
//     res.send("Server is running....")
// });

// app.use('/api/tasks', taskRouter);
// app.use((req, res) => {
//     console.log("❌ Route not hit:", req.method, req.url);
//     res.status(404).send("Not found");
//   });


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}`);
// });


import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import taskRouter from './routes/taskRoutes.js';

const app = express();

// ✅ Define corsOptions FIRST before using it
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});


app.use(express.json());
app.use(clerkMiddleware());

// Connect DB after middleware setup
await connectDB();

app.get('/', (req, res) => {
  res.send("Server is running....");
});

app.use('/api/tasks', taskRouter);

app.use((req, res) => {
  console.log("❌ Route not hit:", req.method, req.url);
  res.status(404).send("Not found");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
