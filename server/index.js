const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const MONGODB_URI = "mongodb+srv://programmingpr12:Ashish12@cluster0.obs97he.mongodb.net/?retryWrites=true&w=majority"

app.use(cors({
    origin : "*"
}));
app.use(express.json());

mongoose.connect(MONGODB_URI);

// Routes----
const post_route = require('./routes/postRoute');
app.use('/api', post_route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
