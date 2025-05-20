import React, { useState, useEffect } from 'react';
import ActivitiesCard from '../components/ActivitiesCard';

const Activities = () => {
  const [activitiesList, setActivitiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/activities');

        if (!response.ok) {
          throw new Error(`Failed to fetch activities (${response.status})`);
        }

        const data = await response.json();
        setActivitiesList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="legacy-container">
      <div className="hero-image">
        <img
          className="w-100"
          src="/images/activities-hero.jpg"
          alt="Tarlac Medical Society Activities"
        />
        <div className="hero-text">
          <h1>Activities</h1>
          <h4>Events and Programs</h4>
          <p>Stay updated with our latest activities and upcoming events</p>
        </div>
      </div>
      <div className="content-overlap">
        <div className="about-section">
          {loading ? (
            <div className="loading-spinner">Loading activities...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="activities-grid">
              {activitiesList.length > 0 ? (
                activitiesList.map(activity => (
                  <ActivitiesCard key={activity.id} activity={activity} />
                ))
              ) : (
                <div className="no-items">No activities available</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;