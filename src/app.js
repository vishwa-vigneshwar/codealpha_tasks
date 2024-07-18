const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/photos', require('./routes/photos'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
