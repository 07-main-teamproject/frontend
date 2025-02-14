import React from 'react';
import MealList from '../components/MealList';
import SimpleSlider from '../components/SimpleSlider';

export default function MainPage() {
  return (
    <div>
      <SimpleSlider />
      <MealList />
    </div>
  );
}
