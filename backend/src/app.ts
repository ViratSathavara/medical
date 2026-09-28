import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.js';
import { setupSwagger } from './config/swagger.js';
import { sendSuccess, sendError } from './utils/apiResponse.js';

const app = express();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: [env.CLIENT_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// HTTP request logger
if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Request parsers
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static file hosting for uploads (documents, PDFs, avatars)
app.use('/uploads', express.static(path.resolve(process.cwd(), env.UPLOAD_DIR)));

// Swagger API Documentation
setupSwagger(app);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  sendSuccess(res, 'MedPulse Hospital API is running smoothly', {
    status: 'ONLINE',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Mount master API routes
app.use('/api', routes);

// 404 Catch-All
app.use('*', (req: Request, res: Response) => {
  sendError(res, `API route not found: ${req.method} ${req.originalUrl}`, 404);
});

// Centralized error handler
app.use(errorHandler);

export default app;
