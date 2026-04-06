import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined. Add it to your .env file.');
  }

  // Conservative pool settings for local/full-stack dev workloads.
  await mongoose.connect(uri, {
    maxPoolSize: 10,
    minPoolSize: 1,
    maxIdleTimeMS: 60000,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  isConnected = true;
}
