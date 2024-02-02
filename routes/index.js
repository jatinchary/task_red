// routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const NewsItem = require('../models/newsItem');
const User = require('../models/user');

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    const newsItems = await NewsItem.find().sort({ postedOn: -1 });
    res.status(200).json(newsItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Mark news item as read
router.post('/markAsRead/:id', async (req, res) => {
  const newsItemId = req.params.id;

  try {
    // Implement your logic to mark news item as read for the authenticated user
    res.status(200).json({ message: 'News item marked as read successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete news item
router.delete('/delete/:id', async (req, res) => {
  const newsItemId = req.params.id;

  try {
    // Implement your logic to delete news item for the authenticated user
    res.status(200).json({ message: 'News item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Use auth routes for user authentication
router.use('/auth', authRoutes);

module.exports = router;
