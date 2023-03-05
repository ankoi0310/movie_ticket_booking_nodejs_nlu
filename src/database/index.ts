import mongoose, { Schema } from "mongoose";
import { database } from "../config/database";

// Configuration
const uri = `mongodb+srv://${database.user}:${database.pass}@${database.host}/${database.name}?retryWrites=true&w=majority`;
const options = {
  autoIndex: true,
  minPoolSize: database.minPoolSize, // Maintain at least x socket connections
  maxPoolSize: database.maxPoolSize, // Maintain up to x socket connections
  connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
}

// Logger


// Validator functions
function validator() {
  this.setOptions({ runValidators: true });
}


// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose
  .plugin((schema: Schema) => {
    schema.pre('save', validator);
    schema.pre('update', validator);
    schema.pre('updateOne', validator);
    schema.pre('updateMany', validator);
    schema.pre('findOneAndUpdate', validator);
    schema.pre('insertMany', validator);
  })
  .connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB'); // Logger
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error); // Logger
  });

/* Connection event handlers */
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${uri}`); // Logger
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`); // Logger
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected'); // Logger
});

/* Close the Mongoose connection, when receiving SIGINT */
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination'); // Logger
    process.exit(0);
  });
});

export const connection = mongoose.connection;