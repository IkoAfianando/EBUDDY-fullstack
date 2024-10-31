// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from '../routes/user.routes';
import authRoutes from '../routes/auth.routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({status: 'ok'});
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something broke!'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;