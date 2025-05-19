import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="home-container">
      <div className="carousel">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/tempimg.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="content-overlap">
        <div className="about-section">
          <div className="about-left">
            <img src="/images/logo.png" alt="About Us Image" />
          </div>
          <div className="about-right">
            <img 
              src="/images/heart-icon.png" 
              alt="Heart Icon" 
              style={{ width: '50px', height: '50px' }}
            />
            <h2>About Us</h2>
            <h6>A unified organization providing compassionate, quality healthcare to various communities through partnership and collaborations.</h6>
          </div>
        </div>

        <div className="announcements-section">
          <h2>Announcements and Activities</h2>
          <div className="announcements-grid">
            <div className="news-card">
              <img src="/images/news.jpg" alt="News" />
              <h3>News</h3>
              <p>Hear about the latest news from Tarlac Medical Society!</p>
              <button className="more-news">MORE NEWS</button>
            </div>
            <div className="activities-card">
              <img src="/images/activities.jpg" alt="Activities" />
              <h3>Activities</h3>
              <p>Click the link below to check the calendar of activities</p>
              <button className="more-news">MORE NEWS</button>
            </div>
          </div>
        </div>

        <div className="hymn-section">
          <h2>Philippine Medical Association Hymn</h2>
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Uu0cSfl8ctY"
              title="Philippine Medical Association Hymn"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="developers-section">
          <h2>Meet the Developers</h2>
          <div className="developers-grid">
            <div className="developer-card">
              <div className="developer-image">
                <img src="/images/developer1.jpg" alt="Front-end developer" />
              </div>
              <div className="developer-info">
                <h3>Front-end developer</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a mi a nisl fermentum varius. Cras elementum dui sapien, eu varius dolor tincidunt vitae. Morbi at ipsum a mauris vulputate aliquam vel id diam.</p>
              </div>
            </div>

            <div className="developer-card">
              <div className="developer-image">
                <img src="/images/developer2.jpg" alt="Front-end developer" />
              </div>
              <div className="developer-info">
                <h3>Front-end developer</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a mi a nisl fermentum varius. Cras elementum dui sapien, eu varius dolor tincidunt vitae. Morbi at ipsum a mauris vulputate aliquam vel id diam.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Home;