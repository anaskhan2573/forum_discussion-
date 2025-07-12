const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS should be on top (before routes)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('StackIt API running...');
});

// ✅ MongoDB Connect & Start Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  dbName: "stackit"
})
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
