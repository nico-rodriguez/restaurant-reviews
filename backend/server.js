import cors from 'cors';
import express from 'express';

import restaurants from './api/restaurants.route.js';
import reviews from './api/reviews.route.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/restaurants', reviews);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;