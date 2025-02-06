import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SimpleSlider: React.FC = () => {
  const images = [
    { url: '/images/food1.png', caption: 'hi' },
    { url: '/images/food2.jpg', caption: 'hello' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,

    dotsClass: 'slick-dots relative! bottom-0! ',
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className="relative" key={index}>
            <img
              src={image.url}
              alt={`슬라이드 ${index + 1}`}
              className="w-full h-[400px] object-cover "
            />
            <p className="absolute bottom-0 left-0" />
            <p className="caption absolute bottom-0 left-0 text-black">
              {image.caption}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

interface Settings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

export default SimpleSlider;

// {
// images.map(({url, caption}, index) => (
//   <div className="relative" key={index}>
//   <img
//   src={url}
//   alt={`슬라이드 ${index+1}`} />
//   <p className="absolute
//   bottom-0 left-0">{caption}</>
//   </div>
//   )
//   }
