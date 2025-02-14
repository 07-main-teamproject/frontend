import React from 'react';

const ADVs = [
  {
    directUrl: 'https://pages.coupang.com/p/137752',
    advertiseUrl: '/images/banner1.png',
  },
  {
    directUrl: 'https://www.kurly.com/categories/649',
    advertiseUrl: '/images/banner2.png',
  },
  {
    directUrl: 'https://ozcodingschool.com/ozcoding/startupcamp',
    advertiseUrl: '/images/banner3.png',
  },
];

export default function AdBanner() {
  // 광고 랜덤 선택
  const randomAd = ADVs[Math.floor(Math.random() * ADVs.length)];

  return (
    <div className="w-full mt-5">
      <a href={randomAd.directUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={randomAd.advertiseUrl}
          alt="광고 배너"
          className="w-full h-auto max-h-[100px] object-cover"
        />
      </a>
    </div>
  );
}
