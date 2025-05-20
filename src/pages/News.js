import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/news');

        if (!response.ok) {
          throw new Error(`Failed to fetch news (${response.status})`);
        }

        const data = await response.json();
        setNewsList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="legacy-container">
      <div className="hero-image">
        <img
          className="w-100"
          src="/images/legacy-hero.jpg"
          alt="Tarlac Medical Society News"
        />
        <div className="hero-text">
          <h1>News</h1>
          <h4>History/Archives/Stories</h4>
          <p>Browse our rich history, current events, and write-ups from our Tarlac Physicians</p>
        </div>
      </div>
      <div className="content-overlap">
        <div className="about-section">
          {loading ? (
            <div className="loading-spinner">Loading news...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="news-grid">
              {newsList.length > 0 ? (
                newsList.map(news => (
                  <NewsCard key={news.id} news={news} />
                ))
              ) : (
                <div className="no-items">No news articles available</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;