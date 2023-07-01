import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import './loadEnvironment.mjs';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

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
