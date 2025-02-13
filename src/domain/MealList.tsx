import MealCard from '../components/MealCard';
// import meal1 from '../assets/meal1.jpg';
// import meal2 from '../assets/meal2.jpg';
// import meal3 from '../assets/meal3.jpg';
// import meal4 from '../assets/meal4.jpg';

const meals = [
  {
    image: '',
    title: '저탄고지 샐러드',
    description: '건강한 하루를 위한 저탄고지 샐러드입니다.',
    buttonText: '자세히 보기',
  },
  {
    image: '',
    title: '프로틴 오트밀',
    description: '단백질 가득한 오트밀로 아침을 시작하세요.',
    buttonText: '자세히 보기',
  },
  {
    image: '',
    title: '닭가슴살 도시락',
    description: '균형 잡힌 영양을 고려한 다이어트 도시락.',
    buttonText: '자세히 보기',
  },
  {
    image: '',
    title: '그린 스무디',
    description: '신선한 채소와 과일로 만든 건강 스무디.',
    buttonText: '자세히 보기',
  },
];

const MealList: React.FC = () => {
  return (
    <>
      <p className=" flex items-center flex-col font-bold mt-10">
        오늘의 나의 추천 식단
      </p>
      <div className="flex justify-center gap-6 mt-10">
        {meals.slice(1).map((meal, index) => (
          <MealCard key={index} {...meal} />
        ))}
      </div>
    </>
  );
};

export default MealList;
