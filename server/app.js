import express from 'express';
import session from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
// To parse request json -> req.body
app.use(express.json());
// To parse URL encoded data
app.use(express.urlencoded({ extended: false }));
// To parse cookie json -> req.cookies
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET || 's3cr3t'}));

app.use(express.static(path.join(__dirname, '../public')));
// Serve uploaded files
app.use(express.static(path.join(__dirname, '../uploads')));
// Serve admin React app
app.use(express.static(path.join(__dirname, '../ecom-admin/build')));

app.get('/api/v1/ping', (req, res) => res.json({
  isSuccess: true,
  msg: 'pong',
}));

// Only serve ReactJS as ecom admin
app.use((req, res, next) => {
  if (req.path?.startsWith('/api')) {
    res.status(404);
    res.json({
      isSuccess: false,
      msg: 'API Not Found',
    });
    return;
  }
  res.sendFile(path.join(__dirname, '../ecom-admin/build/index.html'));
});

export default app;
