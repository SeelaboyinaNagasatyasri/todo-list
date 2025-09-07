const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const config = require('./config');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(config. mongoURL)  // Ensure MONGO_URL is correctly defined in config.js
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/tasks', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
