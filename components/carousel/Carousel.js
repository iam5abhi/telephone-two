import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [banner, setBanner] = useState([]);
    const carouselItems = [
        { id: 1, imageUrl: '/Images/carousel.jpg' },
        { id: 2, imageUrl: '/Images/telephone_directory.jpg' },
        // Add more carousel items as needed
    ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle the automatic sliding
  const handleAutoSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  // Start the auto slide on component mount
  useEffect(() => {
    const interval = setInterval(handleAutoSlide, 3000); // Slide every 3 seconds (adjust as needed)

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  const getBannerData = () => {
    fetch("/api/banner/get-topBanner", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => {return res.json(); })
    .then((data) => { setBanner(data) })
    .catch((error) => { console.error("Error fetching or parsing data:", error) });
  };

  useEffect(() => {
      getBannerData();
  }, [])

  return (
    <div className="carousel overflow-hidden relative w-full">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {!banner?null:banner.map((item, index) => (
          <div key={item.id} className={`w-full h-64 flex-shrink-0 ${index !== activeIndex && 'opacity-0'}`}>
            <img
              src={item.image}
              alt={`Slide ${item.id}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2 absolute bottom-2 left-1/2 transform -translate-x-1/2">
        {!banner?null:banner.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 mx-2 rounded-full ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;