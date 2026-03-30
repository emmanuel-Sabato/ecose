require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const eventRoutes = require('./routes/eventRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const facilityRoutes = require('./routes/facilityRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// 1. SECURITY MIDDLEWARE
app.use(helmet()); // Set security HTTP headers

// CORS configuration - Allow frontend to access backend
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite development port
  credentials: true, // Allow senting sessions/cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
}));

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// 2. BODY PARSING & COOKIES
app.use(express.json({ limit: '10kb' })); // Body parser, reading data from body into req.body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// 3. SESSION MANAGEMENT
app.use(session({
  secret: process.env.API_Secret || 'ecose-super-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 // Session lasts 24 hours
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true, // Prevents XSS attacks by not allowing JS to read the cookie
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    sameSite: 'lax' // Helps mitigate CSRF
  }
}));

// 4. ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Ecose Admin Gateway API is active!');
});

// 5. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 6. SERVER START
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
