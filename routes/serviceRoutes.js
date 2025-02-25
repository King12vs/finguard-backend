import express from 'express';

const router = express.Router();

// Sample service route
router.get('/status', (req, res) => {
    res.json({ message: 'Service is running successfully!' });
});

// Add more routes as needed

export default router;
