const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./sevices/passport');
const authRoutes = require('./routes/authRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');
mongoose.connect(keys.mongoURI);

const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);

const PORT = process.env.PORT || 9000;

app.listen(PORT);