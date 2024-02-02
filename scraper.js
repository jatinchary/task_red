// scraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const NewsItem = require('./models/newsItem');

async function scrapeAndStore() {
  const url = 'https://news.ycombinator.com/';
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const newsItems = [];

  $('tr.athing').each((index, element) => {
    const title = $(element).find('a.storylink').text();
    const url = $(element).find('a.storylink').attr('href');
    const hackerNewsUrl = `${url}item?id=${$(element).attr('id')}`;
    const upvotes = parseInt($(element).next('tr').find('span.score').text().split(' ')[0]) || 0;
    const comments = parseInt($(element).next('tr').find('a').last().text().split(' ')[0]) || 0;

    newsItems.push({
      url,
      hackerNewsUrl,
      upvotes,
      comments
    });
  });

  for (const item of newsItems) {
    await NewsItem.findOneAndUpdate({ url: item.url }, { $set: item }, { upsert: true, new: true });
  }
}

module.exports = scrapeAndStore;
