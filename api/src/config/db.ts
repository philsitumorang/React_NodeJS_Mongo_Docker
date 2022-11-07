import * as mongoose from 'mongoose';

export async function connectToDB() {
  try {
    console.log('Connecting to DB...');
    await mongoose.connect(`mongodb://${process.env.MONGODB_APPLICATION_USER}:${process.env.MONGODB_APPLICATION_PASS}@${process.env.MONGODB_IP}:${process.env.MONGODB_PORT}/${process.env.MONGODB_APPLICATION_DATABASE}`);
    console.log('Connected successfully!');
  } catch (err) {
    setTimeout(() => {
      console.log('Reconnect...');
      connectToDB()
    }, 2000)
  }
}
