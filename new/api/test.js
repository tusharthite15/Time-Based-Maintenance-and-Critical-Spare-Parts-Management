const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://tusharthiteofficial:JnEK9MfAGppdcOyg@kfpl.rkcwv.mongodb.net/kfpl1';
mongoose.connect(MONGO_URI).then(
  () => { console.log('Successfully connected to MongoDB'); },
  err => { console.error('Connection error', err); }
);
