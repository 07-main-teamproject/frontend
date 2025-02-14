import React from 'react';
import MealList from '../domain/MealList';
import SimpleSlider from '../components/SimpleSlider';
import AdBanner from '../domain/AdBanner';

export default function MainPage() {
  return (
    <div>
      <SimpleSlider />
      <MealList />
      <AdBanner />
    </div>
  );
}
