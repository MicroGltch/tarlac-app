import React, { useState } from 'react';

const NewsCard = ({ news }) => {
  const { title, image, summary, content, date_published } = news;
  const [showFullContent, setShowFullContent] = useState(false);

  // Format the image URL properly
  const getImageUrl = (imageUrl) => {
    // If image is a full URL, use it directly
    if (imageUrl && imageUrl.startsWith('http')) {
      return imageUrl;
    }
    // If image is just a filename, construct the full URL
    if (imageUrl) {
      return `http://localhost:5000/uploads/${imageUrl}`;
    }
    // Fallback to placeholder
    return '/images/placeholder-image.png';
  };

  if (showFullContent) {
    return (
      <div className="news-full-content">
        <button 
          className="back-button"
          onClick={() => setShowFullContent(false)}
        >
          ← Back
        </button>
        <div className="news-full-header">
          <h2>{title}</h2>
          <p className="news-date">
            {new Date(date_published).toLocaleDateString()}
          </p>
        </div>
        {image && (
          <div className="news-full-image">
            <img 
              src={getImageUrl(image)}
              alt={title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder-image.png';
              }}
            />
          </div>
        )}
        <div className="news-full-body">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="news-item-card">
      <div className="news-image">
        <img 
          src={getImageUrl(image)}
          alt={title || 'News item'}
          onError={(e) => {
            console.log('Image failed to load:', e.target.src);
            e.target.onerror = null;
            e.target.src = '/images/placeholder-image.png';
          }}
        />
      </div>
      <div className="news-content">
        <h3>{title}</h3>
        <p className="news-date">
          {new Date(date_published).toLocaleDateString()}
        </p>
        {summary && <p className="news-description">{summary}</p>}
        <button 
          className="read-more"
          onClick={() => setShowFullContent(true)}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsCard;