const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../gentlepetals-server/src/routes/authRoutes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb+srv://doadmin:W6x9V4S5Lo3872KC@ledoannghilinh-9d081a9b.mongo.ondigitalocean.com/admin?tls=true&authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});