import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const NewsItem = ({ item }) => (
  <div className="news-item">
    <h3>{item.title}</h3>
    <p>
      <strong>Upvotes:</strong> {item.upvotes} | <strong>Comments:</strong> {item.comments}
    </p>
  </div>
);

function App() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard');
        setNewsItems(response.data);
      } catch (error) {
        console.error('Error fetching news items:', error);
      }
    };

    fetchNewsItems();
  }, []);

  return (
    <div className="App">
      <h1>HackerNews Clone</h1>
      <div>
        <h2>Dashboard</h2>
        {newsItems.length === 0 ? (
          <p>No news items available.</p>
        ) : (
          newsItems.map((item) => <NewsItem key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}

export default App;
