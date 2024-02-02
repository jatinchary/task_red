// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const scrapeAndStore = require('./scraper');
const NewsItem = require('./models/NewsItem');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hackernews', { useNewUrlParser: true, useUnifiedTopology: true });

// Route to scrape and store news items
app.get('/scrape', async (req, res) => {
  try {
    await scrapeAndStore();
    res.status(200).json({ message: 'Scraping and storing successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all news items in reverse chronological order
app.get('/news', async (req, res) => {
  try {
    const newsItems = await NewsItem.find().sort({ postedOn: -1 });
    res.status(200).json(newsItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
