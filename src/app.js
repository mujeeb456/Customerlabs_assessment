const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');
const destRoutes = require('./routes/destination.routes');
const memberRoutes = require('./routes/member.routes');
const incomingRoutes = require('./routes/incoming.routes');
const logs=require('./routes/log.routes')

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/accounts', accountRoutes);
app.use('/destinations', destRoutes);
app.use('/members', memberRoutes);
app.use('/server', incomingRoutes);
app.use('/logs',logs)

app.get('/health', (req, res) => res.json({ success: true, status: 'ok' }));

module.exports = app;
