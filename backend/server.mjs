import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import './utils/loadEnvironment.mjs';
import userRoutes from './routes/user.mjs';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true,
};

//routes
app.use('/api/user', userRoutes);

app.use(cors(corsOptions));

// connection to the database
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.ATLAS_URI, connectionParams)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
