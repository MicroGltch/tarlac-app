import React from 'react';

const ActivitiesCard = ({ activity }) => {
  const { title, images, organizer, venue, date, time } = activity;

  return (
    <div className="activity-item-card">
      <div className="activity-image">
        {images && images.length > 0 ? (
          <img 
            src={`http://localhost:5000/uploads/${images[0]}`}
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder-image.png';
            }}
          />
        ) : (
          <div className="placeholder"></div>
        )}
      </div>
      <div className="activity-content">
        <h3>{title}</h3>
        <p className="activity-date">
          {new Date(date).toLocaleDateString()} at {time}
        </p>
        <div className="activity-details">
          <p className="activity-organizer">{organizer}</p>
          <p className="activity-venue">{venue}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesCard;