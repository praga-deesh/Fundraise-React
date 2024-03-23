import React, { useState, useEffect } from 'react';
import './Home.css'; // Make sure to link the CSS file

// Sample images, you can replace these paths with your actual images
import image1 from '../resources/image1.jpg'
import image2 from '../resources/image2.jpg';
import image3 from '../resources/image3.jpg';
import image4 from '../resources/image4.jpg';

const images = [image1, image2, image3, image4];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="slider">
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === currentImage ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        >
          {index === currentImage && <div className="welcome-text">Welcome to Funraise App</div>}
        </div>
      ))}
    </div>
  );
}

export default Home;
