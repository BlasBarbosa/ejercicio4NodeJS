const express = require('express');
const { globalErrorHandler } = require('./controllers/errors.controller');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Routers
const { usersRouter } = require('./routes/user.routes');
const { repairsRouter } = require('./routes/repair.routes');

// Init express app
const app = express();

// Enable incoming JSON data
app.use(express.json());

//! Agregados para hacer deploy a Heroku
// Add security headers
app.use(helmet());
// Compress responses
app.use(compression());
// Log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));
// Además agregar archivo Procfile (web: npm start) en la raíz hacer cambio en package.json agregando (después de "main"):
// "engines": {
//		"node": "14.x"
//}
// "scripts": {
// 	"start": "node server.js",
// 	"start:dev": "nodemon server.js"
// }

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

// Global Error Handler
app.use('*', globalErrorHandler);

module.exports = { app };
