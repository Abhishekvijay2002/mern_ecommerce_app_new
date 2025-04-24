import React, { useState } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b530f7110494491.5feef8228f2b8.png',
    'https://images.remotehub.com/d42c62669a7711eb91397e038280fee0/original_thumb/ec1eb042.jpg?version=1618112516',
    'https://as2.ftcdn.net/v2/jpg/02/07/25/49/1000_F_207254995_0pdVxbemGBmjeChzFPgRYQmF6TAjYqRO.jpg',
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden mx-auto"> {/* Adjust width and height here */}
      {/* Carousel Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded z-10"
      >
        &#10094;
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded z-10"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;

