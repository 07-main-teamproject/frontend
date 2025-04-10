import SimpleSlider from '../components/SimpleSlider';
import AdBanner from '../domain/AdBanner';
import Footer from '../components/Footer';

import MealList from '../domain/MealList';

export default function MainPage() {
  return (
    <div>
      <SimpleSlider />
      <MealList />
      <AdBanner />
      <Footer />
    </div>
  );
}
