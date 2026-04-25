require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
  origin: process.env.APP2_FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.json({ app: 'app2-backend', status: 'running' }));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`App2 backend running on port ${PORT}`));
