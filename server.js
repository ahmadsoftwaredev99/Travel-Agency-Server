const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');



console.log('SERVER.JS STARTED');
connectDB();

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    console.log('ROOT ROUTE HIT');  
    res.send('TravelEase API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});
